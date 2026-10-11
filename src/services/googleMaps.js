import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export const isGoogleMapsConfigured = Boolean(
  GOOGLE_MAPS_API_KEY && 
  !GOOGLE_MAPS_API_KEY.includes('AIzaSyYourActual') &&
  GOOGLE_MAPS_API_KEY.length > 20
);

let loaderInstance = null;
let googleMapsPromise = null;

export function getGoogleMapsLoader() {
  if (!isGoogleMapsConfigured) return null;

  if (!loaderInstance) {
    loaderInstance = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places', 'geometry']
    });
  }

  return loaderInstance;
}

/**
 * Asynchronously load Google Maps SDK
 */
export async function loadGoogleMaps() {
  if (!isGoogleMapsConfigured) {
    return null;
  }

  if (window.google && window.google.maps) {
    return window.google.maps;
  }

  if (!googleMapsPromise) {
    const loader = getGoogleMapsLoader();
    if (!loader) return null;

    googleMapsPromise = loader.load().then(() => {
      console.log('✅ Google Maps & Places API loaded successfully');
      return window.google.maps;
    }).catch(err => {
      console.warn('⚠️ Google Maps failed to load, falling back to offline search:', err);
      return null;
    });
  }

  return googleMapsPromise;
}

/**
 * Initialize Google Places Autocomplete on an <input> element
 */
export async function initPlacesAutocomplete(inputElement, onPlaceSelected) {
  if (!inputElement || !isGoogleMapsConfigured) return null;

  try {
    const maps = await loadGoogleMaps();
    if (!maps || !maps.places) return null;

    const autocomplete = new maps.places.Autocomplete(inputElement, {
      types: ['geocode', 'establishment'],
      fields: ['place_id', 'geometry', 'name', 'formatted_address']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.geometry || !place.geometry.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const name = place.name || place.formatted_address;

      if (onPlaceSelected) {
        onPlaceSelected({
          placeId: place.place_id,
          name,
          address: place.formatted_address,
          lat,
          lng
        });
      }
    });

    return autocomplete;
  } catch (err) {
    console.warn('Failed to bind Places Autocomplete:', err);
    return null;
  }
}

/**
 * Calculate live driving / walking distance using Google Distance Matrix API
 */
export async function calculateLiveDistance(originLatLng, destLatLng) {
  if (!isGoogleMapsConfigured) return null;

  try {
    const maps = await loadGoogleMaps();
    if (!maps) return null;

    const service = new maps.DistanceMatrixService();
    return new Promise((resolve) => {
      service.getDistanceMatrix({
        origins: [{ lat: originLatLng.lat, lng: originLatLng.lng }],
        destinations: [{ lat: destLatLng.lat, lng: destLatLng.lng }],
        travelMode: maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === 'OK' && response.rows[0]?.elements[0]?.status === 'OK') {
          const element = response.rows[0].elements[0];
          resolve({
            distanceText: element.distance.text,
            distanceValueMeters: element.distance.value,
            durationText: element.duration.text
          });
        } else {
          resolve(null);
        }
      });
    });
  } catch (err) {
    console.warn('Distance Matrix calculation error:', err);
    return null;
  }
}
