import './style.css';
import { renderNavigation } from './components/Navigation.js';
import { renderDiscoveryView } from './components/DiscoveryView.js';
import { renderCommonStockView } from './components/CommonStockView.js';
import { renderPulseRelayView } from './components/PulseRelayView.js';
import { renderMutualAidLedgerView } from './components/MutualAidLedgerView.js';
import { renderCoordinatorDashboard } from './components/CoordinatorDashboard.js';
import { renderArchitectureView } from './components/ArchitectureView.js';

let currentView = 'discovery';

function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = `
    <div id="nav-root"></div>
    <main id="view-root" class="main-content-area"></main>
  `;

  renderApp();
}

function renderApp() {
  const navRoot = document.getElementById('nav-root');
  const viewRoot = document.getElementById('view-root');

  if (navRoot) {
    renderNavigation(navRoot, currentView, (newView) => {
      currentView = newView;
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (viewRoot) {
    viewRoot.innerHTML = '';
    const onStateUpdate = () => {
      // Re-render navigation to update TimeBank balance and counts
      if (navRoot) {
        renderNavigation(navRoot, currentView, (newView) => {
          currentView = newView;
          renderApp();
        });
      }
    };

    switch (currentView) {
      case 'discovery':
        renderDiscoveryView(viewRoot, onStateUpdate);
        break;
      case 'commonstock':
        renderCommonStockView(viewRoot, onStateUpdate);
        break;
      case 'pulserelay':
        renderPulseRelayView(viewRoot, onStateUpdate);
        break;
      case 'mutualaid':
        renderMutualAidLedgerView(viewRoot, onStateUpdate);
        break;
      case 'coordinator':
        renderCoordinatorDashboard(viewRoot, onStateUpdate);
        break;
      case 'architecture':
        renderArchitectureView(viewRoot);
        break;
      default:
        renderDiscoveryView(viewRoot, onStateUpdate);
    }
  }
}

document.addEventListener('DOMContentLoaded', initApp);
