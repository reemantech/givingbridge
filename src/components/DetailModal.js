import confetti from 'canvas-confetti';
import { ICONS } from '../utils/icons.js';
import {
  getStoredDemands,
  recordContribution,
  registerVolunteer,
  getUserProfile
} from '../utils/storage.js';
import { showPassModal } from './PassModal.js';
import { showReceiptModal } from './ReceiptModal.js';

export function openCenterDetailModal(center, onStateUpdate, initialCategory = 'money') {
  const existingModal = document.getElementById('center-detail-modal-root');
  if (existingModal) existingModal.remove();

  const demands = getStoredDemands().filter(d => d.centerId === center.id);
  const user = getUserProfile();

  let activeChannel = initialCategory;

  const modalEl = document.createElement('div');
  modalEl.id = 'center-detail-modal-root';
  modalEl.className = 'modal-backdrop';

  function renderModalContent() {
    modalEl.innerHTML = `
      <div class="modal-card detail-card animate-scale-in" role="dialog" aria-modal="true">
        <!-- Center Header Hero -->
        <div class="detail-hero" style="background-image: linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.95)), url('${center.image}');">
          <button class="modal-close-btn float-close" id="detail-close-btn" aria-label="Close modal">${ICONS.close}</button>
          
          <div class="hero-content">
            <div class="hero-badges">
              <span class="badge badge-verified">${ICONS.verified} ${center.verificationBadge}</span>
              <span class="badge badge-emergency">${center.crisisType.toUpperCase().replace('_', ' ')}</span>
              <span class="badge badge-dark">${center.distanceKm} km away</span>
            </div>
            <h1 class="hero-title">${center.name}</h1>
            <p class="hero-locality">${ICONS.mapPin} ${center.locality}, ${center.city}</p>
            <p class="hero-summary">${center.summary}</p>
            
            <div class="hero-meta-row">
              <div class="meta-pill">
                <span class="label">Ground Chief:</span>
                <strong>${center.coordinator}</strong>
              </div>
              <div class="meta-pill">
                <span class="label">Emergency Hotline:</span>
                <strong>${center.contactPhone}</strong>
              </div>
              <div class="meta-pill">
                <span class="label">Reg No:</span>
                <strong>${center.regNumber}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Needs Ticker -->
        <div class="urgent-ticker-bar">
          <div class="ticker-beacon">${ICONS.alert} LIVE ON-GROUND SHORTAGE:</div>
          <div class="ticker-message"><strong>${center.liveTicker}</strong></div>
        </div>

        <!-- Body Layout -->
        <div class="detail-body-grid">
          <!-- Left Column: Live Demands & Capacity -->
          <div class="demands-overview-col">
            <div class="section-title-wrap">
              <h3 class="section-title">Live Resource Capacity</h3>
              <span class="section-subtitle">Real-time inventory levels vs humanitarian target</span>
            </div>

            <div class="demands-bars-list">
              ${demands.map(demand => {
                const percent = Math.min(100, Math.round((demand.fulfilledQuantity / demand.targetQuantity) * 100));
                const urgencyClass = demand.urgencyLevel === 'critical' ? 'critical' : demand.urgencyLevel === 'moderate' ? 'moderate' : 'stable';
                return `
                  <div class="demand-bar-item" data-category="${demand.category}">
                    <div class="bar-top-row">
                      <div class="demand-label-group">
                        <span class="cat-icon cat-${demand.category}">${ICONS[demand.category] || ICONS.logo}</span>
                        <strong>${demand.label}</strong>
                      </div>
                      <span class="urgency-pill ${urgencyClass}">${demand.urgencyLevel}</span>
                    </div>

                    <div class="progress-track">
                      <div class="progress-fill ${urgencyClass}" style="width: ${percent}%;"></div>
                    </div>

                    <div class="bar-bottom-row">
                      <span class="subtext">${demand.description}</span>
                      <strong class="count-text">${demand.category === 'money' ? '$' : ''}${demand.fulfilledQuantity.toLocaleString()} / ${demand.category === 'money' ? '$' : ''}${demand.targetQuantity.toLocaleString()} ${demand.unit} (${percent}%)</strong>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right Column: Support Action Launcher -->
          <div class="action-launcher-col">
            <div class="launcher-header">
              <h3 class="launcher-title">Take Action: Choose How You Want to Help</h3>
              <p class="launcher-subtitle">Every commitment directly updates on-ground logistics</p>
            </div>

            <!-- 6 Support Channel Selector Tabs -->
            <div class="channel-tabs-grid" id="channel-tabs">
              <button class="channel-tab ${activeChannel === 'money' ? 'active' : ''}" data-cat="money">
                <span class="tab-icon">${ICONS.money}</span>
                <span class="tab-title">Money</span>
                <span class="tab-badge">Instant 80G</span>
              </button>
              <button class="channel-tab ${activeChannel === 'ration' ? 'active' : ''}" data-cat="ration">
                <span class="tab-icon">${ICONS.ration}</span>
                <span class="tab-title">Ration</span>
                <span class="tab-badge">QR Pass</span>
              </button>
              <button class="channel-tab ${activeChannel === 'clothes' ? 'active' : ''}" data-cat="clothes">
                <span class="tab-icon">${ICONS.clothes}</span>
                <span class="tab-title">Clothes</span>
                <span class="tab-badge">Drop-off/Pickup</span>
              </button>
              <button class="channel-tab ${activeChannel === 'stationary' ? 'active' : ''}" data-cat="stationary">
                <span class="tab-icon">${ICONS.stationary}</span>
                <span class="tab-title">Stationery</span>
                <span class="tab-badge">School Kits</span>
              </button>
              <button class="channel-tab ${activeChannel === 'utensils' ? 'active' : ''}" data-cat="utensils">
                <span class="tab-icon">${ICONS.utensils}</span>
                <span class="tab-title">Utensils</span>
                <span class="tab-badge">Kitchen Sets</span>
              </button>
              <button class="channel-tab ${activeChannel === 'volunteer' ? 'active' : ''}" data-cat="volunteer">
                <span class="tab-icon">${ICONS.volunteer}</span>
                <span class="tab-title">Volunteer</span>
                <span class="tab-badge">On-Ground</span>
              </button>
            </div>

            <!-- Dynamic Channel Form Container -->
            <div class="channel-form-container" id="channel-form-box">
              ${renderChannelForm(activeChannel, center, demands, user)}
            </div>
          </div>
        </div>
      </div>
    `;

    bindModalEvents();
  }

  function renderChannelForm(channel, center, demands, user) {
    const relevantDemand = demands.find(d => d.category === channel) || demands[0];

    switch (channel) {
      case 'money':
        return `
          <form class="channel-form" id="form-money">
            <div class="form-banner">
              <span class="banner-icon">${ICONS.money}</span>
              <div>
                <strong>Direct Financial Relief Aid</strong>
                <p>Funds transferred to verified ${center.name} account with instant 80G tax receipt.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Select Amount (USD / Equiv INR)</label>
              <div class="amount-presets">
                <button type="button" class="preset-btn" data-amt="25">$25</button>
                <button type="button" class="preset-btn active" data-amt="50">$50</button>
                <button type="button" class="preset-btn" data-amt="100">$100</button>
                <button type="button" class="preset-btn" data-amt="250">$250</button>
              </div>
              <div class="input-with-icon mt-2">
                <span class="input-prefix">$</span>
                <input type="number" id="money-amount" class="form-control" value="50" min="5" step="5" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Contribution Frequency</label>
                <div class="radio-pill-group">
                  <label class="radio-pill">
                    <input type="radio" name="money-freq" value="one-time" checked />
                    <span>One-Time Aid</span>
                  </label>
                  <label class="radio-pill">
                    <input type="radio" name="money-freq" value="monthly" />
                    <span>Monthly Crisis Support</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Payment Gateway Mode</label>
              <div class="payment-methods">
                <label class="pay-method selected">
                  <input type="radio" name="pay-method" value="card" checked />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label class="pay-method">
                  <input type="radio" name="pay-method" value="upi" />
                  <span>📱 Instant UPI / QR</span>
                </label>
                <label class="pay-method">
                  <input type="radio" name="pay-method" value="netbanking" />
                  <span>🏦 NetBanking</span>
                </label>
              </div>
            </div>

            <div class="tax-benefit-notice">
              ${ICONS.receipt} <strong>Tax Exemption:</strong> 80G Tax receipt will be issued to <strong>${user.name}</strong> immediately upon confirmation.
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg" id="submit-money-btn">
              ${ICONS.bolt} Confirm & Donate $<span id="donate-amt-display">50</span>
            </button>
          </form>
        `;

      case 'ration':
        return `
          <form class="channel-form" id="form-ration">
            <div class="form-banner">
              <span class="banner-icon">${ICONS.ration}</span>
              <div>
                <strong>Help with Emergency Ration Kits</strong>
                <p>Prevent food shortages for families in temporary tents.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Select Ration Kit Bundle</label>
              <select class="form-control" id="ration-kit-type">
                <option value="Staple Grain & Pulse Bundle (10kg Flour, 5kg Rice, 2kg Daal, Salt, Oil)">Staple Grain & Pulse Bundle (10kg Atta, 5kg Rice, 2kg Lentils, 1L Oil)</option>
                <option value="Ready-to-Eat Emergency Pack (High-calorie biscuits, ORS, dry fruits)">Ready-to-Eat Emergency Nutrition Pack (Biscuits, ORS, Dates)</option>
                <option value="Infant & Toddler Nutrition (Baby cereal, fortified milk, hygiene wipes)">Infant & Child Nutrition Pack (Baby cereal, milk formula)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Number of Kits to Provide</label>
              <div class="stepper-wrap">
                <button type="button" class="stepper-btn" id="stepper-minus">-</button>
                <input type="number" id="ration-qty" class="form-control text-center" value="5" min="1" max="200" />
                <button type="button" class="stepper-btn" id="stepper-plus">+</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Fulfillment Mode</label>
              <div class="fulfillment-options">
                <label class="fulfillment-card selected">
                  <input type="radio" name="ration-method" value="self_dropoff_qr" checked />
                  <div class="f-info">
                    <strong>Self Drop-off (Recommended)</strong>
                    <p>Generates an instant QR Pass to check in at Warehouse Dock #3</p>
                  </div>
                </label>
                <label class="fulfillment-card">
                  <input type="radio" name="ration-method" value="bulk_wholesale" />
                  <div class="f-info">
                    <strong>Direct Wholesale Partner Dispatch</strong>
                    <p>Bypasses retail; dispatched direct from partner grain silo</p>
                  </div>
                </label>
              </div>
            </div>

            <div class="form-check-box">
              <label class="checkbox-container">
                <input type="checkbox" id="ration-expiry-check" required checked />
                <span class="checkmark"></span>
                <span><strong>Hygiene & Shelf-Life Declaration:</strong> I certify all packaged food rations have at least 6 months remaining shelf life and factory seals intact.</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">
              ${ICONS.qr} Generate Drop-off Pass & Pledge Ration
            </button>
          </form>
        `;

      case 'clothes':
        return `
          <form class="channel-form" id="form-clothes">
            <div class="form-banner">
              <span class="banner-icon">${ICONS.clothes}</span>
              <div>
                <strong>Help with Clean Clothes & Warm Wear</strong>
                <p>Keep children, elders, and displaced families protected from weather.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Clothing Category</label>
              <select class="form-control" id="clothes-category">
                <option value="Thermal Blankets & Heavy Quilts">Thermal Woolen Blankets & Heavy Quilts</option>
                <option value="Children Winter Coats & Sweaters">Children & Toddler Winter Coats (Ages 0-12)</option>
                <option value="Adult Warm Wear (Jackets, Sweaters, Thermals)">Adult Warm Wear (Jackets, Sweaters, Thermals)</option>
                <option value="Waterproof Tarpaulins & Ponchos">Waterproof Heavy Tarpaulins & Rain Ponchos</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Quantity (Items / Bundles)</label>
              <input type="number" id="clothes-qty" class="form-control" value="10" min="1" max="500" required />
            </div>

            <div class="form-group">
              <label class="form-label">Logistics Option</label>
              <div class="fulfillment-options">
                <label class="fulfillment-card selected">
                  <input type="radio" name="clothes-method" value="self_dropoff_qr" checked />
                  <div class="f-info">
                    <strong>Drop-off at Shelter Warehouse</strong>
                    <p>Receive drop-off pass with warehouse dock timings (8 AM - 8 PM)</p>
                  </div>
                </label>
                <label class="fulfillment-card">
                  <input type="radio" name="clothes-method" value="home_pickup" />
                  <div class="f-info">
                    <strong>Community Volunteer Doorstep Pickup</strong>
                    <p>Local neighborhood runner picks up from your doorstep within 24h</p>
                  </div>
                </label>
              </div>
            </div>

            <div class="form-check-box">
              <label class="checkbox-container">
                <input type="checkbox" id="clothes-hygiene-check" required checked />
                <span class="checkmark"></span>
                <span><strong>Hygiene Guarantee:</strong> All clothes are clean, freshly washed, sorted by size, and sealed in dry polybags.</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">
              ${ICONS.check} Confirm Clothing Pledge
            </button>
          </form>
        `;

      case 'stationary':
        return `
          <form class="channel-form" id="form-stationary">
            <div class="form-banner">
              <span class="banner-icon">${ICONS.stationary}</span>
              <div>
                <strong>Help with Stationery & Makeshift School Kits</strong>
                <p>Support continuous learning and psychological healing for children.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Stationery Kit Type</label>
              <select class="form-control" id="stationary-kit-type">
                <option value="Child Relief Study Kit (Notebooks, Pencils, Erasers, Pencil Case)">Comprehensive School Kit (6 Notebooks, Pens, Pencils, Geometry)</option>
                <option value="Art & Trauma Healing Kit (Drawing pad, 24-crayon pack, stickers)">Art & Trauma Healing Kit (Drawing pads, oil pastels, sketch pens)</option>
                <option value="Primary Early Learning Pack (Alphabet workbooks, slate, chalk)">Primary Early Learning Pack (Workbooks, slates, picture charts)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Number of Student Kits</label>
              <input type="number" id="stationary-qty" class="form-control" value="8" min="1" max="100" required />
            </div>

            <div class="checklist-box">
              <strong>Kit Standard Checklist:</strong>
              <ul>
                <li>✓ Unruled/ruled standard A4 or Crown size paper</li>
                <li>✓ Non-toxic certified crayons/pencils</li>
                <li>✓ Label with child grade range</li>
              </ul>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">
              ${ICONS.qr} Generate Stationery Drop-off Pass
            </button>
          </form>
        `;

      case 'utensils':
        return `
          <form class="channel-form" id="form-utensils">
            <div class="form-banner">
              <span class="banner-icon">${ICONS.utensils}</span>
              <div>
                <strong>Help with Cooking Utensils & Kitchen Kits</strong>
                <p>Enable displaced community kitchens and families to cook warm meals.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Utensil / Kitchen Equipment Type</label>
              <select class="form-control" id="utensil-type">
                <option value="Stainless Steel Family Thali Set (4 Plates, 4 Bowls, 4 Spoons, 4 Glasses)">Stainless Steel Family Set (4 Plates, 4 Bowls, 4 Spoons, Glasses)</option>
                <option value="Pressure Cooker & Heavy Cooking Pot Set (5L Cooker, Kadai, Ladles)">Pressure Cooker & Heavy Cooking Pot Set (5L Cooker, Kadai, Ladles)</option>
                <option value="Insulated 10L Thermal Food/Water Dispenser">Insulated 10L Thermal Food/Water Dispenser</option>
                <option value="Portable Single-Burner LPG Stove & Pipe">Portable Single-Burner LPG Stove & Regulator Pipe</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Number of Sets</label>
              <input type="number" id="utensil-qty" class="form-control" value="3" min="1" max="50" required />
            </div>

            <div class="form-check-box">
              <label class="checkbox-container">
                <input type="checkbox" id="utensil-check" required checked />
                <span class="checkmark"></span>
                <span><strong>Safety Checklist:</strong> Clean, food-grade stainless steel or tested pressure valves.</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">
              ${ICONS.qr} Generate Utensil Receiving Pass
            </button>
          </form>
        `;

      case 'volunteer':
        return `
          <form class="channel-form" id="form-volunteer">
            <div class="form-banner">
              <span class="banner-icon">${ICONS.volunteer}</span>
              <div>
                <strong>Volunteer On-Ground at ${center.name}</strong>
                <p>Join the emergency triage, logistics, or medical response team.</p>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Preferred Shift Availability</label>
              <select class="form-control" id="vol-shift">
                <option value="Immediate Emergency Response (Next 4 Hours)">Immediate Emergency Response (Next 4 Hours)</option>
                <option value="Morning Relief Dispatch (08:00 AM - 01:00 PM)">Morning Relief Dispatch (08:00 AM - 01:00 PM)</option>
                <option value="Evening Food Sorting & Packaging (04:00 PM - 08:30 PM)">Evening Food Sorting & Packaging (04:00 PM - 08:30 PM)</option>
                <option value="Weekend Full-Day Camp Support">Weekend Full-Day Camp Support</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Select Your Relevant Skills</label>
              <div class="skills-checkbox-grid">
                <label class="skill-checkbox-pill">
                  <input type="checkbox" name="vol-skills" value="Medical & First Aid" checked />
                  <span>🩺 Medical / First Aid</span>
                </label>
                <label class="skill-checkbox-pill">
                  <input type="checkbox" name="vol-skills" value="Logistics & Driving" checked />
                  <span>🚚 Logistics & Driving</span>
                </label>
                <label class="skill-checkbox-pill">
                  <input type="checkbox" name="vol-skills" value="Community Cooking" />
                  <span>🍲 Mass Cooking</span>
                </label>
                <label class="skill-checkbox-pill">
                  <input type="checkbox" name="vol-skills" value="Heavy Debris Labor" />
                  <span>🏗️ Heavy Labor / Moving</span>
                </label>
                <label class="skill-checkbox-pill">
                  <input type="checkbox" name="vol-skills" value="Translation & Counseling" />
                  <span>🗣️ Translation / Triage</span>
                </label>
                <label class="skill-checkbox-pill">
                  <input type="checkbox" name="vol-skills" value="Barcode & Data Entry" />
                  <span>💻 Inventory / Data</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Citizen ID Verification</label>
              <div class="id-upload-box">
                <div class="upload-icon">${ICONS.verified}</div>
                <div class="upload-text">
                  <strong>Govt. ID Linked (Aadhaar / Passport / DL)</strong>
                  <p class="subtext">Auto-verified for ${user.name} (${user.phone})</p>
                </div>
                <span class="badge badge-success">Pre-Verified</span>
              </div>
            </div>

            <div class="form-check-box">
              <label class="checkbox-container">
                <input type="checkbox" id="vol-sms-opt" checked />
                <span class="checkmark"></span>
                <span>Enroll in Urgent WhatsApp / SMS Emergency Broadcast Dispatch Group</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg">
              ${ICONS.volunteer} Confirm Roster Enrollment
            </button>
          </form>
        `;

      default:
        return `<p>Select a support channel above.</p>`;
    }
  }

  function bindModalEvents() {
    const close = () => modalEl.remove();
    modalEl.querySelector('#detail-close-btn').addEventListener('click', close);
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) close();
    });

    // Channel tab clicks
    const tabs = modalEl.querySelectorAll('.channel-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeChannel = tab.dataset.cat;
        const formBox = modalEl.querySelector('#channel-form-box');
        formBox.innerHTML = renderChannelForm(activeChannel, center, demands, user);
        bindFormEvents();
      });
    });

    bindFormEvents();
  }

  function bindFormEvents() {
    // 1. Money preset buttons
    const presetBtns = modalEl.querySelectorAll('.preset-btn');
    const moneyInput = modalEl.querySelector('#money-amount');
    const donateAmtDisplay = modalEl.querySelector('#donate-amt-display');

    if (presetBtns.length && moneyInput) {
      presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          presetBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          moneyInput.value = btn.dataset.amt;
          if (donateAmtDisplay) donateAmtDisplay.textContent = btn.dataset.amt;
        });
      });

      moneyInput.addEventListener('input', () => {
        if (donateAmtDisplay) donateAmtDisplay.textContent = moneyInput.value || '0';
        presetBtns.forEach(b => b.classList.remove('active'));
      });
    }

    // Stepper buttons for ration
    const minusBtn = modalEl.querySelector('#stepper-minus');
    const plusBtn = modalEl.querySelector('#stepper-plus');
    const qtyInput = modalEl.querySelector('#ration-qty');
    if (minusBtn && plusBtn && qtyInput) {
      minusBtn.addEventListener('click', () => {
        qtyInput.value = Math.max(1, parseInt(qtyInput.value || 1) - 1);
      });
      plusBtn.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value || 1) + 1;
      });
    }

    // Money form submit
    const formMoney = modalEl.querySelector('#form-money');
    if (formMoney) {
      formMoney.addEventListener('submit', (e) => {
        e.preventDefault();
        const amt = modalEl.querySelector('#money-amount').value;
        const moneyDemand = demands.find(d => d.category === 'money') || demands[0];

        const contribution = recordContribution({
          centerId: center.id,
          demandId: moneyDemand.id,
          category: 'money',
          amountOrQty: amt,
          method: 'online_payment',
          metadata: {
            frequency: modalEl.querySelector('input[name="money-freq"]:checked')?.value || 'one-time'
          }
        });

        triggerCelebration();
        modalEl.remove();
        if (onStateUpdate) onStateUpdate();
        showReceiptModal(contribution, center);
      });
    }

    // Ration form submit
    const formRation = modalEl.querySelector('#form-ration');
    if (formRation) {
      formRation.addEventListener('submit', (e) => {
        e.preventDefault();
        const qty = modalEl.querySelector('#ration-qty').value;
        const kitType = modalEl.querySelector('#ration-kit-type').value;
        const method = modalEl.querySelector('input[name="ration-method"]:checked').value;
        const rationDemand = demands.find(d => d.category === 'ration') || demands[0];

        const contribution = recordContribution({
          centerId: center.id,
          demandId: rationDemand.id,
          category: 'ration',
          amountOrQty: qty,
          method: method,
          metadata: { kitType }
        });

        triggerCelebration();
        modalEl.remove();
        if (onStateUpdate) onStateUpdate();
        showPassModal(contribution, center);
      });
    }

    // Clothes form submit
    const formClothes = modalEl.querySelector('#form-clothes');
    if (formClothes) {
      formClothes.addEventListener('submit', (e) => {
        e.preventDefault();
        const qty = modalEl.querySelector('#clothes-qty').value;
        const clothesType = modalEl.querySelector('#clothes-category').value;
        const method = modalEl.querySelector('input[name="clothes-method"]:checked').value;
        const clothesDemand = demands.find(d => d.category === 'clothes') || demands[0];

        const contribution = recordContribution({
          centerId: center.id,
          demandId: clothesDemand.id,
          category: 'clothes',
          amountOrQty: qty,
          method: method,
          metadata: { clothesType }
        });

        triggerCelebration();
        modalEl.remove();
        if (onStateUpdate) onStateUpdate();
        showPassModal(contribution, center);
      });
    }

    // Stationary form submit
    const formStationary = modalEl.querySelector('#form-stationary');
    if (formStationary) {
      formStationary.addEventListener('submit', (e) => {
        e.preventDefault();
        const qty = modalEl.querySelector('#stationary-qty').value;
        const kitType = modalEl.querySelector('#stationary-kit-type').value;
        const stationaryDemand = demands.find(d => d.category === 'stationary') || demands[0];

        const contribution = recordContribution({
          centerId: center.id,
          demandId: stationaryDemand.id,
          category: 'stationary',
          amountOrQty: qty,
          method: 'self_dropoff_qr',
          metadata: { kitType }
        });

        triggerCelebration();
        modalEl.remove();
        if (onStateUpdate) onStateUpdate();
        showPassModal(contribution, center);
      });
    }

    // Utensils form submit
    const formUtensils = modalEl.querySelector('#form-utensils');
    if (formUtensils) {
      formUtensils.addEventListener('submit', (e) => {
        e.preventDefault();
        const qty = modalEl.querySelector('#utensil-qty').value;
        const utensilType = modalEl.querySelector('#utensil-type').value;
        const utensilDemand = demands.find(d => d.category === 'utensils') || demands[0];

        const contribution = recordContribution({
          centerId: center.id,
          demandId: utensilDemand.id,
          category: 'utensils',
          amountOrQty: qty,
          method: 'self_dropoff_qr',
          metadata: { utensilType }
        });

        triggerCelebration();
        modalEl.remove();
        if (onStateUpdate) onStateUpdate();
        showPassModal(contribution, center);
      });
    }

    // Volunteer form submit
    const formVolunteer = modalEl.querySelector('#form-volunteer');
    if (formVolunteer) {
      formVolunteer.addEventListener('submit', (e) => {
        e.preventDefault();
        const shiftName = modalEl.querySelector('#vol-shift').value;
        const selectedSkills = Array.from(modalEl.querySelectorAll('input[name="vol-skills"]:checked')).map(cb => cb.value);

        registerVolunteer({
          centerId: center.id,
          skills: selectedSkills,
          availabilityDates: [new Date().toISOString().split('T')[0]],
          shiftName
        });

        triggerCelebration();
        modalEl.remove();
        if (onStateUpdate) onStateUpdate();
        showVolunteerSuccessToast(center, shiftName);
      });
    }
  }

  function triggerCelebration() {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  function showVolunteerSuccessToast(center, shift) {
    const toast = document.createElement('div');
    toast.className = 'toast-alert animate-slide-up';
    toast.innerHTML = `
      <div class="toast-icon text-success">${ICONS.check}</div>
      <div class="toast-body">
        <strong>Enrolled in Volunteer Incident Roster!</strong>
        <p>You are scheduled for <strong>${shift}</strong> at <strong>${center.name}</strong>. An emergency SMS/WhatsApp dispatch ping has been sent to your phone with coordinator contact info.</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">${ICONS.close}</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 8000);
  }

  renderModalContent();
  document.body.appendChild(modalEl);
}
