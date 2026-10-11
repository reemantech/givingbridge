import { ICONS } from '../utils/icons.js';
import {
  getStoredMutualAid,
  getTimebankBalance,
  transactMutualAid,
  addMutualAidListing,
  getUserProfile
} from '../utils/storage.js';

export function renderMutualAidLedgerView(container, onStateUpdate) {
  const listings = getStoredMutualAid();
  const balance = getTimebankBalance();
  const user = getUserProfile();

  let activeTab = 'all'; // 'all', 'request', 'offer'
  let selectedCategory = 'all';

  function filterListings() {
    return listings.filter(item => {
      const matchType = activeTab === 'all' || item.type === activeTab;
      const matchCat = selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchType && matchCat;
    });
  }

  function renderView() {
    const filtered = filterListings();
    const currentBalance = getTimebankBalance();

    container.innerHTML = `
      <div class="mutualaid-page">
        <!-- Hero Header -->
        <div class="mutualaid-hero">
          <div class="hero-left">
            <span class="concept-chip">CONCEPT 3 • TIME-BANKING & SKILL EXCHANGE</span>
            <h1 class="page-title">MutualAid Care Ledger</h1>
            <p class="page-desc">
              A fair, zero-cash community exchange loop. 1 hour spent escorting an elder to hospital dialysis or fixing a broken roof drain gives you 1 Time Credit to redeem for math tutoring or child care.
            </p>

            <div class="timebank-balance-card">
              <div class="balance-icon">${ICONS.sparkles}</div>
              <div class="balance-details">
                <span class="balance-label">Your Active TimeBank Balance</span>
                <div class="balance-amount">
                  <strong>${currentBalance.toFixed(1)}</strong>
                  <span>Time Credits (Hours)</span>
                </div>
                <p class="balance-hint">1 Credit = 1 Hour of neighborhood community mutual aid</p>
              </div>
            </div>
          </div>

          <div class="hero-right">
            <button class="btn btn-primary btn-lg" id="btn-post-exchange">
              ${ICONS.heartHandshake} Post Care Request or Skill Offer
            </button>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="mutualaid-controls">
          <div class="tab-pills" id="type-tabs">
            <button class="tab-pill ${activeTab === 'all' ? 'active' : ''}" data-type="all">All Community Listings</button>
            <button class="tab-pill ${activeTab === 'request' ? 'active' : ''}" data-type="request">
              🆘 Neighbors Requesting Help
            </button>
            <button class="tab-pill ${activeTab === 'offer' ? 'active' : ''}" data-type="offer">
              🤝 Neighbors Offering Skills
            </button>
          </div>

          <div class="filter-pills" id="cat-pills">
            <button class="filter-pill ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">All Categories</button>
            <button class="filter-pill ${selectedCategory === 'elder' ? 'active' : ''}" data-cat="elder">👵 Elder & Mobility</button>
            <button class="filter-pill ${selectedCategory === 'education' ? 'active' : ''}" data-cat="education">📚 Tutoring & Youth</button>
            <button class="filter-pill ${selectedCategory === 'repairs' ? 'active' : ''}" data-cat="repairs">🔧 Home & Repairs</button>
            <button class="filter-pill ${selectedCategory === 'logistics' ? 'active' : ''}" data-cat="logistics">🚚 Transport & Moving</button>
            <button class="filter-pill ${selectedCategory === 'counseling' ? 'active' : ''}" data-cat="counseling">❤️ Counseling</button>
          </div>
        </div>

        <!-- Listings Grid -->
        <div class="mutualaid-grid">
          ${filtered.map(item => `
            <div class="aid-card aid-${item.type}">
              <div class="aid-top-row">
                <span class="aid-type-chip ${item.type}">
                  ${item.type === 'request' ? '🆘 HELP REQUEST' : '🤝 SKILL OFFER'}
                </span>
                <span class="aid-credits-chip">
                  ${ICONS.clock} <strong>${item.hoursRequired} Hours</strong> (${item.creditsOffered} Credits)
                </span>
              </div>

              <h3 class="aid-title">${item.title}</h3>
              <p class="aid-details">${item.details}</p>

              <div class="aid-meta-grid">
                <div class="meta-item">
                  <span class="label">Category:</span>
                  <strong>${item.category}</strong>
                </div>
                <div class="meta-item">
                  <span class="label">Member:</span>
                  <strong>${item.member}</strong>
                </div>
                <div class="meta-item">
                  <span class="label">Locality:</span>
                  <strong>${item.locality}</strong>
                </div>
                <div class="meta-item">
                  <span class="label">When:</span>
                  <strong class="text-warning">${item.timeframe}</strong>
                </div>
              </div>

              <div class="aid-footer">
                ${item.type === 'request' ? `
                  <button class="btn btn-primary btn-block transact-btn" data-id="${item.id}" data-type="request" data-hours="${item.hoursRequired}">
                    ${ICONS.heartHandshake} Fulfill Request (Earn +${item.creditsOffered} Credits)
                  </button>
                ` : `
                  <button class="btn btn-secondary btn-block transact-btn" data-id="${item.id}" data-type="offer" data-hours="${item.hoursRequired}">
                    ${ICONS.bolt} Book Assistance (Spend -${item.creditsOffered} Credits)
                  </button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    container.querySelectorAll('#type-tabs .tab-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        activeTab = pill.dataset.type;
        renderView();
      });
    });

    container.querySelectorAll('#cat-pills .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        selectedCategory = pill.dataset.cat;
        renderView();
      });
    });

    // Transaction buttons
    container.querySelectorAll('.transact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const type = btn.dataset.type;
        const hours = parseFloat(btn.dataset.hours);
        const item = listings.find(l => l.id === id);

        if (type === 'offer' && getTimebankBalance() < hours) {
          alert(`You need at least ${hours} Time Credits to book this offer. Earn credits by helping another neighbor with a request!`);
          return;
        }

        const newBal = transactMutualAid(id, hours);
        showTransactToast(item, type, hours, newBal);
        renderView();
        if (onStateUpdate) onStateUpdate();
      });
    });

    // Post modal
    const postBtn = container.querySelector('#btn-post-exchange');
    if (postBtn) {
      postBtn.addEventListener('click', () => {
        showPostExchangeModal();
      });
    }
  }

  function showTransactToast(item, type, hours, newBal) {
    const toast = document.createElement('div');
    toast.className = 'toast-alert animate-slide-up';
    toast.innerHTML = `
      <div class="toast-icon text-success">${ICONS.check}</div>
      <div class="toast-body">
        <strong>${type === 'request' ? 'Mutual Aid Completed!' : 'Assistance Confirmed!'}</strong>
        <p>${type === 'request' ? `You provided aid to ${item.member}. <strong>+${hours} Time Credits</strong> added to your ledger!` : `Booked ${item.title}. <strong>-${hours} Time Credits</strong> spent.`} New Balance: <strong>${newBal.toFixed(1)} Credits</strong>.</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">${ICONS.close}</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 7000);
  }

  function showPostExchangeModal() {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal-backdrop';
    modalEl.innerHTML = `
      <div class="modal-card animate-scale-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="badge-row">
            <span class="badge badge-primary">MutualAid Exchange</span>
            <span class="badge badge-success">Time-banking</span>
          </div>
          <button class="modal-close-btn" id="post-ma-close">${ICONS.close}</button>
        </div>

        <form id="post-ma-form">
          <div class="modal-body-scroll">
            <h2 class="form-title">Post Care Request or Skill Offer</h2>
            <p class="form-sub">Engage in fair neighborhood credit exchange without money.</p>

            <div class="form-group">
              <label class="form-label">Are you requesting help or offering a skill?</label>
              <div class="radio-pill-group">
                <label class="radio-pill">
                  <input type="radio" name="ma-type" value="request" checked />
                  <span>🆘 Requesting Care / Assistance</span>
                </label>
                <label class="radio-pill">
                  <input type="radio" name="ma-type" value="offer" />
                  <span>🤝 Offering a Skill / Service</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Headline / Title</label>
              <input type="text" id="ma-title" class="form-control" placeholder="e.g. Need assistance walking my elderly grandmother to OPD clinic" required />
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Category</label>
                <select class="form-control" id="ma-cat">
                  <option value="Elder & Mobility Care">Elder & Mobility Care</option>
                  <option value="Education & Tutoring">Education & Tutoring</option>
                  <option value="Home & Repairs">Home & Repairs</option>
                  <option value="Logistics & Transport">Logistics & Transport</option>
                  <option value="Counseling & Care">Counseling & Care</option>
                  <option value="Pet Care & Walking">Pet Care & Walking</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label class="form-label">Hours / Credits Required</label>
                <select class="form-control" id="ma-hours">
                  <option value="1">1.0 Hour (1 Credit)</option>
                  <option value="1.5">1.5 Hours (1.5 Credits)</option>
                  <option value="2" selected>2.0 Hours (2 Credits)</option>
                  <option value="3">3.0 Hours (3 Credits)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Details / Requirements</label>
              <textarea id="ma-details" class="form-control" rows="3" placeholder="Describe the task, languages spoken, or any tools needed..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Timeframe / Schedule</label>
              <input type="text" id="ma-timeframe" class="form-control" value="Tomorrow afternoon" required />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="post-ma-cancel">Cancel</button>
            <button type="submit" class="btn btn-primary">
              ${ICONS.heartHandshake} Publish to MutualAid Ledger
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modalEl);

    const close = () => modalEl.remove();
    modalEl.querySelector('#post-ma-close').addEventListener('click', close);
    modalEl.querySelector('#post-ma-cancel').addEventListener('click', close);

    modalEl.querySelector('#post-ma-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const type = modalEl.querySelector('input[name="ma-type"]:checked').value;
      const title = modalEl.querySelector('#ma-title').value;
      const category = modalEl.querySelector('#ma-cat').value;
      const hoursRequired = parseFloat(modalEl.querySelector('#ma-hours').value);
      const details = modalEl.querySelector('#ma-details').value;
      const timeframe = modalEl.querySelector('#ma-timeframe').value;

      addMutualAidListing({
        type,
        title,
        category,
        member: `${user.name} (Score 98%)`,
        locality: `${user.locality} (Hyperlocal)`,
        hoursRequired,
        creditsOffered: hoursRequired,
        details,
        timeframe
      });

      modalEl.remove();
      renderView();
      if (onStateUpdate) onStateUpdate();
    });
  }

  renderView();
}
