import { ICONS } from '../utils/icons.js';
import { DB_SCHEMA_SQL } from '../data/mockData.js';
import { getStoredCenters, getStoredDemands } from '../utils/storage.js';

export function renderArchitectureView(container) {
  const centers = getStoredCenters();
  const demands = getStoredDemands();

  let activeTab = 'schema'; // 'schema', 'architecture', 'query'

  function renderView() {
    container.innerHTML = `
      <div class="architecture-page">
        <!-- Hero Header -->
        <div class="arch-hero">
          <span class="concept-chip">SECTION 5 & 6 • TECHNICAL BLUEPRINT</span>
          <h1 class="page-title">Technical Architecture & Database Schema</h1>
          <p class="page-desc">
            Complete PostGIS & PostgreSQL data model and hybrid system architecture combining Google Places API with humanitarian inventory state management.
          </p>

          <div class="arch-tabs-bar">
            <button class="tab-btn ${activeTab === 'schema' ? 'active' : ''}" data-tab="schema">
              ${ICONS.database} PostgreSQL / PostGIS Schema
            </button>
            <button class="tab-btn ${activeTab === 'architecture' ? 'active' : ''}" data-tab="architecture">
              ${ICONS.tools} System Architecture Flow
            </button>
            <button class="tab-btn ${activeTab === 'query' ? 'active' : ''}" data-tab="query">
              ${ICONS.search} Live PostGIS Query Simulator
            </button>
          </div>
        </div>

        <!-- Tab 1: SQL Schema -->
        <div class="arch-content-wrap" style="${activeTab !== 'schema' ? 'display: none;' : ''}">
          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-title">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="file-name">schema.sql — PostGIS Humanitarian Schema</span>
              </div>
              <button class="btn btn-sm btn-secondary" id="btn-copy-sql">
                ${ICONS.copy} Copy SQL
              </button>
            </div>
            <pre class="code-block"><code>${escapeHtml(DB_SCHEMA_SQL)}</code></pre>
          </div>
        </div>

        <!-- Tab 2: Architecture Flow -->
        <div class="arch-content-wrap" style="${activeTab !== 'architecture' ? 'display: none;' : ''}">
          <div class="arch-diagram-card">
            <h3 class="diagram-title">System Architecture Flow</h3>
            <div class="ascii-diagram-wrap">
              <pre class="ascii-diagram">
                 ┌──────────────────────────────────────────────────┐
                 │       Frontend (Modern SPA / React Native)       │
                 │  - Hyperlocal Discovery (Leaflet/Mapbox Tiles)   │
                 │  - 6 Fulfillment Flows (Money, Ration, Clothes..)│
                 │  - CommonStock & MutualAid TimeBank Ledgers      │
                 └─────────────────────────┬────────────────────────┘
                                           │ HTTPS / WebSockets
                 ┌─────────────────────────▼────────────────────────┐
                 │          Backend API (Node / Python FastAPI)     │
                 │  - GeoJSON spatial resolver                      │
                 │  - QR Pass hashing & intake verification         │
                 │  - 80G Tax Exemption Receipt engine              │
                 └──────────────┬──────────────────┬────────────────┘
                                │                  │
         ┌──────────────────────▼──────┐    ┌──────▼──────────────────────────┐
         │     Google Maps Platform    │    │      Database (Supabase PostGIS)│
         │  - Places API (Nearby)      │    │  - relief_centers (Geom Point)  │
         │  - Geocoding API            │    │  - resource_demands (Thresholds)│
         │  - Distance Matrix API      │    │  - contributions (Pledges & QR) │
         │  - Boundary Geofencing      │    │  - volunteer_roster (Emergency) │
         └─────────────────────────────┘    └─────────────────────────────────┘
              </pre>
            </div>

            <div class="arch-comparison-grid">
              <div class="comp-card">
                <h4>Google Maps Platform Role</h4>
                <ul>
                  <li><strong>Places API:</strong> Resolves physical latitude/longitude, place_id, civic centers, municipal schools, relief shelters.</li>
                  <li><strong>Distance Matrix API:</strong> Calculates walking/driving minutes for volunteers and delivery drivers.</li>
                  <li><strong>Geocoding API:</strong> Converts search text ("Sector 56 Gurugram") into precise GPS coordinates.</li>
                </ul>
              </div>

              <div class="comp-card">
                <h4>Custom PostGIS Database Role</h4>
                <ul>
                  <li><strong>Humanitarian State:</strong> Maps place_id to dynamic crisis type ('flood', 'war_displacement') and verification credentials.</li>
                  <li><strong>Live Inventory Demands:</strong> Tracks real-time resource shortages with urgency thresholds ('critical', 'moderate', 'stable').</li>
                  <li><strong>Audit Trail:</strong> Records QR check-in passes, 80G tax receipts, and time-banking ledger transactions.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: PostGIS Query Simulator -->
        <div class="arch-content-wrap" style="${activeTab !== 'query' ? 'display: none;' : ''}">
          <div class="card query-sim-card">
            <h3>Hyperlocal Spatial Query Tester</h3>
            <p class="subtext">Simulate how PostGIS calculates spatial distance and matches critical shortage centers.</p>

            <div class="query-box">
              <label class="form-label">SQL Spatial Query:</label>
              <pre class="query-code"><code>SELECT 
  id, 
  name, 
  crisis_type,
  ST_Distance(geom, ST_MakePoint(77.0266, 28.4595)::geography) / 1000 AS distance_km
FROM relief_centers
WHERE is_verified = true
ORDER BY distance_km ASC
LIMIT 5;</code></pre>
            </div>

            <button class="btn btn-primary" id="btn-run-query">
              ${ICONS.bolt} Execute Spatial Query
            </button>

            <div id="query-result-box" class="query-result-box mt-3" style="display: none;">
              <h4 class="json-title">Returned Query Rows (JSON Result):</h4>
              <pre class="json-code" id="query-json-output"></pre>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        renderView();
      });
    });

    const copyBtn = container.querySelector('#btn-copy-sql');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(DB_SCHEMA_SQL);
        copyBtn.innerHTML = `${ICONS.check} Copied SQL!`;
        setTimeout(() => {
          copyBtn.innerHTML = `${ICONS.copy} Copy SQL`;
        }, 2000);
      });
    }

    const runBtn = container.querySelector('#btn-run-query');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        const resultBox = container.querySelector('#query-result-box');
        const jsonOutput = container.querySelector('#query-json-output');

        const simulatedRows = centers.map(c => ({
          id: c.id,
          name: c.name,
          locality: c.locality,
          crisis_type: c.crisisType,
          latitude: c.latitude,
          longitude: c.longitude,
          distance_km: c.distanceKm,
          is_verified: c.isVerified,
          reg_number: c.regNumber
        }));

        resultBox.style.display = 'block';
        jsonOutput.textContent = JSON.stringify(simulatedRows, null, 2);
      });
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  renderView();
}
