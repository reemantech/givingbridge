import { ICONS } from '../utils/icons.js';
import {
  getStoredFlashNeeds,
  pledgeFlashNeed,
  getStoredCenters,
  getUserProfile
} from '../utils/storage.js';

export function renderPulseRelayView(container, onStateUpdate) {
  const flashNeeds = getStoredFlashNeeds();
  const centers = getStoredCenters();
  const user = getUserProfile();

  function renderView() {
    container.innerHTML = `
      <div class="pulserelay-page">
        <!-- Hero Header -->
        <div class="pulserelay-hero">
          <div class="hero-left">
            <span class="concept-chip">CONCEPT 2 • NGO-NEIGHBORHOOD MICRO-HUB</span>
            <h1 class="page-title">PulseRelay Flash Needs Board</h1>
            <p class="page-desc">
              Time-critical, event-driven humanitarian dispatching. When a flood embankment weakens or food runs short at an evening shelter, verified NGOs broadcast immediate flash requests to the nearest 3–8 km radius.
            </p>
            <div class="flash-alert-strip">
              <span class="pulse-beacon"></span>
              <strong>Active Emergency Broadcast:</strong>
              <span>Matching citizens within walking & transit radius to immediate deadline needs.</span>
            </div>
          </div>

          <div class="hero-right">
            <button class="btn btn-emergency btn-lg" id="btn-post-flash">
              ${ICONS.bolt} Broadcast New Flash Need
            </button>
          </div>
        </div>

        <!-- Flash Needs Grid -->
        <div class="flash-cards-grid">
          ${flashNeeds.map(need => {
            const percent = Math.min(100, Math.round((need.pledgedQty / need.targetQty) * 100));
            const remaining = Math.max(0, need.targetQty - need.pledgedQty);
            const isCompleted = remaining === 0;

            return `
              <div class="flash-card ${need.urgency === 'critical' ? 'critical-border' : ''}">
                <div class="flash-top-row">
                  <div class="flash-urgency-badge ${need.urgency}">
                    <span class="pulse-dot"></span>
                    <span>${need.urgency.toUpperCase()} FLASH</span>
                  </div>
                  <div class="flash-deadline">
                    ${ICONS.clock} <strong>${need.deadline}</strong>
                  </div>
                </div>

                <h3 class="flash-title">${need.title}</h3>
                
                <div class="flash-center-info">
                  <span class="center-name">📍 ${need.centerName}</span>
                  <span class="radius-tag">${need.radius}</span>
                </div>

                <div class="flash-reason-box">
                  <strong>Ground Context:</strong>
                  <p>${need.urgencyReason}</p>
                </div>

                <div class="flash-progress-section">
                  <div class="progress-labels">
                    <span>Pledges Received: <strong>${need.pledgedQty} / ${need.targetQty} ${need.unit}</strong></span>
                    <span class="remaining-highlight">${isCompleted ? '✓ Target Met!' : `${remaining} still needed`}</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill ${need.urgency}" style="width: ${percent}%;"></div>
                  </div>
                </div>

                <div class="flash-card-footer">
                  <div class="organizer-tag">
                    <span class="org-label">Organizer:</span>
                    <strong>${need.organizer}</strong>
                  </div>

                  ${isCompleted ? `
                    <button class="btn btn-secondary btn-sm" disabled>
                      ✓ Target Fully Met
                    </button>
                  ` : `
                    <button class="btn btn-primary btn-sm quick-pledge-btn" data-id="${need.id}" data-title="${need.title}" data-unit="${need.unit}">
                      ${ICONS.bolt} Quick Pledge Aid
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Post new flash need modal
    const postBtn = container.querySelector('#btn-post-flash');
    if (postBtn) {
      postBtn.addEventListener('click', () => {
        showPostFlashModal();
      });
    }

    // Quick pledge buttons
    container.querySelectorAll('.quick-pledge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const needId = btn.dataset.id;
        const title = btn.dataset.title;
        const unit = btn.dataset.unit;
        showQuickPledgeModal(needId, title, unit);
      });
    });
  }

  function showQuickPledgeModal(needId, title, unit) {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal-backdrop';
    modalEl.innerHTML = `
      <div class="modal-card animate-scale-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <span class="badge badge-emergency">Rapid Commitment</span>
          <button class="modal-close-btn" id="quick-close">${ICONS.close}</button>
        </div>

        <form id="quick-pledge-form">
          <div class="modal-body">
            <h3>${title}</h3>
            <p class="subtext">Every single commitment counts against the ticking clock.</p>

            <div class="form-group mt-3">
              <label class="form-label">How many ${unit} can you deliver before deadline?</label>
              <input type="number" id="quick-qty" class="form-control text-center" value="2" min="1" max="100" required />
            </div>

            <div class="form-group">
              <label class="form-label">Estimated Arrival Window</label>
              <select class="form-control" id="quick-eta">
                <option value="Within 45 Minutes">Within 45 Minutes</option>
                <option value="Within 90 Minutes" selected>Within 90 Minutes</option>
                <option value="Before 6:00 PM Tonight">Before 6:00 PM Tonight</option>
              </select>
            </div>

            <div class="form-check-box">
              <label class="checkbox-container">
                <input type="checkbox" required checked />
                <span class="checkmark"></span>
                <span>I confirm I will physically bring these supplies to the shelter intake dock.</span>
              </label>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="quick-cancel">Cancel</button>
            <button type="submit" class="btn btn-primary">
              ${ICONS.bolt} Confirm Pledge & Notify Coordinator
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modalEl);

    const close = () => modalEl.remove();
    modalEl.querySelector('#quick-close').addEventListener('click', close);
    modalEl.querySelector('#quick-cancel').addEventListener('click', close);

    modalEl.querySelector('#quick-pledge-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const qty = parseInt(modalEl.querySelector('#quick-qty').value);
      pledgeFlashNeed(needId, qty);
      modalEl.remove();

      renderView();
      if (onStateUpdate) onStateUpdate();

      showFlashToast(qty, unit);
    });
  }

  function showFlashToast(qty, unit) {
    const toast = document.createElement('div');
    toast.className = 'toast-alert animate-slide-up';
    toast.innerHTML = `
      <div class="toast-icon text-success">${ICONS.check}</div>
      <div class="toast-body">
        <strong>Pledge Transmitted to Shelter Command!</strong>
        <p>Pledged <strong>${qty} ${unit}</strong>. The ground coordinator has been notified of your inbound ETA.</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">${ICONS.close}</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 6000);
  }

  function showPostFlashModal() {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal-backdrop';
    modalEl.innerHTML = `
      <div class="modal-card animate-scale-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="badge-row">
            <span class="badge badge-emergency">Broadcast Flash Need</span>
            <span class="badge badge-verified">Verified Coordinator Tool</span>
          </div>
          <button class="modal-close-btn" id="post-close">${ICONS.close}</button>
        </div>

        <form id="post-flash-form">
          <div class="modal-body-scroll">
            <h2 class="form-title">Broadcast Real-time Emergency Need</h2>
            <p class="form-sub">Sends a priority notification to citizens within selected radius.</p>

            <div class="form-group">
              <label class="form-label">Select Relief Center</label>
              <select class="form-control" id="flash-center">
                ${centers.map(c => `<option value="${c.id}">${c.name} (${c.locality})</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Flash Need Headline</label>
              <input type="text" id="flash-title" class="form-control" placeholder="e.g. Flash Need: 50 Units of Pediatric ORS within 3 hours" required />
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Category</label>
                <select class="form-control" id="flash-cat">
                  <option value="ration">Ration / Food</option>
                  <option value="clothes">Clothes & Blankets</option>
                  <option value="volunteer">Volunteers</option>
                  <option value="utensils">Utensils & Equipment</option>
                  <option value="stationary">Stationery & Medical Kits</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label class="form-label">Target Quantity</label>
                <input type="number" id="flash-target" class="form-control" value="25" min="1" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Target Deadline</label>
                <input type="text" id="flash-deadline" class="form-control" value="Today, 19:30 (3h remaining)" required />
              </div>

              <div class="form-group flex-1">
                <label class="form-label">Hyperlocal Radius</label>
                <select class="form-control" id="flash-radius">
                  <option value="3 km Hyperlocal Radius">3 km Hyperlocal</option>
                  <option value="5 km Sector Radius" selected>5 km Sector</option>
                  <option value="15 km City Wide">15 km City-wide</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Urgency Context / Reason</label>
              <textarea id="flash-reason" class="form-control" rows="2" placeholder="Explain why this shortage is critical right now..." required></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="post-cancel">Cancel</button>
            <button type="submit" class="btn btn-emergency">
              ${ICONS.bolt} Launch Emergency Broadcast
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modalEl);

    const close = () => modalEl.remove();
    modalEl.querySelector('#post-close').addEventListener('click', close);
    modalEl.querySelector('#post-cancel').addEventListener('click', close);

    modalEl.querySelector('#post-flash-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const centerId = modalEl.querySelector('#flash-center').value;
      const center = centers.find(c => c.id === centerId);
      const title = modalEl.querySelector('#flash-title').value;
      const category = modalEl.querySelector('#flash-cat').value;
      const targetQty = parseInt(modalEl.querySelector('#flash-target').value);
      const deadline = modalEl.querySelector('#flash-deadline').value;
      const radius = modalEl.querySelector('#flash-radius').value;
      const urgencyReason = modalEl.querySelector('#flash-reason').value;

      const newNeed = {
        id: `pulse-${Date.now()}`,
        centerId,
        centerName: center ? center.name : "Local Relief Center",
        title,
        deadline,
        category,
        targetQty,
        pledgedQty: 0,
        unit: category === 'volunteer' ? 'volunteers' : 'items',
        urgency: 'critical',
        urgencyReason,
        organizer: user.name,
        radius
      };

      const stored = getStoredFlashNeeds();
      stored.unshift(newNeed);
      localStorage.setItem('budhelp_flashneeds_v1', JSON.stringify(stored));

      modalEl.remove();
      renderView();
      if (onStateUpdate) onStateUpdate();
    });
  }

  renderView();
}
