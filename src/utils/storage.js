import {
  INITIAL_RELIEF_CENTERS,
  INITIAL_RESOURCE_DEMANDS,
  INITIAL_COMMON_STOCK,
  INITIAL_PULSE_FLASH_NEEDS,
  INITIAL_MUTUAL_AID_LISTINGS,
  INITIAL_ANIMAL_SHELTERS,
  INITIAL_MEDICAL_SPONSORSHIP_CATALOG,
  INITIAL_ANIMAL_MEDICAL_RECORDS
} from '../data/mockData.js';
import {
  syncContributionToFirestore,
  syncDemandToFirestore,
  syncVolunteerToFirestore
} from '../services/firebase.js';

const STORAGE_KEYS = {
  CENTERS: 'budhelp_centers_v1',
  DEMANDS: 'budhelp_demands_v1',
  CONTRIBUTIONS: 'budhelp_contributions_v1',
  VOLUNTEERS: 'budhelp_volunteers_v1',
  COMMON_STOCK: 'budhelp_commonstock_v1',
  FLASH_NEEDS: 'budhelp_flashneeds_v1',
  MUTUAL_AID: 'budhelp_mutualaid_v1',
  TIMEBANK_BALANCE: 'budhelp_timebank_balance_v1',
  USER_PROFILE: 'budhelp_user_profile_v1',
  ANIMAL_SHELTERS: 'budhelp_animal_shelters_v1',
  MEDICAL_SPONSORSHIPS: 'budhelp_medical_sponsorships_v1',
  ANIMAL_MEDICAL_RECORDS: 'budhelp_animal_medical_records_v1',
  ACTIVE_ROLE: 'budhelp_active_role_v1'
};

export const getStoredCenters = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CENTERS);
  return data ? JSON.parse(data) : INITIAL_RELIEF_CENTERS;
};

export const getStoredDemands = () => {
  const data = localStorage.getItem(STORAGE_KEYS.DEMANDS);
  return data ? JSON.parse(data) : INITIAL_RESOURCE_DEMANDS;
};

export const getStoredContributions = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CONTRIBUTIONS);
  return data ? JSON.parse(data) : [];
};

export const getStoredVolunteers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
  return data ? JSON.parse(data) : [];
};

export const getStoredCommonStock = () => {
  const data = localStorage.getItem(STORAGE_KEYS.COMMON_STOCK);
  return data ? JSON.parse(data) : INITIAL_COMMON_STOCK;
};

export const getStoredFlashNeeds = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FLASH_NEEDS);
  return data ? JSON.parse(data) : INITIAL_PULSE_FLASH_NEEDS;
};

export const getStoredMutualAid = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MUTUAL_AID);
  return data ? JSON.parse(data) : INITIAL_MUTUAL_AID_LISTINGS;
};

export const getTimebankBalance = () => {
  const data = localStorage.getItem(STORAGE_KEYS.TIMEBANK_BALANCE);
  return data ? parseFloat(data) : 4.5;
};

export const getUserProfile = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data
    ? JSON.parse(data)
    : {
        id: "usr-citizen-491",
        name: "Shivam (Civic Responder)",
        phone: "+91 98110 44921",
        email: "shivam.civic@givingbridge.org",
        locality: "Sector 56, Gurugram",
        trustScore: 98,
        badges: ["Verified Citizen", "First Aid Lvl 1", "Active Donor"]
      };
};

