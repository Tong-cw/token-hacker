'use client';
import { useState } from 'react';
import { getTranslations, Locale } from '@/lib/i18n';

const mockMembers = [
  { id: 1, email: 'alice@example.com', role: 'owner', added: '2026-06-10', lastActive: '2 min ago', apiKey: 'th-alice-****a1b2' },
  { id: 2, email: 'bob@devteam.io', role: 'admin', added: '2026-06-11', lastActive: '1 hour ago', apiKey: 'th-bob-****c3d4' },
  { id: 3, email: 'carol@startup.co', role: 'member', added: '2026-06-12', lastActive: '3 hours ago', apiKey: 'th-carol-****e5f6' },
  { id: 4, email: 'dave@agency.com', role: 'viewer', added: '2026-06-12', lastActive: '1 day ago', apiKey: '—' },
];

const rolePermissions: Record<string, { useAPI: boolean; manageMembers: boolean; viewBilling: boolean; manageKeys: boolean }> = {
  owner:    { useAPI: true, manageMembers: true, viewBilling: true, manageKeys: true },
  admin:    { useAPI: true, manageMembers: true, viewBilling: true, manageKeys: true },
  member:   { useAPI: true, manageMembers: false, viewBilling: false, manageKeys: false },
  viewer:   { useAPI: false, manageMembers: false, viewBilling: true, manageKeys: false },
};

export default function TeamManagePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).team.manage;
  const [members, setMembers] = useState(mockMembers);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState('');

  function handleInvite() {
    if (!email.trim()) return;
    setMembers(prev => [...prev, {
      id: Date.now(),
      email: email.trim(),
      role: 'member',
      added: 'Just now',
      lastActive: '—',
      apiKey: '—',
    }]);
    setEmail('');
    setToast(t.inviteSent);
    setTimeout(() => setToast(''), 3000);
  }

  function handleRemove(id: number) {
    setMembers(prev => prev.filter(m => m.id !== id));
    setToast(t.memberRemoved);
    setTimeout(() => setToast(''), 3000);
  }

  const roleClass = (role: string) => {
    if (role === 'owner') return 'member-role owner';
    if (role === 'admin') return 'member-role admin';
    if (role === 'member') return 'member-role member';
    return 'member-role viewer';
  };

  return (
    <div className="team-manage">
      <h2>{t.title}</h2>
      <p>{t.subtitle}</p>

      {/* Invite bar */}
      <div className="invite-bar">
        <input
          type="email"
          placeholder={t.invitePlaceholder}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleInvite()}
        />
        <button onClick={handleInvite}>{t.invite}</button>
      </div>

      {/* Members table */}
      {members.length > 0 ? (
        <table className="team-members-table">
          <thead>
            <tr>
              <th>{t.members}</th>
              <th>{t.role}</th>
              <th>API Key</th>
              <th>{t.added}</th>
              <th>{t.lastActive}</th>
              <th style={{ width: '120px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id}>
                <td className="member-email">{m.email}</td>
                <td><span className={roleClass(m.role)}>{(t as any)[m.role] || m.role}</span></td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: 'var(--text-dim)' }}>{m.apiKey}</td>
                <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{m.added}</td>
                <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{m.lastActive}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-small edit">{t.invite}</button>
                    {m.role !== 'owner' && (
                      <button className="btn-small danger" onClick={() => handleRemove(m.id)}>{t.remove}</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <div className="icon">👥</div>
          <p>{t.noMembers}</p>
        </div>
      )}

      {/* Sub-accounts info */}
      <div className="subaccounts-section">
        <h3>{t.subAccounts}</h3>
        <p>{t.subAccountsDesc}</p>
        <div className="member-permissions">
          {Object.entries(rolePermissions).map(([role, perms]) => (
            <div key={role} style={{ background: 'var(--bg)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <span className={roleClass(role)}>{(t as any)[role] || role}</span>
              </div>
              <div className="perm-item"><span className={`dot ${perms.useAPI ? 'on' : 'off'}`}></span>{t.canUseAPI}</div>
              <div className="perm-item"><span className={`dot ${perms.manageMembers ? 'on' : 'off'}`}></span>{t.canManageMembers}</div>
              <div className="perm-item"><span className={`dot ${perms.viewBilling ? 'on' : 'off'}`}></span>{t.canViewBilling}</div>
              <div className="perm-item"><span className={`dot ${perms.manageKeys ? 'on' : 'off'}`}></span>{t.canManageKeys}</div>
            </div>
          ))}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
