import L from 'leaflet';
import confetti from 'canvas-confetti';
import { ICONS } from '../utils/icons.js';
import {
  getStoredAnimalShelters,
  getStoredSponsorshipCatalog,
  getStoredAnimalMedicalRecords,
  sponsorMedicalItem,
  ingestAnimalMedicalRecord,
  getActiveRole,
  setActiveRole,
  getUserProfile
} from '../utils/storage.js';

let outbreakMapInstance = null;
let outbreakMarkers = [];

export function renderShelterWatchView(container, onStateUpdate) {
  const shelters = getStoredAnimalShelters();
  const catalog = getStoredSponsorshipCatalog();
  const records = getStoredAnimalMedicalRecords();
  const currentRole = getActiveRole();
  const user = getUserProfile();

  let selectedSampleDoc = 'sample1'; // 'sample1', 'sample2', 'custom'
  let isAiProcessing = false;
  let extractedPayload = null;

  function renderView() {
    const isStaff = currentRole === 'ngo_staff' || currentRole === 'vet_partner';

    // Calculate live epidemiological KPIs
    const totalRecords = records.length;
    const positiveCases = records.filter(r => r.testResult === 'positive').length;
    const positivityRate = totalRecords > 0 ? ((positiveCases / totalRecords) * 100).toFixed(1) : 0;
    const totalFundedKits = catalog.reduce((sum, item) => sum + (item.unitsFunded || 0), 0);

    container.innerHTML = `
      <div class="shelterwatch-page">
        <!-- Hero Header -->
        <div class="shelterwatch-hero">
          <div class="hero-left">
            <div class="badge-row mb-2">
              <span class="concept-chip">CONCEPT 4 • ONE HEALTH & ANIMAL WELFARE</span>
              <span class="badge ${isStaff ? 'badge-emergency' : 'badge-primary'}">
                ${isStaff ? '🔐 NGO Staff & Vet Partner Mode' : '🐾 Public Citizen Mode'}
              </span>
            </div>
            <h1 class="page-title">ShelterWatch & Rabies Guard</h1>
            <p class="page-desc">
              Hyperlocal stray disease surveillance, micro-funded rabies diagnostic test kits, and multimodal AI document ingestion for overburdened animal rescue sanctuaries.
            </p>

            <div class="hero-stat-row">
              <div class="stat-pill">
                <strong>${totalFundedKits}</strong>
                <span>Kits & Doses Funded</span>
              </div>
              <div class="stat-pill">
                <strong>${shelters.reduce((acc, s) => acc + s.currentQuarantineCount, 0)}</strong>
                <span>Animals in Quarantine</span>
              </div>
              <div class="stat-pill">
                <strong class="text-danger">${positiveCases} Hotspot Alert${positiveCases !== 1 ? 's' : ''}</strong>
                <span>Rabies Geotags</span>
              </div>
            </div>
          </div>

          <div class="hero-right">
            <!-- Role Toggle Switcher -->
            <div class="role-switch-card">
              <span class="role-switch-label">Current Portal Access:</span>
              <div class="role-toggle-group">
                <button class="role-btn ${!isStaff ? 'active' : ''}" id="role-citizen-btn">
                  👤 Citizen Donor
                </button>
                <button class="role-btn ${isStaff ? 'active' : ''}" id="role-staff-btn">
                  🩺 NGO Staff & Vet
                </button>
              </div>
              <small class="role-hint">
                ${isStaff ? '✓ Unlocked: Multimodal AI Ingestion & Cluster Heatmap' : 'Public Mode: Micro-fund test kits & quarantine'}
              </small>
            </div>
          </div>
        </div>

        ${!isStaff ? renderPublicSponsorshipSection(catalog, shelters) : renderStaffPortalSection(records, shelters, positivityRate, totalFundedKits)}
      </div>
    `;

    bindEvents();
    if (isStaff) {
      initOutbreakMap(records);
    }
  }

  function renderPublicSponsorshipSection(catalog, shelters) {
    return `
      <!-- Micro-Targeted Sponsorship Showcase -->
      <div class="section-title-wrap mb-3">
        <h2 class="section-title">Direct Micro-Targeted Medical Sponsorships</h2>
        <span class="section-subtitle">Fund specific physical test kits and vaccine vials — avoid vague donation pools</span>
      </div>

      <div class="sponsorship-grid mb-4">
        ${catalog.map(item => {
          const percent = Math.min(100, Math.round((item.unitsFunded / item.unitsNeeded) * 100));
          return `
            <div class="sponsorship-card">
              <div class="sponsorship-header">
                <span class="item-tag">${item.targetPathogen}</span>
                <span class="item-cost">${item.costUnitDisplay}</span>
              </div>

              <h3 class="item-title">${item.itemName}</h3>
              <p class="item-desc">${item.description}</p>

              <div class="sponsorship-progress">
                <div class="progress-labels">
                  <span>Funded: <strong>${item.unitsFunded} / ${item.unitsNeeded} units</strong></span>
                  <span class="text-success">${percent}%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill stable" style="width: ${percent}%;"></div>
                </div>
              </div>

              <div class="sponsorship-actions">
                <button class="btn btn-primary btn-block sponsor-btn" data-id="${item.id}" data-name="${item.itemName}" data-cost="${item.costPerUnit}">
                  ${ICONS.bolt} Sponsor 1 Unit (${item.costUnitDisplay.split(' ')[0]})
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Active Shelters Quarantine Status -->
      <div class="section-title-wrap mb-3">
        <h2 class="section-title">Verified Animal Shelters & Quarantine Wards</h2>
        <span class="section-subtitle">Real-time isolation capacity and bite surveillance intake tracking</span>
      </div>

      <div class="shelter-status-grid">
        ${shelters.map(s => {
          const occPercent = Math.round((s.currentQuarantineCount / s.quarantineCapacity) * 100);
          return `
            <div class="shelter-status-card">
              <div class="shelter-header-row">
                <span class="badge badge-verified">✓ AWBI Certified</span>
                <span class="badge ${s.hasIsolationWard ? 'badge-emergency' : 'badge-dark'}">
                  ${s.hasIsolationWard ? 'Biosecure Isolation Ward Active' : 'General Ward'}
                </span>
              </div>

              <h3 class="shelter-name">${s.shelterName}</h3>

              <div class="quarantine-gauge-box">
                <div class="gauge-label-row">
                  <span>Bite Quarantine Occupancy:</span>
                  <strong>${s.currentQuarantineCount} / ${s.quarantineCapacity} Kennels (${occPercent}%)</strong>
                </div>
                <div class="progress-track">
                  <div class="progress-fill ${occPercent > 80 ? 'critical' : 'moderate'}" style="width: ${occPercent}%;"></div>
                </div>
              </div>

              <div class="shelter-footer-meta">
                <span>Active Vets: <strong>${s.activeVetsCount} On-Duty</strong></span>
                <span>Suspect Hotspots: <strong class="text-danger">${s.rabiesPositiveClusterCount} Local Clusters</strong></span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderStaffPortalSection(records, shelters, positivityRate, totalFundedKits) {
    return `
      <!-- Staff Operations Console -->
      <div class="staff-portal-grid">
        <!-- Left: Multimodal AI Ingestion Pipeline -->
        <div class="ai-ingestion-card">
          <div class="panel-header">
            <div class="header-title-group">
              <span class="panel-icon text-primary">${ICONS.sparkles}</span>
              <div>
                <h3 class="panel-title">Multimodal AI Diagnostic Report Ingestion</h3>
                <p class="panel-sub">Optical character recognition & structured clinical extraction</p>
              </div>
            </div>
          </div>

          <div class="panel-body">
            <!-- Sample Selector -->
            <div class="form-group">
              <label class="form-label">Select Veterinary Clinical Document to Ingest:</label>
              <div class="sample-doc-selector">
                <label class="doc-choice ${selectedSampleDoc === 'sample1' ? 'active' : ''}">
                  <input type="radio" name="sample-doc" value="sample1" ${selectedSampleDoc === 'sample1' ? 'checked' : ''} />
                  <div class="doc-meta">
                    <strong>📷 Lateral Flow Assay Cassette Photo</strong>
                    <small>Bite rescue dog #092 (Negative RIDT Rapid Strip)</small>
                  </div>
                </label>
                <label class="doc-choice ${selectedSampleDoc === 'sample2' ? 'active' : ''}">
                  <input type="radio" name="sample-doc" value="sample2" ${selectedSampleDoc === 'sample2' ? 'checked' : ''} />
                  <div class="doc-meta">
                    <strong>📄 Saliva RT-PCR Laboratory Report</strong>
                    <small>Sector 43 aggressive canine (POSITIVE Rabies Hotspot)</small>
                  </div>
                </label>
              </div>
            </div>

            <!-- Upload Area & AI Scanner Simulation -->
            <div class="ai-scan-box ${isAiProcessing ? 'scanning' : ''}">
              <div class="scan-beam"></div>
              <div class="scan-content">
                <div class="doc-preview-icon">${ICONS.receipt}</div>
                <strong id="doc-title-text">${selectedSampleDoc === 'sample1' ? 'RIDT_Cassette_Tag092.jpg' : 'Lab_Report_PCR_Rabies_Pos.pdf'}</strong>
                <p class="subtext">Multimodal OCR Pipeline: Extracts Tag, Species, Test Type, Result & Clinical Signs</p>
                
                <button class="btn btn-primary btn-sm mt-3" id="btn-run-ai" ${isAiProcessing ? 'disabled' : ''}>
                  ${isAiProcessing ? `${ICONS.clock} Processing Neural OCR...` : `${ICONS.sparkles} Extract Structured Clinical JSON`}
                </button>
              </div>
            </div>

            <!-- Human-in-the-Loop Validation Screen -->
            <div class="validation-panel mt-4" id="validation-panel" style="${!extractedPayload ? 'display: none;' : ''}">
              <div class="validation-header">
                <span class="badge badge-success">✓ Entity Extraction Complete</span>
                <span class="confidence-badge">Confidence: <strong id="val-conf">98%</strong></span>
              </div>

              <form id="hitl-form" class="mt-3">
                <div class="form-row">
                  <div class="form-group flex-1">
                    <label class="form-label">Animal Identifier Tag</label>
                    <input type="text" id="val-tag" class="form-control font-mono" value="" required />
                  </div>
                  <div class="form-group flex-1">
                    <label class="form-label">Species</label>
                    <input type="text" id="val-species" class="form-control" value="canine" required />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group flex-1">
                    <label class="form-label">Diagnostic Test Type</label>
                    <select class="form-control" id="val-test-type">
                      <option value="RIDT">RIDT (Rapid Lateral Flow)</option>
                      <option value="RT-PCR">RT-PCR (Molecular Assay)</option>
                      <option value="dFA">dFA (Fluorescent Antibody)</option>
                    </select>
                  </div>
                  <div class="form-group flex-1">
                    <label class="form-label">Test Result</label>
                    <select class="form-control" id="val-result">
                      <option value="negative">Negative</option>
                      <option value="positive">POSITIVE (Critical Rabies)</option>
                      <option value="inconclusive">Inconclusive</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Clinical Signs Noted</label>
                  <input type="text" id="val-signs" class="form-control" value="hypersalivation, lethargy" required />
                </div>

                <div class="form-row">
                  <div class="form-group flex-1">
                    <label class="form-label">Attending Veterinarian</label>
                    <input type="text" id="val-vet" class="form-control" value="Dr. R. Sharma" required />
                  </div>
                  <div class="form-group flex-1">
                    <label class="form-label">Quarantine Window (Days)</label>
                    <input type="number" id="val-days" class="form-control" value="10" min="1" max="30" required />
                  </div>
                </div>

                <button type="submit" class="btn btn-emergency btn-block mt-3">
                  ${ICONS.database} Human Verified: Ingest into PostGIS Database
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Right: Epidemiological Dashboard & Spatial Cluster Heatmap -->
        <div class="outbreak-dashboard-col">
          <!-- KPI Cards -->
          <div class="kpi-row">
            <div class="kpi-mini-card">
              <span class="lbl">Tested Rescues</span>
              <strong class="val">${records.length}</strong>
              <small class="sub">Intake Surveillance</small>
            </div>
            <div class="kpi-mini-card">
              <span class="lbl">Positivity Rate</span>
              <strong class="val ${positivityRate > 0 ? 'text-danger' : 'text-success'}">${positivityRate}%</strong>
              <small class="sub">Rabies Surveillance</small>
            </div>
            <div class="kpi-mini-card">
              <span class="lbl">Funded Kits</span>
              <strong class="val text-primary">${totalFundedKits}</strong>
              <small class="sub">Donor Backed</small>
            </div>
          </div>

          <!-- Spatial Outbreak Cluster Map -->
          <div class="outbreak-map-card mt-3">
            <div class="outbreak-map-header">
              <div>
                <h3 class="panel-title">Spatial Outbreak Cluster & Geotag Map</h3>
                <p class="panel-sub">PostGIS Geotagged Rescue Locations & High-Risk Rabies Zones</p>
              </div>
              <div class="map-legend-row">
                <span class="legend-pill red">● Positive Hotspot</span>
                <span class="legend-pill yellow">● Inconclusive</span>
                <span class="legend-pill green">● Negative</span>
              </div>
            </div>

            <div id="outbreak-leaflet-map" class="outbreak-leaflet-map"></div>
          </div>

          <!-- Recent Medical Records Feed -->
          <div class="records-feed-card mt-3">
            <h4 class="feed-title">Recent Ingested Clinical Records:</h4>
            <div class="records-list">
              ${records.slice(0, 4).map(r => `
                <div class="record-feed-item ${r.testResult}">
                  <div class="feed-left">
                    <strong class="feed-tag font-mono">${r.animalIdentifier}</strong>
                    <span class="feed-species">${r.species} • ${r.testType}</span>
                    <small class="feed-loc">📍 ${r.rescueLocation}</small>
                  </div>
                  <div class="feed-right">
                    <span class="badge ${r.testResult === 'positive' ? 'badge-emergency' : r.testResult === 'negative' ? 'badge-success' : 'badge-dark'}">
                      ${r.testResult.toUpperCase()}
                    </span>
                    <small class="feed-vet">${r.vetName}</small>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    // Role switchers
    const citizenBtn = container.querySelector('#role-citizen-btn');
    const staffBtn = container.querySelector('#role-staff-btn');

    if (citizenBtn) {
      citizenBtn.addEventListener('click', () => {
        setActiveRole('citizen');
        renderView();
        if (onStateUpdate) onStateUpdate();
      });
    }

    if (staffBtn) {
      staffBtn.addEventListener('click', () => {
        setActiveRole('ngo_staff');
        renderView();
        if (onStateUpdate) onStateUpdate();
      });
    }

    // Public sponsor buttons
    container.querySelectorAll('.sponsor-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.id;
        const itemName = btn.dataset.name;
        const shelter = shelters[0];

        const { contribution, item } = sponsorMedicalItem({
          centerId: shelter.centerId,
          shelterId: shelter.id,
          itemId,
          qty: 1
        });

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });

        showSponsorshipToast(itemName, contribution.passCode);
        renderView();
        if (onStateUpdate) onStateUpdate();
      });
    });

    // Sample doc choices in staff view
    container.querySelectorAll('input[name="sample-doc"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedSampleDoc = e.target.value;
        const titleText = container.querySelector('#doc-title-text');
        if (titleText) {
          titleText.textContent = selectedSampleDoc === 'sample1' ? 'RIDT_Cassette_Tag092.jpg' : 'Lab_Report_PCR_Rabies_Pos.pdf';
        }
      });
    });

    // Run AI button
    const runAiBtn = container.querySelector('#btn-run-ai');
    if (runAiBtn) {
      runAiBtn.addEventListener('click', () => {
        simulateAiExtraction();
      });
    }

    // HITL form submission
    const hitlForm = container.querySelector('#hitl-form');
    if (hitlForm) {
      hitlForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const animalIdentifier = container.querySelector('#val-tag').value;
        const species = container.querySelector('#val-species').value;
        const testType = container.querySelector('#val-test-type').value;
        const testResult = container.querySelector('#val-result').value;
        const clinicalSigns = container.querySelector('#val-signs').value.split(',').map(s => s.trim());
        const vetName = container.querySelector('#val-vet').value;
        const quarantineDays = parseInt(container.querySelector('#val-days').value);

        const newRec = ingestAnimalMedicalRecord({
          shelterId: shelters[0].id,
          animalIdentifier,
          species,
          rescueLatitude: 28.4420 + (Math.random() - 0.5) * 0.04,
          rescueLongitude: 77.0950 + (Math.random() - 0.5) * 0.04,
          rescueLocation: "Sector 43 / Golf Course Ext Corridor",
          originalReportUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
          testType,
          testResult,
          confidenceScore: 0.98,
          targetPathogen: "Rabies Virus Antigen",
          clinicalSignsNoted: clinicalSigns,
          quarantineRecommendedDays: quarantineDays,
          vetName,
          testDate: new Date().toISOString().split('T')[0],
          quarantineDayCurrent: 1,
          status: testResult === 'positive' ? 'Isolation Ward Alpha (Active Outbreak)' : 'Under Observation'
        });

        alert(`✅ Clinical Record for ${animalIdentifier} successfully ingested into PostGIS! Cluster map and positivity rate updated.`);
        extractedPayload = null;
        renderView();
        if (onStateUpdate) onStateUpdate();
      });
    }
  }

  function simulateAiExtraction() {
    isAiProcessing = true;
    renderView();

    setTimeout(() => {
      isAiProcessing = false;
      const isPos = selectedSampleDoc === 'sample2';

      extractedPayload = {
        animalIdentifier: isPos ? `TAG-DOG-${new Date().getFullYear()}-092` : `TAG-DOG-${new Date().getFullYear()}-087`,
        species: "canine",
        testType: isPos ? "RT-PCR" : "RIDT",
        targetPathogen: "Rabies Virus Antigen",
        result: isPos ? "positive" : "negative",
        confidence: isPos ? "0.99" : "0.98",
        clinicalSigns: isPos ? "severe aggression, hydrophobia, salivation" : "lethargy, mild fever",
        quarantineDays: isPos ? 14 : 10,
        vetName: isPos ? "Dr. K. Singhania" : "Dr. R. Sharma"
      };

      renderView();

      // Populate form
      const tagInput = container.querySelector('#val-tag');
      const speciesInput = container.querySelector('#val-species');
      const testSelect = container.querySelector('#val-test-type');
      const resultSelect = container.querySelector('#val-result');
      const signsInput = container.querySelector('#val-signs');
      const vetInput = container.querySelector('#val-vet');
      const daysInput = container.querySelector('#val-days');
      const confSpan = container.querySelector('#val-conf');

      if (tagInput) tagInput.value = extractedPayload.animalIdentifier;
      if (speciesInput) speciesInput.value = extractedPayload.species;
      if (testSelect) testSelect.value = extractedPayload.testType;
      if (resultSelect) resultSelect.value = extractedPayload.result;
      if (signsInput) signsInput.value = extractedPayload.clinicalSigns;
      if (vetInput) vetInput.value = extractedPayload.vetName;
      if (daysInput) daysInput.value = extractedPayload.quarantineDays;
      if (confSpan) confSpan.textContent = `${Math.round(parseFloat(extractedPayload.confidence) * 100)}%`;
    }, 1200);
  }

  function initOutbreakMap(records) {
    const mapEl = document.getElementById('outbreak-leaflet-map');
    if (!mapEl) return;

    if (!outbreakMapInstance) {
      outbreakMapInstance = L.map(mapEl, {
        zoomControl: true,
        attributionControl: false
      }).setView([28.4450, 77.0950], 12);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(outbreakMapInstance);
    }

    outbreakMarkers.forEach(m => outbreakMapInstance.removeLayer(m));
    outbreakMarkers = [];

    records.forEach(r => {
      const isPos = r.testResult === 'positive';
      const isInc = r.testResult === 'inconclusive';

      // Circle marker for outbreak cluster
      const circle = L.circle([r.rescueLatitude, r.rescueLongitude], {
        color: isPos ? '#ef4444' : isInc ? '#f59e0b' : '#10b981',
        fillColor: isPos ? '#ef4444' : isInc ? '#f59e0b' : '#10b981',
        fillOpacity: isPos ? 0.45 : 0.25,
        radius: isPos ? 800 : 350
      }).addTo(outbreakMapInstance);

      circle.bindPopup(`
        <div class="map-popup-card">
          <span class="badge ${isPos ? 'badge-emergency' : isInc ? 'badge-warning' : 'badge-success'}">
            ${r.testResult.toUpperCase()} • ${r.testType}
          </span>
          <strong class="popup-title mt-1">${r.animalIdentifier} (${r.species})</strong>
          <p class="popup-locality">📍 ${r.rescueLocation}</p>
          <div class="popup-meta mt-1">
            <span>Vet: <strong>${r.vetName}</strong></span>
            <span>Date: ${r.testDate}</span>
          </div>
          ${isPos ? '<p class="text-danger mt-1"><strong>⚠️ Warning:</strong> Active Rabies Cluster Area</p>' : ''}
        </div>
      `);

      outbreakMarkers.push(circle);
    });

    setTimeout(() => {
      outbreakMapInstance.invalidateSize();
    }, 250);
  }

  function showSponsorshipToast(itemName, tag) {
    const toast = document.createElement('div');
    toast.className = 'toast-alert animate-slide-up';
    toast.innerHTML = `
      <div class="toast-icon text-success">${ICONS.check}</div>
      <div class="toast-body">
        <strong>Direct Animal Impact Verified!</strong>
        <p>You sponsored <strong>${itemName}</strong> (ID: <code>${tag}</code>). Deployed immediately to stray intake quarantine at Paws & Hope Sanctuary.</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">${ICONS.close}</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 7000);
  }

  renderView();
}
