import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Twitter from "next-auth/providers/twitter";
import Discord from "next-auth/providers/discord";
import GitLab from "next-auth/providers/gitlab";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ── In-memory user store (shared with legacy API) ──
declare global {
  var __users: Map<string, any> | undefined;
  var __apiKeys: Map<string, any> | undefined;
}
if (!globalThis.__users) globalThis.__users = new Map();
if (!globalThis.__apiKeys) globalThis.__apiKeys = new Map();
const users = globalThis.__users!;
const apiKeys = globalThis.__apiKeys!;

function generateApiKey(): string {
  return 'th_' + crypto.randomBytes(16).toString('hex');
}

function findOrCreateOAuthUser(profile: {
  provider: string;
  providerId: string;
  email: string;
  name?: string;
}) {
  const key = `oauth_${profile.provider}_${profile.providerId}`;
  let user = users.get(key);
  if (user) return user;

  // Check if email already exists
  const emailUser = users.get('email_' + profile.email);
  if (emailUser) {
    // Link OAuth to existing user
    users.set(key, emailUser);
    return emailUser;
  }

  // Create new user
  const id = crypto.randomUUID();
  const apiKey = generateApiKey();
  user = {
    id,
    email: profile.email,
    name: profile.name || profile.email.split('@')[0],
    apiKey,
    balance: 200, // $2 free trial
    monthlyTokens: 0,
    createdAt: new Date().toISOString(),
    oauthProvider: profile.provider,
  };

  users.set('id_' + id, user);
  users.set('email_' + profile.email, user);
  users.set(key, user);
  apiKeys.set(apiKey, user);
  return user;
}

const providers = [];

// GitHub OAuth
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: `github_${profile.id}`,
          name: profile.name || profile.login,
          email: profile.email || `${profile.login}@github.user`,
          image: profile.avatar_url,
          provider: 'github',
          providerId: String(profile.id),
        };
      },
    })
  );
}

// Google OAuth
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

// Microsoft Entra ID
if (process.env.AUTH_MICROSOFT_ID && process.env.AUTH_MICROSOFT_SECRET) {
  providers.push(
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET,
    })
  );
}

// Twitter / X
if (process.env.AUTH_TWITTER_CLIENT_ID && process.env.AUTH_TWITTER_CLIENT_SECRET) {
  providers.push(
    Twitter({
      clientId: process.env.AUTH_TWITTER_CLIENT_ID,
      clientSecret: process.env.AUTH_TWITTER_CLIENT_SECRET,
      // Twitter OAuth 2.0
      authorization: { params: { scope: "users.read tweet.read" } },
    })
  );
}

// Discord
if (process.env.AUTH_DISCORD_ID && process.env.AUTH_DISCORD_SECRET) {
  providers.push(
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
    })
  );
}

// GitLab
if (process.env.AUTH_GITLAB_ID && process.env.AUTH_GITLAB_SECRET) {
  providers.push(
    GitLab({
      clientId: process.env.AUTH_GITLAB_ID,
      clientSecret: process.env.AUTH_GITLAB_SECRET,
    })
  );
}

// Email/Password (always available)
providers.push(
  Credentials({
    name: 'email',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
      action: { label: 'Action', type: 'text' },
    },
    async authorize(credentials) {
      const { email, password, action } = credentials as any;
      if (!email || !password) return null;

      if (action === 'register') {
        if (users.has('email_' + email)) return null;
        const id = crypto.randomUUID();
        const hashed = await bcrypt.hash(password, 10);
        const apiKey = generateApiKey();
        const user = {
          id,
          email,
          name: email.split('@')[0],
          password: hashed,
          apiKey,
          balance: 200,
          monthlyTokens: 0,
          createdAt: new Date().toISOString(),
        };
        users.set('id_' + id, user);
        users.set('email_' + email, user);
        apiKeys.set(apiKey, user);
        return { id, email, name: user.name };
      }

      // Login
      const user = users.get('email_' + email);
      if (!user || !user.password) return null;
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;
      return { id: user.id, email: user.email, name: user.name };
    },
  })
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: '/en/login',
    error: '/en/login',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      // Link OAuth user to our store
      if (account && profile) {
        const providerId = profile.id
          ? String(profile.id)
          : account.providerAccountId;
        const email =
          (profile as any).email ||
          user?.email ||
          `${(profile as any).login || providerId}@${account.provider}.user`;
        const name = (profile as any).name || user?.name || '';

        const appUser = findOrCreateOAuthUser({
          provider: account.provider,
          providerId,
          email,
          name,
        });
        token.apiKey = appUser.apiKey;
        token.balance = appUser.balance;
      }

      // Load API key + balance for credentials users
      if (user?.id && !token.apiKey) {
        const appUser = users.get('id_' + user.id);
        if (appUser) {
          token.apiKey = appUser.apiKey;
          token.balance = appUser.balance;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).apiKey = token.apiKey;
        (session.user as any).balance = token.balance;
      }
      return session;
    },

    async signIn({ user, account }) {
      // Allow all sign-ins including OAuth without verified email
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
});