export const recordContribution = ({
  centerId,
  demandId,
  category,
  amountOrQty,
  method,
  metadata = {}
}) => {
  const demands = getStoredDemands();
  const demandIndex = demands.findIndex(d => d.id === demandId);
  
  if (demandIndex !== -1) {
    demands[demandIndex].fulfilledQuantity = Math.min(
      demands[demandIndex].targetQuantity,
      (demands[demandIndex].fulfilledQuantity || 0) + Number(amountOrQty)
    );
    localStorage.setItem(STORAGE_KEYS.DEMANDS, JSON.stringify(demands));
  }

  const passCode = `PASS-${category.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const taxReceiptNo = `80G-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const newContribution = {
    id: `ctb-${Date.now()}`,
    userId: getUserProfile().id,
    centerId,
    demandId,
    category,
    pledgedAmountOrQty: Number(amountOrQty),
    status: method === 'online_payment' ? 'verified_received' : 'pledged',
    fulfillmentMethod: method,
    passCode,
    taxReceiptNo,
    metadata,
    createdAt: new Date().toISOString()
  };

  const contributions = getStoredContributions();
  contributions.unshift(newContribution);
  localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(contributions));

  // Sync to Firebase Cloud Firestore if configured
  syncContributionToFirestore(newContribution);
  if (demandIndex !== -1) {
    syncDemandToFirestore(demands[demandIndex]);
  }

  return newContribution;
};

export const registerVolunteer = ({ centerId, skills, availabilityDates, shiftName }) => {
  const user = getUserProfile();
  const newVolunteer = {
    id: `vol-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    userPhone: user.phone,
    centerId,
    skills,
    availabilityDates,
    shiftName,
    isVerified: true,
    status: "Rostered & Emergency Alert Active",
    createdAt: new Date().toISOString()
  };

  const volunteers = getStoredVolunteers();
  volunteers.unshift(newVolunteer);
  localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));

  // Also increment volunteer demand fulfillment if exists
  const demands = getStoredDemands();
  const volDemand = demands.find(d => d.centerId === centerId && d.category === 'volunteer');
  if (volDemand) {
    volDemand.fulfilledQuantity = Math.min(volDemand.targetQuantity, (volDemand.fulfilledQuantity || 0) + 1);
    localStorage.setItem(STORAGE_KEYS.DEMANDS, JSON.stringify(demands));
    syncDemandToFirestore(volDemand);
  }

  // Sync to Firebase Cloud Firestore if configured
  syncVolunteerToFirestore(newVolunteer);

  return newVolunteer;
};

export const pledgeFlashNeed = (pulseId, pledgeCount = 1) => {
  const needs = getStoredFlashNeeds();
  const index = needs.findIndex(n => n.id === pulseId);
  if (index !== -1) {
    needs[index].pledgedQty = Math.min(needs[index].targetQty, (needs[index].pledgedQty || 0) + pledgeCount);
    localStorage.setItem(STORAGE_KEYS.FLASH_NEEDS, JSON.stringify(needs));
    return needs[index];
  }
  return null;
};

export const addCommonStockItem = (item) => {
  const items = getStoredCommonStock();
  const newItem = {
    ...item,
    id: `cs-${Date.now()}`,
    trustScore: 100,
    status: 'available'
  };
  items.unshift(newItem);
  localStorage.setItem(STORAGE_KEYS.COMMON_STOCK, JSON.stringify(items));
  return newItem;
};

export const borrowCommonStockItem = (itemId, days = 2) => {
  const items = getStoredCommonStock();
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items[index].status = 'in_use';
    items[index].dueBack = `In ${days} days`;
    items[index].borrowPin = `${Math.floor(1000 + Math.random() * 9000)}`;
    localStorage.setItem(STORAGE_KEYS.COMMON_STOCK, JSON.stringify(items));
    return items[index];
  }
  return null;
};

export const addMutualAidListing = (listing) => {
  const listings = getStoredMutualAid();
  const newListing = {
    ...listing,
    id: `ma-${Date.now()}`,
    status: 'open'
  };
  listings.unshift(newListing);
  localStorage.setItem(STORAGE_KEYS.MUTUAL_AID, JSON.stringify(listings));
  return newListing;
};

export const transactMutualAid = (listingId, hours) => {
  const listings = getStoredMutualAid();
  const item = listings.find(l => l.id === listingId);
  let balance = getTimebankBalance();

  if (item) {
    if (item.type === 'request') {
      // User is helping someone: earn credits!
      balance += hours;
    } else {
      // User is receiving help: spend credits
      balance = Math.max(0, balance - hours);
    }
    localStorage.setItem(STORAGE_KEYS.TIMEBANK_BALANCE, balance.toFixed(1));
    return balance;
  }
  return balance;
};

export const verifyQrPass = (passCode) => {
  const contributions = getStoredContributions();
  const target = contributions.find(c => c.passCode?.toUpperCase() === passCode.trim().toUpperCase());
  if (target) {
    target.status = 'verified_received';
    target.verifiedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(contributions));
    return target;
  }
  return null;
};

export const getStoredAnimalShelters = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ANIMAL_SHELTERS);
  return data ? JSON.parse(data) : INITIAL_ANIMAL_SHELTERS;
};

export const getStoredSponsorshipCatalog = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MEDICAL_SPONSORSHIPS);
  return data ? JSON.parse(data) : INITIAL_MEDICAL_SPONSORSHIP_CATALOG;
};

export const getStoredAnimalMedicalRecords = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ANIMAL_MEDICAL_RECORDS);
  return data ? JSON.parse(data) : INITIAL_ANIMAL_MEDICAL_RECORDS;
};

export const getActiveRole = () => {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE) || 'citizen'; // 'citizen' or 'ngo_staff'
};

export const setActiveRole = (role) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, role);
  return role;
};

export const sponsorMedicalItem = ({ centerId, shelterId, itemId, qty = 1, paymentMethod = 'online_payment' }) => {
  const catalog = getStoredSponsorshipCatalog();
  const itemIndex = catalog.findIndex(i => i.id === itemId);
  let item = null;

  if (itemIndex !== -1) {
    catalog[itemIndex].unitsFunded = (catalog[itemIndex].unitsFunded || 0) + Number(qty);
    localStorage.setItem(STORAGE_KEYS.MEDICAL_SPONSORSHIPS, JSON.stringify(catalog));
    item = catalog[itemIndex];
  }

  const taxReceiptNo = `80G-VET-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const passCode = `TAG-SPONSOR-${Math.floor(1000 + Math.random() * 9000)}`;

  const contribution = {
    id: `ctb-vet-${Date.now()}`,
    userId: getUserProfile().id,
    centerId,
    sponsorshipItemId: itemId,
    category: 'rabies_test_sponsorship',
    pledgedAmountOrQty: Number(qty),
    paymentStatus: 'completed',
    status: 'deployed_on_ground',
    fulfillmentMethod: paymentMethod,
    passCode,
    taxReceiptNo,
    metadata: {
      itemName: item ? item.itemName : 'Medical Kit',
      costPerUnit: item ? item.costPerUnit : 15,
      totalAmount: item ? item.costPerUnit * qty : 15 * qty
    },
    createdAt: new Date().toISOString()
  };

  const contributions = getStoredContributions();
  contributions.unshift(contribution);
  localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(contributions));
  syncContributionToFirestore(contribution);

  return { contribution, item };
};

