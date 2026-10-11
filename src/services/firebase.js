import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  getAuth, 
  signInAnonymously 
} from 'firebase/auth';

// Read config from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('your_api_key')
);

let app = null;
let db = null;
let storage = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    console.log('✅ Firebase initialized successfully with project:', firebaseConfig.projectId);
  } catch (err) {
    console.warn('⚠️ Firebase initialization failed, falling back to local storage:', err);
  }
} else {
  console.info('ℹ️ GivingBridge running in offline/local mock storage mode. Add credentials in .env to sync to Firebase Cloud Firestore & Cloud Storage.');
}

export { app, db, storage, auth };

/**
 * Upload a file/blob to Firebase Cloud Storage with offline fallback
 */
export async function uploadToStorage(path, fileBlob) {
  if (!isFirebaseConfigured || !storage) {
    // Generate a local object URL fallback
    return URL.createObjectURL(fileBlob);
  }

  const fileRef = storageRef(storage, path);
  const snapshot = await uploadBytes(fileRef, fileBlob);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
}

/**
 * Sync contribution pledge to Firestore
 */
export async function syncContributionToFirestore(contribution) {
  if (!isFirebaseConfigured || !db) return;

  try {
    const docRef = doc(db, 'contributions', contribution.id);
    await setDoc(docRef, contribution, { merge: true });
  } catch (err) {
    console.error('Failed to sync contribution to Firestore:', err);
  }
}

/**
 * Sync resource demand update to Firestore
 */
export async function syncDemandToFirestore(demand) {
  if (!isFirebaseConfigured || !db) return;

  try {
    const docRef = doc(db, 'resource_demands', demand.id);
    await setDoc(docRef, demand, { merge: true });
  } catch (err) {
    console.error('Failed to sync demand to Firestore:', err);
  }
}

/**
 * Sync volunteer registration to Firestore
 */
export async function syncVolunteerToFirestore(volunteer) {
  if (!isFirebaseConfigured || !db) return;

  try {
    const docRef = doc(db, 'volunteer_roster', volunteer.id);
    await setDoc(docRef, volunteer, { merge: true });
  } catch (err) {
    console.error('Failed to sync volunteer to Firestore:', err);
  }
}
