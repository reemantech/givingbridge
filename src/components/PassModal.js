import QRCode from 'qrcode';
import { ICONS } from '../utils/icons.js';

export async function showPassModal(contribution, center) {
  const existingModal = document.getElementById('pass-modal-root');
  if (existingModal) existingModal.remove();

  // Generate QR code data URL
  const qrDataPayload = JSON.stringify({
    passCode: contribution.passCode,
    centerId: center.id,
    centerName: center.name,
    category: contribution.category,
    qty: contribution.pledgedAmountOrQty,
    ts: contribution.createdAt,
    status: contribution.status
  });

  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(qrDataPayload, {
      width: 240,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('QR code generation error:', err);
  }

  const modalEl = document.createElement('div');
  modalEl.id = 'pass-modal-root';
  modalEl.className = 'modal-backdrop';
  modalEl.innerHTML = `
    <div class="modal-card pass-card animate-scale-in" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div class="badge-row">
          <span class="badge badge-success">${ICONS.check} Pass Generated & Active</span>
          <span class="badge badge-dark">Warehouse Intake</span>
        </div>
        <button class="modal-close-btn" id="pass-close-btn" aria-label="Close pass modal">${ICONS.close}</button>
      </div>

      <div class="pass-printable" id="printable-pass-area">
        <div class="pass-ticket-header">
          <div class="pass-logo-wrap">
            <span class="pass-brand">budHelp</span>
            <span class="pass-type-chip">EMERGENCY RELIEF PASS</span>
          </div>
          <div class="pass-code-display">${contribution.passCode}</div>
        </div>

        <div class="pass-body-grid">
          <div class="pass-qr-box">
            <img src="${qrDataUrl}" alt="Check-in QR Code" class="pass-qr-image" />
            <p class="pass-qr-hint">Scan at Receiving Dock</p>
          </div>

          <div class="pass-details-list">
            <div class="pass-detail-item">
              <span class="label">Relief Destination</span>
              <strong class="value text-primary">${center.name}</strong>
              <small class="subvalue">${center.locality}, ${center.city}</small>
            </div>

            <div class="pass-detail-item">
              <span class="label">Resource Pledged</span>
              <div class="pass-resource-badge">
                <span class="category-tag">${contribution.category.toUpperCase()}</span>
                <strong class="resource-qty">${contribution.pledgedAmountOrQty} ${contribution.category === 'money' ? '$' : 'Units'}</strong>
              </div>
            </div>

            <div class="pass-detail-item">
              <span class="label">Dock Assignment & Contact</span>
              <strong class="value">Intake Bay #3 (East Gate)</strong>
              <small class="subvalue">Coordinator: ${center.coordinator || 'Ground Chief'} (${center.contactPhone})</small>
            </div>

            <div class="pass-detail-item">
              <span class="label">Valid Until</span>
              <strong class="value text-warning">48 Hours from issuance</strong>
            </div>
          </div>
        </div>

        <div class="pass-footer-guidance">
          <div class="guidance-icon">${ICONS.alert}</div>
          <div class="guidance-text">
            <strong>Drop-off Instructions:</strong> Pack items securely in sanitized cartons. Present this screen or printed pass to the warehouse guard. Once scanned by the coordinator, status updates to <em>"Verified Received"</em> automatically.
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="pass-copy-code-btn">
          ${ICONS.copy} Copy Pass Code
        </button>
        <button class="btn btn-primary" id="pass-print-btn">
          ${ICONS.printer} Print / Save PDF
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  // Bind close
  const close = () => modalEl.remove();
  modalEl.querySelector('#pass-close-btn').addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });

  // Bind copy
  modalEl.querySelector('#pass-copy-code-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(contribution.passCode);
    const btn = modalEl.querySelector('#pass-copy-code-btn');
    btn.innerHTML = `${ICONS.check} Copied!`;
    setTimeout(() => {
      btn.innerHTML = `${ICONS.copy} Copy Pass Code`;
    }, 2000);
  });

  // Bind print
  modalEl.querySelector('#pass-print-btn').addEventListener('click', () => {
    window.print();
  });
}
