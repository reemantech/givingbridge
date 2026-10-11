import { ICONS } from '../utils/icons.js';
import { getUserProfile } from '../utils/storage.js';

export function showReceiptModal(contribution, center) {
  const existingModal = document.getElementById('receipt-modal-root');
  if (existingModal) existingModal.remove();

  const user = getUserProfile();
  const dateFormatted = new Date(contribution.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const modalEl = document.createElement('div');
  modalEl.id = 'receipt-modal-root';
  modalEl.className = 'modal-backdrop';
  modalEl.innerHTML = `
    <div class="modal-card receipt-card animate-scale-in" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div class="badge-row">
          <span class="badge badge-success">${ICONS.check} Official Tax Exemption Receipt</span>
          <span class="badge badge-primary">Section 80G Certified</span>
        </div>
        <button class="modal-close-btn" id="receipt-close-btn" aria-label="Close receipt modal">${ICONS.close}</button>
      </div>

      <div class="receipt-printable" id="printable-receipt-area">
        <div class="receipt-header-banner">
          <div class="receipt-org-info">
            <h2 class="receipt-org-title">${center.name}</h2>
            <p class="receipt-org-sub">A unit of ${center.verificationBadge} • Registered NGO</p>
            <p class="receipt-reg-nums">Govt. Reg No: <strong>${center.regNumber}</strong> | 80G Order: <strong>CIT(E)/DEL/80G/2021-22/A-4190</strong></p>
          </div>
          <div class="receipt-seal">
            <div class="seal-inner">
              <span>VERIFIED</span>
              <span>80G TAX</span>
              <span>EXEMPT</span>
            </div>
          </div>
        </div>

        <div class="receipt-divider"></div>

        <div class="receipt-meta-grid">
          <div class="meta-col">
            <span class="meta-label">Receipt Number</span>
            <strong class="meta-val text-primary">${contribution.taxReceiptNo}</strong>
          </div>
          <div class="meta-col">
            <span class="meta-label">Date of Donation</span>
            <strong class="meta-val">${dateFormatted}</strong>
          </div>
          <div class="meta-col">
            <span class="meta-label">Payment Channel</span>
            <strong class="meta-val">Instant Secure Gateway (Verified)</strong>
          </div>
          <div class="meta-col">
            <span class="meta-label">Transaction ID</span>
            <strong class="meta-val font-mono">TXN-${Math.floor(10000000 + Math.random() * 90000000)}</strong>
          </div>
        </div>

        <div class="receipt-donor-box">
          <div class="donor-row">
            <span class="donor-label">Donor Name:</span>
            <strong class="donor-val">${user.name}</strong>
          </div>
          <div class="donor-row">
            <span class="donor-label">Donor Tax Identifier (PAN/TIN):</span>
            <strong class="donor-val font-mono">ABCPS${Math.floor(1000 + Math.random() * 9000)}F</strong>
          </div>
          <div class="donor-row">
            <span class="donor-label">Registered Contact:</span>
            <span class="donor-val">${user.phone} (${user.email})</span>
          </div>
        </div>

        <div class="receipt-table-wrap">
          <table class="receipt-table">
            <thead>
              <tr>
                <th>Relief Purpose</th>
                <th>Category</th>
                <th class="text-right">Donation Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${center.crisisTitle}</strong>
                  <div class="subtext">Direct humanitarian allocation to ${center.locality}</div>
                </td>
                <td>Emergency Disaster Fund</td>
                <td class="text-right"><strong class="amount-highlight">$${Number(contribution.pledgedAmountOrQty).toLocaleString()}</strong></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right"><strong>Total Contribution Received:</strong></td>
                <td class="text-right"><strong class="total-highlight">$${Number(contribution.pledgedAmountOrQty).toLocaleString()}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="receipt-statutory-clause">
          <p>
            <strong>Statutory Exemption Clause:</strong> Donations made to this relief operation qualify for 50% deduction under Section 80G of the Income Tax Act, 1961 (or equivalent tax exempt status under 501(c)(3) foreign equivalents). No goods or commercial services were provided in exchange for this contribution.
          </p>
        </div>

        <div class="receipt-signature-area">
          <div class="sig-block">
            <div class="sig-line"></div>
            <span class="sig-name">${center.coordinator || 'Finance Officer'}</span>
            <span class="sig-role">Authorized Signatory, ${center.name}</span>
          </div>
          <div class="sig-qr font-mono text-center">
            <span class="badge badge-success">DIGITALLY SIGNED & HASHED</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="receipt-copy-no-btn">
          ${ICONS.copy} Copy Receipt No
        </button>
        <button class="btn btn-primary" id="receipt-print-btn">
          ${ICONS.printer} Download / Print Tax Receipt
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  const close = () => modalEl.remove();
  modalEl.querySelector('#receipt-close-btn').addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });

  modalEl.querySelector('#receipt-copy-no-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(contribution.taxReceiptNo);
    const btn = modalEl.querySelector('#receipt-copy-no-btn');
    btn.innerHTML = `${ICONS.check} Copied!`;
    setTimeout(() => {
      btn.innerHTML = `${ICONS.copy} Copy Receipt No`;
    }, 2000);
  });

  modalEl.querySelector('#receipt-print-btn').addEventListener('click', () => {
    window.print();
  });
}
