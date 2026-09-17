import { formatMoney } from '../lib/formatters';

export function Sidebar({ role, modules, currentView, onViewChange, onRoleChange }) {
  const roleLabel = role === 'customer' ? 'Customer view' : role === 'partner' ? 'Partner studio' : 'Admin control room';

  return (
    <aside className="sidebar">
      <div className="brand-row">
        <span className="brand-mark">b</span>
        <span>Bloom</span>
      </div>

      <div className="workspace-label">Workspace</div>

      <button type="button" className="role-switcher" onClick={() => onRoleChange(role === 'customer' ? 'partner' : role === 'partner' ? 'admin' : 'customer')}>
        <span>{roleLabel}</span>
        <span>⌄</span>
      </button>

      <nav className="nav-list">
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            className={`nav-item ${currentView === module.id ? 'active' : ''}`}
            onClick={() => onViewChange(module.id)}
          >
            <span className="nav-icon">{module.icon}</span>
            <span>{module.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-card">
        <span className="eyebrow">Bloom care</span>
        <strong>Every visit, a little more well.</strong>
        <button type="button" className="link-button muted-link">
          Contact support <span>↗</span>
        </button>
      </div>

      <button type="button" className="profile-mini">
        <span className="avatar">RS</span>
        <span>
          <strong>Riya Sharma</strong>
          <small>Personal account</small>
        </span>
      </button>
    </aside>
  );
}
