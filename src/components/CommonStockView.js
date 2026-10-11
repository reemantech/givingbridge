import { ICONS } from '../utils/icons.js';
import {
  getStoredCommonStock,
  addCommonStockItem,
  borrowCommonStockItem,
  getUserProfile
} from '../utils/storage.js';

export function renderCommonStockView(container, onStateUpdate) {
  const stockItems = getStoredCommonStock();
  const user = getUserProfile();

  let searchQuery = '';
  let selectedCategory = 'all';
  let availabilityFilter = 'all'; // 'all', 'available', 'in_use'

  function filterItems() {
    return stockItems.filter(item => {
      const matchSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchAvail = availabilityFilter === 'all' || item.status === availabilityFilter;

      return matchSearch && matchCat && matchAvail;
    });
  }

  function renderView() {
    const items = filterItems();

    container.innerHTML = `
      <div class="commonstock-page">
        <!-- Hero Banner -->
        <div class="commonstock-hero">
          <div class="hero-left">
            <span class="concept-chip">CONCEPT 1 • NEIGHBORHOOD ASSET LIBRARY</span>
            <h1 class="page-title">CommonStock Lending Circles</h1>
            <p class="page-desc">
              Hyperlocal shared asset pool for heavy tools, portable generators, emergency water filters, and medical stretchers. Eliminates redundant purchases during neighborhood crises.
            </p>
            <div class="hero-stat-row">
              <div class="stat-pill">
                <strong>${stockItems.length}</strong>
                <span>Shared Assets</span>
              </div>
              <div class="stat-pill">
                <strong>98.6%</strong>
                <span>Trust Check-in Rate</span>
              </div>
              <div class="stat-pill">
                <strong>0%</strong>
                <span>Rental Fees (Free Mutual Aid)</span>
              </div>
            </div>
          </div>

          <div class="hero-right">
            <button class="btn btn-primary btn-lg" id="btn-list-asset">
              ${ICONS.tools} Share an Asset from Your Home
            </button>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div class="stock-controls-bar">
          <div class="search-input-wrap flex-1">
            <span class="search-icon">${ICONS.search}</span>
            <input 
              type="text" 
              id="stock-search-input" 
              class="search-input" 
              placeholder="Search shared tools (e.g. 'generator', 'pump', 'wheelchair', 'chainsaw')..." 
              value="${searchQuery}"
            />
          </div>

          <div class="filter-pills" id="stock-category-pills">
            <button class="filter-pill ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">All Items</button>
            <button class="filter-pill ${selectedCategory === 'power' ? 'active' : ''}" data-cat="power">⚡ Power & Gen</button>
            <button class="filter-pill ${selectedCategory === 'flood' ? 'active' : ''}" data-cat="flood">🌊 Water & Drainage</button>
            <button class="filter-pill ${selectedCategory === 'medical' ? 'active' : ''}" data-cat="medical">🩺 Medical & Care</button>
            <button class="filter-pill ${selectedCategory === 'rescue' ? 'active' : ''}" data-cat="rescue">🪓 Tools & Rescue</button>
            <button class="filter-pill ${selectedCategory === 'infant' ? 'active' : ''}" data-cat="infant">👶 Baby & Domestic</button>
          </div>

          <select class="form-control" id="stock-status-select" style="max-width: 170px;">
            <option value="all" ${availabilityFilter === 'all' ? 'selected' : ''}>All Availability</option>
            <option value="available" ${availabilityFilter === 'available' ? 'selected' : ''}>Available Now</option>
            <option value="in_use" ${availabilityFilter === 'in_use' ? 'selected' : ''}>Currently In Use</option>
          </select>
        </div>

        <!-- Assets Grid -->
        <div class="stock-grid">
          ${items.map(item => `
            <div class="stock-card ${item.status === 'in_use' ? 'card-in-use' : ''}">
              <div class="stock-img-wrap" style="background-image: url('${item.image}');">
                <div class="stock-badges-top">
                  <span class="badge ${item.status === 'available' ? 'badge-success' : 'badge-dark'}">
                    ${item.status === 'available' ? '● Available for Pickup' : `Borrowed • Due ${item.dueBack || 'soon'}`}
                  </span>
                  <span class="badge badge-primary">${item.category}</span>
                </div>
              </div>

              <div class="stock-body">
                <h3 class="stock-title">${item.title}</h3>
                <p class="stock-desc">${item.description}</p>

                <div class="stock-lender-box">
                  <div class="lender-avatar">${item.lender.charAt(0)}</div>
                  <div class="lender-meta">
                    <span class="lender-name">${item.lender}</span>
                    <span class="lender-score">Trust Score: <strong>${item.trustScore}%</strong></span>
                  </div>
                </div>

                <div class="stock-info-row">
                  <div class="info-item">
                    <span class="lbl">${ICONS.mapPin} Proximity:</span>
                    <strong>${item.location}</strong>
                  </div>
                  <div class="info-item">
                    <span class="lbl">${ICONS.clock} Max Period:</span>
                    <strong>${item.maxBorrowDays} Days</strong>
                  </div>
                  <div class="info-item">
                    <span class="lbl">Deposit:</span>
                    <strong class="text-success">${item.depositRequired}</strong>
                  </div>
                </div>

                <div class="stock-action-wrap">
                  ${item.status === 'available' ? `
                    <button class="btn btn-primary btn-block borrow-item-btn" data-id="${item.id}">
                      ${ICONS.heartHandshake} Borrow with Trust Handshake
                    </button>
                  ` : `
                    <button class="btn btn-secondary btn-block" disabled>
                      Currently In Use (${item.dueBack})
                    </button>
                  `}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    const searchInput = container.querySelector('#stock-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderView();
      });
    }

    container.querySelectorAll('#stock-category-pills .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        selectedCategory = pill.dataset.cat;
        renderView();
      });
    });

    const statusSelect = container.querySelector('#stock-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        availabilityFilter = e.target.value;
        renderView();
      });
    }

    // List new item modal
    const listBtn = container.querySelector('#btn-list-asset');
    if (listBtn) {
      listBtn.addEventListener('click', () => {
        showListAssetModal();
      });
    }

    // Borrow item buttons
    container.querySelectorAll('.borrow-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.id;
        showBorrowModal(itemId);
      });
    });
  }

  function showBorrowModal(itemId) {
    const item = stockItems.find(i => i.id === itemId);
    if (!item) return;

    const modalEl = document.createElement('div');
    modalEl.className = 'modal-backdrop';
    modalEl.innerHTML = `
      <div class="modal-card animate-scale-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="badge-row">
            <span class="badge badge-success">Trust Handshake Lending</span>
            <span class="badge badge-dark">${item.category}</span>
          </div>
          <button class="modal-close-btn" id="borrow-close">${ICONS.close}</button>
        </div>

        <div class="borrow-flow-body">
          <h2 class="borrow-title">${item.title}</h2>
          <p class="borrow-sub">Lent by <strong>${item.lender}</strong> (Trust Score: ${item.trustScore}%)</p>

          <div class="borrow-terms-box">
            <h4>Hyperlocal Lending Agreement:</h4>
            <ul>
              <li>✓ Refundable Security Hold: <strong>${item.depositRequired}</strong> (released immediately upon verified return).</li>
              <li>✓ Return Period: Maximum <strong>${item.maxBorrowDays} days</strong>.</li>
              <li>✓ Emergency Priority: If a local civil rescue alert is issued, return may be requested early.</li>
            </ul>
          </div>

          <div class="form-group">
            <label class="form-label">Select Borrow Duration (Days)</label>
            <select class="form-control" id="borrow-days">
              <option value="1">1 Day (Rapid Emergency Need)</option>
              <option value="2" selected>2 Days (Standard Use)</option>
              <option value="${item.maxBorrowDays}">${item.maxBorrowDays} Days (Maximum Window)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Pickup Location & Locker PIN</label>
            <div class="pickup-address-box">
              <p>📍 <strong>${item.location}</strong></p>
              <p class="subtext">A 4-digit Handshake OTP will be generated for the neighbor when you click confirm.</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" id="borrow-cancel">Cancel</button>
          <button class="btn btn-primary" id="borrow-confirm">
            ${ICONS.check} Confirm & Generate Handshake PIN
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    const close = () => modalEl.remove();
    modalEl.querySelector('#borrow-close').addEventListener('click', close);
    modalEl.querySelector('#borrow-cancel').addEventListener('click', close);

    modalEl.querySelector('#borrow-confirm').addEventListener('click', () => {
      const days = parseInt(modalEl.querySelector('#borrow-days').value);
      const updated = borrowCommonStockItem(itemId, days);
      modalEl.remove();

      showPinConfirmation(updated);
      renderView();
      if (onStateUpdate) onStateUpdate();
    });
  }

  function showPinConfirmation(item) {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal-backdrop';
    modalEl.innerHTML = `
      <div class="modal-card animate-scale-in text-center" role="dialog" aria-modal="true">
        <div class="modal-header">
          <span class="badge badge-success">Handshake PIN Generated</span>
          <button class="modal-close-btn" id="pin-close">${ICONS.close}</button>
        </div>

        <div class="pin-display-wrap">
          <div class="handshake-icon">${ICONS.heartHandshake}</div>
          <h2>Ready for Hyperlocal Handshake!</h2>
          <p>Share this PIN with <strong>${item.lender}</strong> at pickup location:</p>
          <div class="giant-pin-display">${item.borrowPin}</div>
          <p class="text-muted">📍 ${item.location}</p>
          <p class="text-warning">Return Due: ${item.dueBack}</p>
        </div>

        <div class="modal-footer justify-center">
          <button class="btn btn-primary" id="pin-done">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
    const close = () => modalEl.remove();
    modalEl.querySelector('#pin-close').addEventListener('click', close);
    modalEl.querySelector('#pin-done').addEventListener('click', close);
  }

  function showListAssetModal() {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal-backdrop';
    modalEl.innerHTML = `
      <div class="modal-card animate-scale-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="badge-row">
            <span class="badge badge-primary">CommonStock Contributor</span>
            <span class="badge badge-success">Zero Commission</span>
          </div>
          <button class="modal-close-btn" id="list-close">${ICONS.close}</button>
        </div>

        <form id="list-asset-form">
          <div class="modal-body-scroll">
            <h2 class="form-title">Share an Asset with Your Neighborhood</h2>
            <p class="form-sub">Make tools or appliances in your storage available to neighbors in need.</p>

            <div class="form-group">
              <label class="form-label">Asset Title</label>
              <input type="text" id="asset-title" class="form-control" placeholder="e.g. Bosch Rotary Hammer Drill / 20L Water Canister" required />
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Category</label>
                <select class="form-control" id="asset-cat">
                  <option value="Power & Emergency">Power & Emergency</option>
                  <option value="Flood Drainage">Flood Drainage</option>
                  <option value="Sanitation & Water">Sanitation & Water</option>
                  <option value="Medical & Elder">Medical & Elder</option>
                  <option value="Rescue & Tools">Rescue & Tools</option>
                  <option value="Infant Care">Infant Care</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label class="form-label">Max Borrow Duration</label>
                <select class="form-control" id="asset-days">
                  <option value="2">2 Days</option>
                  <option value="4" selected>4 Days</option>
                  <option value="7">7 Days</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Pickup Locality / Landmark</label>
              <input type="text" id="asset-location" class="form-control" value="${user.locality}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Description & Operating Instructions</label>
              <textarea id="asset-desc" class="form-control" rows="3" placeholder="Condition, special cables included, or safety notes..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Refundable Security Hold</label>
              <input type="text" id="asset-deposit" class="form-control" value="$15 (Refundable)" />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="list-cancel">Cancel</button>
            <button type="submit" class="btn btn-primary">
              ${ICONS.tools} Add Asset to Library
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modalEl);

    const close = () => modalEl.remove();
    modalEl.querySelector('#list-close').addEventListener('click', close);
    modalEl.querySelector('#list-cancel').addEventListener('click', close);

    modalEl.querySelector('#list-asset-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = modalEl.querySelector('#asset-title').value;
      const category = modalEl.querySelector('#asset-cat').value;
      const maxBorrowDays = parseInt(modalEl.querySelector('#asset-days').value);
      const location = modalEl.querySelector('#asset-location').value;
      const description = modalEl.querySelector('#asset-desc').value;
      const depositRequired = modalEl.querySelector('#asset-deposit').value;

      addCommonStockItem({
        title,
        category,
        lender: `${user.name}`,
        location: `${location} (Hyperlocal)`,
        depositRequired,
        maxBorrowDays,
        description,
        condition: 'Good & Functional',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
      });

      modalEl.remove();
      renderView();
      if (onStateUpdate) onStateUpdate();
    });
  }

  renderView();
}
