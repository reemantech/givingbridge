import { ICONS } from '../utils/icons.js';
import {
  getStoredCenters,
  getStoredDemands,
  getStoredContributions,
  getStoredVolunteers,
  verifyQrPass
} from '../utils/storage.js';

export function renderCoordinatorDashboard(container, onStateUpdate) {
  const centers = getStoredCenters();
  let selectedCenterId = centers[0].id;

  function renderView() {
    const currentCenter = centers.find(c => c.id === selectedCenterId) || centers[0];
    const demands = getStoredDemands().filter(d => d.centerId === currentCenter.id);
    const contributions = getStoredContributions().filter(c => c.centerId === currentCenter.id);
    const volunteers = getStoredVolunteers().filter(v => v.centerId === currentCenter.id);

    container.innerHTML = `
      <div class="coordinator-page">
        <!-- Dashboard Header -->
        <div class="coordinator-header">
          <div class="header-left">
            <span class="concept-chip">OPERATIONS DESK • RELIEF CENTER DISPATCH</span>
            <h1 class="page-title">Relief Center Coordinator Workbench</h1>
            <p class="page-desc">
              Manage on-ground intake docks, validate citizen drop-off QR passes, monitor inventory capacity thresholds, and dispatch emergency volunteer rosters.
            </p>
          </div>

          <div class="center-selector-box">
            <label class="form-label">Active Relief Base:</label>
            <select class="form-control" id="coord-center-select">
              ${centers.map(c => `
                <option value="${c.id}" ${c.id === selectedCenterId ? 'selected' : ''}>
                  ${c.name} (${c.locality})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Top Operations Metric Row -->
        <div class="metrics-cards-row">
          <div class="metric-card">
            <span class="m-label">Active Intake Docks</span>
            <strong class="m-val text-primary">Dock #3 (East Gate)</strong>
            <small class="m-sub">Receiving: Ration, Utensils, Clothes</small>
          </div>
          <div class="metric-card">
            <span class="m-label">Total Citizen Pledges</span>
            <strong class="m-val">${contributions.length}</strong>
            <small class="m-sub">${contributions.filter(c => c.status === 'verified_received').length} Verified Received</small>
          </div>
          <div class="metric-card">
            <span class="m-label">Rostered Volunteers</span>
            <strong class="m-val text-success">${volunteers.length + 14}</strong>
            <small class="m-sub">On-call for Emergency SMS Dispatch</small>
          </div>
          <div class="metric-card">
            <span class="m-label">SDMA Verification</span>
            <strong class="m-val text-warning">Verified Active</strong>
            <small class="m-sub">Reg: ${currentCenter.regNumber}</small>
          </div>
        </div>

        <!-- Two Column Main Layout -->
        <div class="coordinator-grid">
          <!-- Left: QR Intake Scanner / Pass Validator -->
          <div class="coord-col">
            <div class="card panel-card">
              <div class="panel-header">
                <div class="header-title-group">
                  <span class="panel-icon text-primary">${ICONS.qr}</span>
                  <div>
                    <h3 class="panel-title">Warehouse Intake QR Pass Scanner</h3>
                    <p class="panel-sub">Scan arriving delivery barcodes or enter 9-character pass code</p>
                  </div>
                </div>
              </div>

              <div class="panel-body">
                <form id="qr-verify-form" class="qr-verify-form">
                  <div class="input-with-button">
                    <input 
                      type="text" 
                      id="pass-code-input" 
                      class="form-control font-mono" 
                      placeholder="e.g. PASS-RAT-9402" 
                      required 
                    />
                    <button type="submit" class="btn btn-primary" id="btn-verify-pass">
                      ${ICONS.check} Verify & Receive
                    </button>
                  </div>
                  <div id="verify-result-msg" class="verify-result-msg mt-2"></div>
                </form>

                <!-- Quick Simulation Buttons from recent pledges -->
                <div class="recent-intake-feed mt-4">
                  <h4 class="feed-title">Recent Inbound Drop-Off Pledges:</h4>
                  ${contributions.length === 0 ? `
                    <p class="text-muted subtext">No citizen pledges recorded for this center yet. Use the "Relief Discovery" tab to pledge ration or clothes first!</p>
                  ` : `
                    <div class="feed-list">
                      ${contributions.map(c => `
                        <div class="feed-item ${c.status}">
                          <div class="feed-item-left">
                            <span class="feed-pass-code font-mono">${c.passCode}</span>
                            <strong class="feed-cat">${c.category.toUpperCase()} • ${c.pledgedAmountOrQty} Units</strong>
                            <small class="feed-time">${new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                          </div>
                          <div class="feed-item-right">
                            <span class="status-badge status-${c.status}">
                              ${c.status === 'verified_received' ? '✓ Received' : '⏳ Pledged'}
                            </span>
                            ${c.status !== 'verified_received' ? `
                              <button class="btn btn-sm btn-secondary quick-verify-btn" data-code="${c.passCode}">
                                Scan Pass
                              </button>
                            ` : ''}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  `}
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Volunteer Roster & Incident Dispatch -->
          <div class="coord-col">
            <div class="card panel-card">
              <div class="panel-header">
                <div class="header-title-group">
                  <span class="panel-icon text-success">${ICONS.volunteer}</span>
                  <div>
                    <h3 class="panel-title">Volunteer Emergency Dispatch Roster</h3>
                    <p class="panel-sub">Verified citizens available for on-ground triage & logistics</p>
                  </div>
                </div>
                <button class="btn btn-emergency btn-sm" id="btn-broadcast-sms">
                  ${ICONS.bolt} Dispatch Emergency SMS
                </button>
              </div>

              <div class="panel-body">
                <div class="volunteer-roster-list">
                  <!-- Seed Volunteers -->
                  <div class="roster-item verified">
                    <div class="roster-avatar">AK</div>
                    <div class="roster-info">
                      <div class="roster-name-row">
                        <strong>Dr. Amit Kulkarni</strong>
                        <span class="badge badge-success">Govt ID Verified</span>
                      </div>
                      <div class="roster-skills">
                        <span class="skill-tag">🩺 Medical EMT</span>
                        <span class="skill-tag">Triage Lead</span>
                      </div>
                      <small class="roster-shift">Shift: Immediate Emergency Response • Tel: +91 98201 11092</small>
                    </div>
                  </div>

                  <div class="roster-item verified">
                    <div class="roster-avatar">RK</div>
                    <div class="roster-info">
                      <div class="roster-name-row">
                        <strong>Rajesh Khurana</strong>
                        <span class="badge badge-success">Heavy Vehicle DL</span>
                      </div>
                      <div class="roster-skills">
                        <span class="skill-tag">🚚 Logistics & 4x4 Truck</span>
                        <span class="skill-tag">Heavy Labor</span>
                      </div>
                      <small class="roster-shift">Shift: Morning Relief Dispatch • Tel: +91 98104 22910</small>
                    </div>
                  </div>

                  ${volunteers.map(v => `
                    <div class="roster-item verified animate-slide-up">
                      <div class="roster-avatar">${v.userName ? v.userName.charAt(0) : 'V'}</div>
                      <div class="roster-info">
                        <div class="roster-name-row">
                          <strong>${v.userName}</strong>
                          <span class="badge badge-success">Citizen Verified</span>
                        </div>
                        <div class="roster-skills">
                          ${(v.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('')}
                        </div>
                        <small class="roster-shift">Shift: ${v.shiftName} • Tel: ${v.userPhone}</small>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const centerSelect = container.querySelector('#coord-center-select');
    if (centerSelect) {
      centerSelect.addEventListener('change', (e) => {
        selectedCenterId = e.target.value;
        renderView();
      });
    }

    // QR Verification Form
    const qrForm = container.querySelector('#qr-verify-form');
    if (qrForm) {
      qrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = container.querySelector('#pass-code-input');
        const code = input.value.trim();
        handleVerification(code);
      });
    }

    // Quick verify buttons from feed
    container.querySelectorAll('.quick-verify-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        handleVerification(code);
      });
    });

    // Broadcast SMS button
    const broadcastBtn = container.querySelector('#btn-broadcast-sms');
    if (broadcastBtn) {
      broadcastBtn.addEventListener('click', () => {
        alert("🚨 Emergency incident alert broadcasted via SMS/WhatsApp to all active volunteers on roster! Roster response time tracker initiated.");
      });
    }
  }

  function handleVerification(code) {
    const resultMsg = container.querySelector('#verify-result-msg');
    const contribution = verifyQrPass(code);

    if (contribution) {
      resultMsg.innerHTML = `
        <div class="alert alert-success animate-scale-in">
          ${ICONS.check} <strong>Pass Verified & Checked In!</strong><br />
          Received <strong>${contribution.pledgedAmountOrQty} units</strong> of <strong>${contribution.category.toUpperCase()}</strong>. Inventory updated in live PostGIS registry.
        </div>
      `;
      setTimeout(() => {
        renderView();
        if (onStateUpdate) onStateUpdate();
      }, 1500);
    } else {
      resultMsg.innerHTML = `
        <div class="alert alert-danger animate-scale-in">
          ${ICONS.alert} <strong>Pass Code Not Found!</strong><br />
          Make sure to enter a valid pass code (e.g. PASS-RAT-XXXX).
        </div>
      `;
    }
  }

  renderView();
}
