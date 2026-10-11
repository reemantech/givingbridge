import L from 'leaflet';
import { ICONS } from '../utils/icons.js';
import { getStoredCenters, getStoredDemands } from '../utils/storage.js';
import { openCenterDetailModal } from './DetailModal.js';
import { initPlacesAutocomplete, isGoogleMapsConfigured } from '../services/googleMaps.js';

let leafletMapInstance = null;
let currentMarkers = [];

export function renderDiscoveryView(container, onStateUpdate) {
  const centers = getStoredCenters();
  const demands = getStoredDemands();

  let searchQuery = '';
  let selectedCrisis = 'all';
  let selectedRadius = 'all'; // '5', '15', '50', 'all'
  let criticalOnly = false;
  let activeLayout = 'split'; // 'split', 'map', 'cards'
  let userLocation = null;

  function filterCenters() {
    return centers.filter(center => {
      // Query match
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        center.name.toLowerCase().includes(q) ||
        center.city.toLowerCase().includes(q) ||
        center.locality.toLowerCase().includes(q) ||
        center.crisisTitle.toLowerCase().includes(q);

      // Crisis match
      const matchCrisis = selectedCrisis === 'all' || center.crisisType === selectedCrisis;

      // Radius match
      const matchRadius = selectedRadius === 'all' || center.distanceKm <= parseFloat(selectedRadius);

      // Critical demands match
      if (criticalOnly) {
        const centerDemands = demands.filter(d => d.centerId === center.id);
        const hasCritical = centerDemands.some(d => d.urgencyLevel === 'critical' && d.fulfilledQuantity < d.targetQuantity);
        if (!hasCritical) return false;
      }

      return matchQuery && matchCrisis && matchRadius;
    });
  }

  function renderView() {
    const filteredCenters = filterCenters();

    container.innerHTML = `
      <div class="discovery-page">
        <!-- Top Control & Search Bar -->
        <div class="discovery-header-panel">
          <div class="search-row">
            <div class="search-input-wrap">
              <span class="search-icon">${ICONS.search}</span>
              <input 
                type="text" 
                id="search-input" 
                class="search-input" 
                placeholder="${isGoogleMapsConfigured ? 'Search places, shelters, or cities via Google Places...' : 'Search by city, neighborhood, or crisis (e.g. Yamuna, Delhi, Wayanad)...'}" 
                value="${searchQuery}" 
              />
              ${isGoogleMapsConfigured ? `<span class="badge badge-success font-mono" style="margin-right: 8px;">Places API Active</span>` : ''}
              ${searchQuery ? `<button class="clear-search-btn" id="clear-search-btn">${ICONS.close}</button>` : ''}
            </div>

            <button class="btn btn-secondary" id="btn-use-location">
              ${ICONS.mapPin} <span>${userLocation ? 'Location Active (Gurugram)' : 'Use My GPS'}</span>
            </button>

            <div class="view-mode-toggle">
              <button class="view-btn ${activeLayout === 'split' ? 'active' : ''}" data-layout="split" title="Split Map & List View">
                <span>Split</span>
              </button>
              <button class="view-btn ${activeLayout === 'map' ? 'active' : ''}" data-layout="map" title="Map Centric View">
                <span>Map</span>
              </button>
              <button class="view-btn ${activeLayout === 'cards' ? 'active' : ''}" data-layout="cards" title="List View Only">
                <span>Cards</span>
              </button>
            </div>
          </div>

          <!-- Filters Ribbon -->
          <div class="filters-ribbon">
            <div class="filter-group">
              <span class="filter-label">Crisis Type:</span>
              <div class="filter-pills" id="crisis-pills">
                <button class="filter-pill ${selectedCrisis === 'all' ? 'active' : ''}" data-val="all">All Crises</button>
                <button class="filter-pill ${selectedCrisis === 'flood' ? 'active' : ''}" data-val="flood">🌊 Flood Relief</button>
                <button class="filter-pill ${selectedCrisis === 'war_displacement' ? 'active' : ''}" data-val="war_displacement">⛺ War & Refugee</button>
                <button class="filter-pill ${selectedCrisis === 'landslide' ? 'active' : ''}" data-val="landslide">⛰️ Landslide Hub</button>
                <button class="filter-pill ${selectedCrisis === 'urban_emergency' ? 'active' : ''}" data-val="urban_emergency">🚨 Urban Emergency</button>
              </div>
            </div>

            <div class="filter-group">
              <span class="filter-label">Max Radius:</span>
              <div class="filter-pills" id="radius-pills">
                <button class="filter-pill ${selectedRadius === 'all' ? 'active' : ''}" data-val="all">Any</button>
                <button class="filter-pill ${selectedRadius === '5' ? 'active' : ''}" data-val="5">&lt; 5 km</button>
                <button class="filter-pill ${selectedRadius === '15' ? 'active' : ''}" data-val="15">&lt; 15 km</button>
                <button class="filter-pill ${selectedRadius === '50' ? 'active' : ''}" data-val="50">&lt; 50 km</button>
              </div>
            </div>

            <label class="critical-toggle-label">
              <input type="checkbox" id="critical-only-toggle" ${criticalOnly ? 'checked' : ''} />
              <span class="critical-toggle-box"></span>
              <span>🚨 Critical Shortages Only</span>
            </label>
          </div>
        </div>

        <!-- Main Discovery Content Layout -->
        <div class="discovery-content-grid layout-${activeLayout}">
          <!-- Interactive Map Container -->
          <div class="map-wrapper" id="map-wrapper" style="${activeLayout === 'cards' ? 'display: none;' : ''}">
            <div id="leaflet-map-element" class="leaflet-map-element"></div>
            
            <div class="map-floating-legend">
              <div class="legend-item"><span class="legend-dot critical-pulse"></span> Critical Shortage</div>
              <div class="legend-item"><span class="legend-dot moderate-dot"></span> Moderate Needs</div>
              <div class="legend-item"><span class="legend-dot verified-dot"></span> Verified Hub</div>
            </div>
          </div>

          <!-- Cards List Container -->
          <div class="cards-list-wrapper" id="cards-wrapper" style="${activeLayout === 'map' ? 'display: none;' : ''}">
            <div class="cards-list-header">
              <div class="results-count">
                Showing <strong>${filteredCenters.length}</strong> relief centers near your vicinity
              </div>
              <div class="quick-sort-info">
                Sorted by Hyperlocal Proximity & Real-time Need
              </div>
            </div>

            ${filteredCenters.length === 0 ? `
              <div class="empty-state-box">
                <div class="empty-icon">${ICONS.search}</div>
                <h3>No Relief Centers Found</h3>
                <p>Try broadening your radius or search for other cities like Delhi, Gurugram, or Wayanad.</p>
                <button class="btn btn-secondary mt-3" id="reset-filters-btn">Reset All Filters</button>
              </div>
            ` : `
              <div class="centers-cards-grid">
                ${filteredCenters.map(center => renderCenterCard(center, demands)).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    bindHeaderEvents();
    bindCardEvents();
    initOrUpdateLeafletMap(filteredCenters);
  }

  function renderCenterCard(center, demands) {
    const centerDemands = demands.filter(d => d.centerId === center.id);
    const criticalDemands = centerDemands.filter(d => d.urgencyLevel === 'critical');

    return `
      <div class="relief-center-card" data-id="${center.id}">
        <div class="card-hero" style="background-image: linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.85)), url('${center.image}');">
          <div class="card-top-badges">
            <span class="badge badge-verified">${ICONS.verified} Verified</span>
            <span class="badge badge-distance">${ICONS.mapPin} ${center.distanceKm} km</span>
          </div>
          <div class="card-hero-bottom">
            <span class="crisis-type-tag">${center.crisisType.toUpperCase().replace('_', ' ')}</span>
            <h3 class="card-title">${center.name}</h3>
            <p class="card-locality">${center.locality}, ${center.city}</p>
          </div>
        </div>

        <div class="card-body">
          <p class="card-summary">${center.summary}</p>

          <!-- Real-time Capacity Metrics -->
          <div class="card-capacity-section">
            <div class="capacity-section-title">
              <span>Live Need Fulfillment:</span>
              <span class="live-pulse-badge">LIVE SYNC</span>
            </div>
            
            <div class="demands-mini-bars">
              ${centerDemands.slice(0, 4).map(d => {
                const percent = Math.min(100, Math.round((d.fulfilledQuantity / d.targetQuantity) * 100));
                return `
                  <div class="mini-bar-row" title="${d.label}: ${d.fulfilledQuantity}/${d.targetQuantity} ${d.unit}">
                    <span class="mini-cat-label">${d.category}:</span>
                    <div class="mini-track">
                      <div class="mini-fill ${d.urgencyLevel}" style="width: ${percent}%;"></div>
                    </div>
                    <span class="mini-percent">${percent}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Urgent Alert Ticker -->
          ${center.liveTicker ? `
            <div class="card-ticker">
              <span class="ticker-dot"></span>
              <span class="ticker-text">${center.liveTicker}</span>
            </div>
          ` : ''}

          <!-- Quick Action Buttons -->
          <div class="card-actions-row">
            <button class="btn btn-primary btn-block take-action-btn" data-id="${center.id}">
              ${ICONS.bolt} Take Action / Pledge Aid
            </button>
            <div class="quick-icons-row">
              <button class="quick-cat-btn" data-id="${center.id}" data-cat="money" title="Pledge Financial Aid">${ICONS.money}</button>
              <button class="quick-cat-btn" data-id="${center.id}" data-cat="ration" title="Pledge Food Ration">${ICONS.ration}</button>
              <button class="quick-cat-btn" data-id="${center.id}" data-cat="clothes" title="Pledge Warm Clothes">${ICONS.clothes}</button>
              <button class="quick-cat-btn" data-id="${center.id}" data-cat="volunteer" title="Register as Volunteer">${ICONS.volunteer}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindHeaderEvents() {
    const searchInput = container.querySelector('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const filtered = filterCenters();
        updateCardsAndMap(filtered);
      });

      // Bind Google Places Autocomplete if API key is configured
      if (isGoogleMapsConfigured) {
        initPlacesAutocomplete(searchInput, (selectedPlace) => {
          searchQuery = selectedPlace.name;
          userLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };
          searchInput.value = selectedPlace.name;
          if (leafletMapInstance) {
            leafletMapInstance.flyTo([selectedPlace.lat, selectedPlace.lng], 13);
          }
          const filtered = filterCenters();
          updateCardsAndMap(filtered);
        });
      }
    }

    const clearBtn = container.querySelector('#clear-search-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchQuery = '';
        renderView();
      });
    }

    // GPS Button
    const locationBtn = container.querySelector('#btn-use-location');
    if (locationBtn) {
      locationBtn.addEventListener('click', () => {
        locationBtn.innerHTML = `${ICONS.clock} Locating...`;
        setTimeout(() => {
          userLocation = { lat: 28.4595, lng: 77.0266 }; // Gurugram center coordinates
          selectedRadius = '15';
          renderView();
        }, 500);
      });
    }

    // View layout buttons
    container.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeLayout = btn.dataset.layout;
        renderView();
      });
    });

    // Crisis filter pills
    container.querySelectorAll('#crisis-pills .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        selectedCrisis = pill.dataset.val;
        renderView();
      });
    });

    // Radius filter pills
    container.querySelectorAll('#radius-pills .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        selectedRadius = pill.dataset.val;
        renderView();
      });
    });

    // Critical only checkbox
    const critToggle = container.querySelector('#critical-only-toggle');
    if (critToggle) {
      critToggle.addEventListener('change', (e) => {
        criticalOnly = e.target.checked;
        renderView();
      });
    }

    // Reset filters button
    const resetBtn = container.querySelector('#reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        selectedCrisis = 'all';
        selectedRadius = 'all';
        criticalOnly = false;
        renderView();
      });
    }
  }

  function bindCardEvents() {
    container.querySelectorAll('.take-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const centerId = btn.dataset.id;
        const targetCenter = centers.find(c => c.id === centerId);
        if (targetCenter) {
          openCenterDetailModal(targetCenter, () => {
            if (onStateUpdate) onStateUpdate();
            renderView();
          });
        }
      });
    });

    container.querySelectorAll('.quick-cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const centerId = btn.dataset.id;
        const category = btn.dataset.cat;
        const targetCenter = centers.find(c => c.id === centerId);
        if (targetCenter) {
          openCenterDetailModal(targetCenter, () => {
            if (onStateUpdate) onStateUpdate();
            renderView();
          }, category);
        }
      });
    });
  }

  function updateCardsAndMap(filteredCenters) {
    const cardsWrapper = container.querySelector('#cards-wrapper');
    if (cardsWrapper) {
      cardsWrapper.innerHTML = `
        <div class="cards-list-header">
          <div class="results-count">
            Showing <strong>${filteredCenters.length}</strong> relief centers near your vicinity
          </div>
          <div class="quick-sort-info">
            Sorted by Hyperlocal Proximity & Real-time Need
          </div>
        </div>

        ${filteredCenters.length === 0 ? `
          <div class="empty-state-box">
            <div class="empty-icon">${ICONS.search}</div>
            <h3>No Relief Centers Found</h3>
            <p>Try broadening your radius or search for other cities.</p>
          </div>
        ` : `
          <div class="centers-cards-grid">
            ${filteredCenters.map(center => renderCenterCard(center, demands)).join('')}
          </div>
        `}
      `;
      bindCardEvents();
    }

    initOrUpdateLeafletMap(filteredCenters);
  }

  function initOrUpdateLeafletMap(filteredCenters) {
    const mapElement = document.getElementById('leaflet-map-element');
    if (!mapElement || activeLayout === 'cards') return;

    if (!leafletMapInstance) {
      // Default center around Northern India / Delhi NCR
      leafletMapInstance = L.map(mapElement, {
        zoomControl: true,
        attributionControl: false
      }).setView([28.5355, 77.2000], 11);

      // CartoDB tiles with optional authenticated API key
      const cartoKey = import.meta.env.VITE_CARTO_API_KEY;
      const tileUrl = cartoKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`
        : `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      }).addTo(leafletMapInstance);
    }

    // Clear existing markers
    currentMarkers.forEach(m => leafletMapInstance.removeLayer(m));
    currentMarkers = [];

    if (filteredCenters.length === 0) return;

    const bounds = L.latLngBounds();

    filteredCenters.forEach(center => {
      const isCritical = center.crisisType === 'flood' || center.crisisType === 'war_displacement';
      
      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin-container',
        html: `
          <div class="pulse-marker ${isCritical ? 'critical-marker' : 'standard-marker'}">
            <div class="pin-ring"></div>
            <div class="pin-core">
              ${center.crisisType === 'flood' ? '🌊' : center.crisisType === 'landslide' ? '⛰️' : center.crisisType === 'war_displacement' ? '⛺' : '🚨'}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([center.latitude, center.longitude], { icon: customIcon })
        .addTo(leafletMapInstance);

      // Rich interactive popup
      const popupHtml = `
        <div class="map-popup-card">
          <div class="popup-header">
            <span class="popup-badge">${center.crisisType.toUpperCase()}</span>
            <strong class="popup-title">${center.name}</strong>
            <p class="popup-locality">${center.locality}</p>
          </div>
          <div class="popup-body">
            <p class="popup-summary">${center.summary.substring(0, 95)}...</p>
            <div class="popup-meta">
              <span><strong>${center.distanceKm} km</strong> away</span>
              <span class="text-success">✓ Verified NGO</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm btn-block popup-action-btn" id="popup-act-${center.id}">
            Take Action Now
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const popupBtn = document.getElementById(`popup-act-${center.id}`);
        if (popupBtn) {
          popupBtn.addEventListener('click', () => {
            openCenterDetailModal(center, () => {
              if (onStateUpdate) onStateUpdate();
              renderView();
            });
          });
        }
      });

      currentMarkers.push(marker);
      bounds.extend([center.latitude, center.longitude]);
    });

    if (filteredCenters.length > 0) {
      leafletMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    setTimeout(() => {
      leafletMapInstance.invalidateSize();
    }, 200);
  }

  renderView();
}
