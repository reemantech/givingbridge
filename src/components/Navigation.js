import { ICONS } from '../utils/icons.js';
import {
  getUserProfile,
  getTimebankBalance,
  getStoredContributions,
  getActiveRole,
  setActiveRole,
  resetToDefaults
} from '../utils/storage.js';

export function renderNavigation(container, currentView, onViewChange) {
  const user = getUserProfile();
  const timeCredits = getTimebankBalance();
  const contributions = getStoredContributions();

  container.innerHTML = `
    <!-- Top Emergency Broadcast Ribbon -->
    <div class="top-broadcast-ribbon">
      <div class="broadcast-badge">
        <span class="live-blip"></span>
        <span>HYPERLOCAL CRISIS SYNC</span>
      </div>
      <div class="broadcast-marquee">
        <div class="marquee-content">
          <span>🚨 <strong>Yamuna Flood Camp:</strong> Critical shortage of 160 infant food packs • </span>
          <span>⚡ <strong>PulseRelay:</strong> 30 Blankets needed before 6:00 PM tonight • </span>
          <span>🌊 <strong>Wayanad Command:</strong> 8 Medical EMTs and heavy rain jackets needed • </span>
          <span>📦 <strong>CommonStock:</strong> Submersible mud pump lent out, due tomorrow • </span>
          <span>🤝 <strong>MutualAid:</strong> 2 Care hours exchanged in Sector 56 • </span>
        </div>
      </div>
      <div class="broadcast-right">
        <span class="gov-sync-tag">SDMA & RED CROSS PROTOCOL</span>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="main-navbar">
      <div class="nav-container">
        <!-- Brand Logo -->
        <div class="nav-brand" id="brand-logo" role="button">
          <div class="brand-icon-wrap">
            ${ICONS.logo}
            <span class="brand-radar"></span>
          </div>
          <div class="brand-text">
            <span class="brand-title">GivingBridge</span>
            <span class="brand-subtitle">Hyperlocal Disaster & Mutual Aid</span>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="nav-links">
          <button class="nav-tab ${currentView === 'discovery' ? 'active' : ''}" data-view="discovery">
            ${ICONS.mapPin} <span>Relief Discovery</span>
          </button>
          <button class="nav-tab ${currentView === 'commonstock' ? 'active' : ''}" data-view="commonstock">
            ${ICONS.tools} <span>CommonStock</span>
          </button>
          <button class="nav-tab ${currentView === 'pulserelay' ? 'active' : ''}" data-view="pulserelay">
            ${ICONS.bolt} <span>PulseRelay</span>
          </button>
          <button class="nav-tab ${currentView === 'mutualaid' ? 'active' : ''}" data-view="mutualaid">
            ${ICONS.heartHandshake} <span>MutualAid Ledger</span>
          </button>
          <button class="nav-tab ${currentView === 'shelterwatch' ? 'active' : ''}" data-view="shelterwatch">
            <span>🐾 ShelterWatch</span>
          </button>
          <button class="nav-tab ${currentView === 'coordinator' ? 'active' : ''}" data-view="coordinator">
            ${ICONS.qr} <span>Coordinator Desk</span>
          </button>
          <button class="nav-tab ${currentView === 'architecture' ? 'active' : ''}" data-view="architecture">
            ${ICONS.database} <span>Architecture & SQL</span>
          </button>
        </nav>

        <!-- User Profile & Role Switcher Area -->
        <div class="nav-user-area">
          <button class="role-pill-btn" id="btn-toggle-role" title="Toggle between Citizen and NGO Staff Access">
            <span class="role-indicator ${getActiveRole() === 'ngo_staff' ? 'staff-active' : ''}"></span>
            <span>${getActiveRole() === 'ngo_staff' ? '🩺 Staff / Vet' : '👤 Citizen'}</span>
          </button>

          <div class="timebank-pill" title="TimeBank Care Credits (1 Credit = 1 Hour)">
            ${ICONS.clock}
            <span class="tb-balance">${timeCredits.toFixed(1)}h</span>
            <small class="tb-label">Credits</small>
          </div>

          <div class="user-profile-badge">
            <div class="user-avatar">${user.name.charAt(0)}</div>
            <div class="user-meta">
              <span class="user-name">${user.name.split(' ')[0]}</span>
              <span class="user-trust text-success">Trust: ${user.trustScore}%</span>
            </div>
          </div>

          <button class="btn-icon-reset" id="btn-reset-demo" title="Reset Demo Data">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
          </button>
        </div>
      </div>
    </header>
  `;

  // Bind clicks
  container.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;
      if (onViewChange) onViewChange(view);
    });
  });

  const logo = container.querySelector('#brand-logo');
  if (logo) {
    logo.addEventListener('click', () => {
      if (onViewChange) onViewChange('discovery');
    });
  }

  const resetBtn = container.querySelector('#btn-reset-demo');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset demo state to initial defaults?')) {
        resetToDefaults();
        window.location.reload();
      }
    });
  }

  const roleToggle = container.querySelector('#btn-toggle-role');
  if (roleToggle) {
    roleToggle.addEventListener('click', () => {
      const nextRole = getActiveRole() === 'ngo_staff' ? 'citizen' : 'ngo_staff';
      setActiveRole(nextRole);
      renderNavigation(container, currentView, onViewChange);
      if (onViewChange) onViewChange(currentView);
    });
  }
}