export const ingestAnimalMedicalRecord = (record) => {
  const records = getStoredAnimalMedicalRecords();
  const newRecord = {
    ...record,
    id: `rec-${Date.now()}`,
    verifiedByStaff: true,
    verifiedByUserId: getUserProfile().id,
    createdAt: new Date().toISOString()
  };
  records.unshift(newRecord);
  localStorage.setItem(STORAGE_KEYS.ANIMAL_MEDICAL_RECORDS, JSON.stringify(records));
  return newRecord;
};

export const resetToDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.CENTERS);
  localStorage.removeItem(STORAGE_KEYS.DEMANDS);
  localStorage.removeItem(STORAGE_KEYS.CONTRIBUTIONS);
  localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
  localStorage.removeItem(STORAGE_KEYS.COMMON_STOCK);
  localStorage.removeItem(STORAGE_KEYS.FLASH_NEEDS);
  localStorage.removeItem(STORAGE_KEYS.MUTUAL_AID);
  localStorage.removeItem(STORAGE_KEYS.TIMEBANK_BALANCE);
  localStorage.removeItem(STORAGE_KEYS.ANIMAL_SHELTERS);
  localStorage.removeItem(STORAGE_KEYS.MEDICAL_SPONSORSHIPS);
  localStorage.removeItem(STORAGE_KEYS.ANIMAL_MEDICAL_RECORDS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROLE);
};

