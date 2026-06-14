@echo off
cd /d F:\TokenChuHai\website-next
npx vercel env add AUTH_SECRET production --value "y0Ygmgz3aeclSkwCS9rFWgDTSSJJhPom95N2wU9b8OM=" --sensitive --yes
npx vercel env add AUTH_URL production --value "https://www.aiapisave.xyz" --yes
npx vercel env add AUTH_GITHUB_ID production --value "Ov23lirXyAP7Jt7e9Vpt" --yes
npx vercel env add AUTH_GITHUB_SECRET production --value "475c361a65ad2655bb6eeab8eb3eb398b4f833dd" --sensitive --yes
echo DONE
