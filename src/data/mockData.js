// Hyperlocal Crisis Centers, Inventory Demands, CommonStock Assets & Mutual Aid Seed Data

export const INITIAL_RELIEF_CENTERS = [
  {
    id: "rc-delhi-01",
    googlePlaceId: "ChIJ_yqX9v8DdTkR9cKx5Q8YV3c",
    name: "Yamuna Flood Relief & Transit Base",
    category: "disaster_relief",
    locality: "Mayur Vihar Ph-1, Yamuna Floodplains",
    city: "New Delhi",
    state: "Delhi",
    latitude: 28.6015,
    longitude: 77.2965,
    crisisType: "flood",
    crisisTitle: "Severe River Spate & Displacement",
    isVerified: true,
    verificationBadge: "Govt. SDMA & Red Cross Verified",
    regNumber: "DL-NGO-2021-99841",
    contactPhone: "+91 11 2275 8890",
    coordinator: "Dr. Ananya Sen (Ground Chief)",
    distanceKm: 2.4,
    establishedHoursAgo: 36,
    summary: "Sheltering 1,400 displaced flood victims from low-lying Yamuna riverbanks. Critical infant nutrition and dry ration shortages.",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Needs 160 infant baby food jars and 45 waterproof tarps immediately."
  },
  {
    id: "rc-pet-01",
    googlePlaceId: "ChIJ_paw_g0RDTkR4xQ_92Z941A",
    name: "Paws & Hope Animal Rescue Sanctuary",
    category: "pet_shelter",
    locality: "Sector 54, Golf Course Road Corridor",
    city: "Gurugram",
    state: "Haryana",
    latitude: 28.4385,
    longitude: 77.1122,
    crisisType: "stray_rabies_surge",
    crisisTitle: "Stray Rabies Surge & Canine Quarantine Triage",
    isVerified: true,
    verificationBadge: "AWBI & State Veterinary Board Certified",
    regNumber: "HR-VET-2022-8104",
    contactPhone: "+91 124 459 2200",
    coordinator: "Dr. R. Sharma (Head Veterinarian)",
    distanceKm: 3.2,
    establishedHoursAgo: 24,
    summary: "Dedicated canine & feline trauma shelter managing rabies containment, RIDT rapid antigen testing, and 10-day bite isolation quarantine.",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    liveTicker: "🚨 High Alert: 14 suspect canine intake cases; running low on RIDT Rabies Antigen Kits."
  },
  {
    id: "rc-pet-02",
    googlePlaceId: "ChIJ_f98_h0QDTkR4xM_99Z001B",
    name: "Friendicoes Wildlife & Stray Trauma Base",
    category: "pet_shelter",
    locality: "Nizamuddin & Yamuna Riverbank Annex",
    city: "New Delhi",
    state: "Delhi",
    latitude: 28.5890,
    longitude: 77.2450,
    crisisType: "flood",
    crisisTitle: "Displaced Animal Flood Evacuation & Boarding",
    isVerified: true,
    verificationBadge: "National Animal Welfare Board",
    regNumber: "DL-AWB-2019-0044",
    contactPhone: "+91 11 2431 4982",
    coordinator: "Geeta Seshamani (Sanctuary Lead)",
    distanceKm: 6.8,
    establishedHoursAgo: 48,
    summary: "Rescuing cattle, community dogs, and abandoned pets displaced by Yamuna floodwaters. Provides clinical treatment and anti-rabies vaccination.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Needs community sponsorship for 35 DHPPi + ARV vaccine courses."
  },
  {
    id: "rc-gurugram-02",
    googlePlaceId: "ChIJ_X7FwLwZDTkRNq43-x7s_6w",
    name: "Aravalli Migrant Community Shelter",
    locality: "Sector 56, Golf Course Extension",
    city: "Gurugram",
    state: "Haryana",
    latitude: 28.4239,
    longitude: 77.1025,
    crisisType: "urban_emergency",
    crisisTitle: "Migrant Worker Heat & Flash Cloudburst Aid",
    isVerified: true,
    verificationBadge: "Civic Aid Foundation Verified",
    regNumber: "HR-CIV-2023-44109",
    contactPhone: "+91 124 498 7721",
    coordinator: "Vikram Malhotra (Operations Lead)",
    distanceKm: 5.8,
    establishedHoursAgo: 72,
    summary: "Providing emergency community kitchen meals, clean drinking water, and makeshift school learning kits for displaced construction families.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Urgent call for 10 commercial cooking pots and 50 secondary school bundles."
  },
  {
    id: "rc-wayanad-03",
    googlePlaceId: "ChIJ0W7jBvWtpzsR9Yn_eS9n45k",
    name: "Wayanad Landslide Rapid Command",
    locality: "Meppadi Hill Corridor",
    city: "Wayanad",
    state: "Kerala",
    latitude: 11.5528,
    longitude: 76.1265,
    crisisType: "landslide",
    crisisTitle: "Hillside Slump & Rural Isolation Relief",
    isVerified: true,
    verificationBadge: "NDRF Joint Coordination Unit",
    regNumber: "KL-DIS-2024-11002",
    contactPhone: "+91 4936 280 412",
    coordinator: "Kavita Nambiar (Emergency Triage)",
    distanceKm: 18.2,
    establishedHoursAgo: 18,
    summary: "Command base coordinating search-and-rescue support, emergency bedding, medical trauma first aid, and mobile phone recharging stations.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Critical requirement: 8 Medical EMT Volunteers and 250 heavy woolen blankets."
  },
  {
    id: "rc-border-04",
    googlePlaceId: "ChIJa9bcvk4hJBUR8hO_P9_421c",
    name: "Shattered Haven Displacement Depot",
    locality: "Border Sector Transit Terminal",
    city: "North Transit Zone",
    state: "Border Corridor",
    latitude: 28.7041,
    longitude: 77.1025,
    crisisType: "war_displacement",
    crisisTitle: "Cross-Border Conflict Refugee Reception",
    isVerified: true,
    verificationBadge: "UNHCR Associate & Red Crescent",
    regNumber: "INT-REF-889104",
    contactPhone: "+91 11 4059 9001",
    coordinator: "Tariq Mansoor (Field Director)",
    distanceKm: 12.0,
    establishedHoursAgo: 120,
    summary: "Welcoming incoming displaced families with hygiene supplies, trauma counseling, warm clothes, and child trauma recovery art kits.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Urgent need for 80 toddler winter jackets and stainless steel meal sets."
  },
  {
    id: "rc-mumbai-05",
    googlePlaceId: "ChIJZ39PqP011zsR9c_114321A",
    name: "Coastal Monsoon Rapid Kitchen Hub",
    locality: "Dharavi-Kurla Storm Relief Shelter",
    city: "Mumbai",
    state: "Maharashtra",
    latitude: 19.0433,
    longitude: 72.8633,
    crisisType: "flood",
    crisisTitle: "Severe High-Tide Waterlogging Relief",
    isVerified: true,
    verificationBadge: "BMC Disaster Management Cell",
    regNumber: "MH-REL-2022-77112",
    contactPhone: "+91 22 2404 1198",
    coordinator: "Farhan Merchant (Logistics Head)",
    distanceKm: 34.5,
    establishedHoursAgo: 48,
    summary: "Prepares 3,500 daily hot community meals for families stranded by flooded ground floors. Distributes dry food rations and drinking water.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Running low on flour/lentil packs. 340 kits needed before evening distribution."
  },
  {
    id: "rc-civic-06",
    googlePlaceId: "ChIJZ984B_0pDTkR4xT983L90Q",
    name: "Civil Hospital Family Care Annex",
    locality: "Near Gate 3, Sector 10 Civil Campus",
    city: "Gurugram",
    state: "Haryana",
    latitude: 28.4682,
    longitude: 77.0189,
    crisisType: "urban_emergency",
    crisisTitle: "Emergency Outpatient Support & Respite",
    isVerified: true,
    verificationBadge: "Hospital Patient Welfare Association",
    regNumber: "HR-HPW-2020-0081",
    contactPhone: "+91 124 232 0101",
    coordinator: "Sister Mary Varghese (Chief Nurse)",
    distanceKm: 7.1,
    establishedHoursAgo: 200,
    summary: "Assists out-of-town patient caretakers sleeping on hospital lawns with dry snacks, clean blankets, sanitary items, and night rest mats.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    liveTicker: "Requires 60 night blankets and volunteers for evening dinner packaging."
  }
];

export const INITIAL_RESOURCE_DEMANDS = [
  // Center 1 (Yamuna Flood)
  {
    id: "dem-del-01",
    centerId: "rc-delhi-01",
    category: "money",
    label: "Emergency Fuel & Boat Rescue Fund",
    targetQuantity: 15000,
    fulfilledQuantity: 9800,
    unit: "$",
    urgencyLevel: "critical",
    description: "Funds fuel for motorized rescue rafts and clean mobile water tankers."
  },
  {
    id: "dem-del-02",
    centerId: "rc-delhi-01",
    category: "ration",
    label: "Staple Grain & Pulse Bundles",
    targetQuantity: 500,
    fulfilledQuantity: 340,
    unit: "kits",
    urgencyLevel: "critical",
    description: "Bundles of 10kg flour, 5kg rice, 2kg lentils, and iodized salt."
  },
  {
    id: "dem-del-03",
    centerId: "rc-delhi-01",
    category: "clothes",
    label: "Waterproof Ponchos & Blankets",
    targetQuantity: 400,
    fulfilledQuantity: 285,
    unit: "items",
    urgencyLevel: "moderate",
    description: "Dry rainwear and thermal blankets for families staying under tents."
  },
  {
    id: "dem-del-04",
    centerId: "rc-delhi-01",
    category: "stationary",
    label: "Child Relief Study Kits",
    targetQuantity: 200,
    fulfilledQuantity: 75,
    unit: "kits",
    urgencyLevel: "moderate",
    description: "Drawing pads, colors, and grade 1-5 notebooks to keep children engaged."
  },
  {
    id: "dem-del-05",
    centerId: "rc-delhi-01",
    category: "utensils",
    label: "Family Cooking & Plate Sets",
    targetQuantity: 150,
    fulfilledQuantity: 110,
    unit: "sets",
    urgencyLevel: "stable",
    description: "Stainless steel pots, ladles, and eating thalis for makeshift kitchens."
  },
  {
    id: "dem-del-06",
    centerId: "rc-delhi-01",
    category: "volunteer",
    label: "Medical Triage & Mud Evacuation",
    targetQuantity: 30,
    fulfilledQuantity: 16,
    unit: "people",
    urgencyLevel: "critical",
    description: "Urgent call for first responders, nurses, and physically fit relief carriers."
  },

  // Center 2 (Gurugram Aravalli)
  {
    id: "dem-gur-01",
    centerId: "rc-gurugram-02",
    category: "money",
    label: "Community Kitchen Gas & Veg Supply",
    targetQuantity: 8000,
    fulfilledQuantity: 6200,
    unit: "$",
    urgencyLevel: "moderate",
    description: "Daily fresh vegetables, LPG cylinder refills, and clean ice."
  },
  {
    id: "dem-gur-02",
    centerId: "rc-gurugram-02",
    category: "ration",
    label: "Ready-to-Eat High Energy Ration",
    targetQuantity: 350,
    fulfilledQuantity: 210,
    unit: "kits",
    urgencyLevel: "critical",
    description: "Nutrient biscuits, roasted chickpeas, electrolyte sachets."
  },
  {
    id: "dem-gur-03",
    centerId: "rc-gurugram-02",
    category: "clothes",
    label: "Cotton Summer Clothes & Children Wear",
    targetQuantity: 250,
    fulfilledQuantity: 190,
    unit: "items",
    urgencyLevel: "stable",
    description: "Breathable clean shirts, trousers, and child footwear."
  },
  {
    id: "dem-gur-04",
    centerId: "rc-gurugram-02",
    category: "stationary",
    label: "Makeshift School Starter Packs",
    targetQuantity: 180,
    fulfilledQuantity: 60,
    unit: "kits",
    urgencyLevel: "critical",
    description: "Preschool to primary pencil boxes, workbooks, and flashcards."
  },
  {
    id: "dem-gur-05",
    centerId: "rc-gurugram-02",
    category: "utensils",
    label: "Commercial Cauldron & Serving Buckets",
    targetQuantity: 25,
    fulfilledQuantity: 12,
    unit: "sets",
    urgencyLevel: "critical",
    description: "Large 50-liter food containers and insulated serving ladles."
  },
  {
    id: "dem-gur-06",
    centerId: "rc-gurugram-02",
    category: "volunteer",
    label: "Food Prep & Homework Mentors",
    targetQuantity: 20,
    fulfilledQuantity: 14,
    unit: "people",
    urgencyLevel: "moderate",
    description: "Volunteers for cutting vegetables from 4-8 PM and evening tuition."
  },

  // Center 3 (Wayanad)
  {
    id: "dem-way-01",
    centerId: "rc-wayanad-03",
    category: "money",
    label: "Heavy Earthmover & Drone Search Fleet",
    targetQuantity: 25000,
    fulfilledQuantity: 14000,
    unit: "$",
    urgencyLevel: "critical",
    description: "Diesel fuel and drone thermal imaging operator compensations."
  },
  {
    id: "dem-way-02",
    centerId: "rc-wayanad-03",
    category: "ration",
    label: "Nutritional Dry Packs & Baby Porridge",
    targetQuantity: 600,
    fulfilledQuantity: 410,
    unit: "kits",
    urgencyLevel: "moderate",
    description: "Ragi infant mixes, vacuum-packed dry pulses, and tea powder."
  },
  {
    id: "dem-way-03",
    centerId: "rc-wayanad-03",
    category: "clothes",
    label: "Heavy Rain Jackets & Thermal Socks",
    targetQuantity: 500,
    fulfilledQuantity: 240,
    unit: "items",
    urgencyLevel: "critical",
    description: "Waterproof outerwear for cold wet hillside weather conditions."
  },
  {
    id: "dem-way-04",
    centerId: "rc-wayanad-03",
    category: "volunteer",
    label: "Malayalam/Tamil Medical EMTs & Nurses",
    targetQuantity: 25,
    fulfilledQuantity: 8,
    unit: "people",
    urgencyLevel: "critical",
    description: "Emergency wound dressing, psychological triage, and field nursing."
  },

  // Center 4 (Shattered Haven)
  {
    id: "dem-bor-01",
    centerId: "rc-border-04",
    category: "clothes",
    label: "Winter Coats & Thermal Infant Bundles",
    targetQuantity: 300,
    fulfilledQuantity: 110,
    unit: "items",
    urgencyLevel: "critical",
    description: "High priority: ages 0 to 8 coats, wool caps, and clean thermals."
  },
  {
    id: "dem-bor-02",
    centerId: "rc-border-04",
    category: "stationary",
    label: "Multilingual Storybooks & Color Pads",
    targetQuantity: 150,
    fulfilledQuantity: 45,
    unit: "kits",
    urgencyLevel: "moderate",
    description: "Picture books and crayons for child trauma resilience center."
  },
  {
    id: "dem-bor-03",
    centerId: "rc-border-04",
    category: "utensils",
    label: "Stainless Steel Insulated Food Tiffins",
    targetQuantity: 200,
    fulfilledQuantity: 95,
    unit: "sets",
    urgencyLevel: "moderate",
    description: "3-tier lunch boxes for ration distribution inside camps."
  },
  {
    id: "dem-bor-04",
    centerId: "rc-border-04",
    category: "volunteer",
    label: "Logistics Sorters & Translators",
    targetQuantity: 15,
    fulfilledQuantity: 9,
    unit: "people",
    urgencyLevel: "stable",
    description: "Inventory barcode scanning and language interpretation assistance."
  }
];

export const INITIAL_COMMON_STOCK = [
  {
    id: "cs-01",
    title: "Honda 5.5 kVA Silent Portable Generator",
    category: "Power & Emergency",
    lender: "Rahul Sharma (RWA Sec 56)",
    trustScore: 99,
    location: "Block C, Sector 56 (350m away)",
    status: "available",
    depositRequired: "$40 (Refundable)",
    maxBorrowDays: 4,
    description: "Heavy duty petrol inverter generator. Equipped with 4 power sockets. Ideal for medical equipment or emergency flood sump pumps.",
    condition: "Tested & Full Tank",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cs-02",
    title: "Heavy-Duty Submersible Mud Water Pump (1.5 HP)",
    category: "Flood Drainage",
    lender: "Sanjay Verma (DIY Club)",
    trustScore: 97,
    location: "Mayur Vihar Pocket 1 (800m away)",
    status: "available",
    depositRequired: "$25 (Refundable)",
    maxBorrowDays: 3,
    description: "Includes 25m heavy flexible drainage hose and float switch. Clears flooded basements and parking lots rapidly.",
    condition: "Serviced Oct 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cs-03",
    title: "LifeSaver Commercial Gravity Water Purifier (20L)",
    category: "Sanitation & Water",
    lender: "Green Earth Community NGO",
    trustScore: 100,
    location: "Civil Lines Ward 4 (1.2km away)",
    status: "in_use",
    dueBack: "Tomorrow, 11 AM",
    depositRequired: "$15 (Refundable)",
    maxBorrowDays: 5,
    description: "Filters 99.99% bacteria and turbidity without electricity. Vital during tap water contamination outbreaks.",
    condition: "Fresh Cartridge Installed",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cs-04",
    title: "Foldable Medical Stretcher & Mobility Wheelchair",
    category: "Medical & Elder",
    lender: "ElderCare Cooperative Hub",
    trustScore: 98,
    location: "Sector 10 Civic Center (1.9km away)",
    status: "available",
    depositRequired: "$0 (Free Mutual Aid)",
    maxBorrowDays: 7,
    description: "Aluminum aerospace-grade lightweight stretcher with safety harness. Fits into car trunks for patient evacuation.",
    condition: "Sanitized & Padded",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cs-05",
    title: "Stihl 18-inch Petrol Chainsaw & Debris Cutter",
    category: "Rescue & Tools",
    lender: "Neighbourhood Watch Corp",
    trustScore: 96,
    location: "Ardee City Gate 2 (2.5km away)",
    status: "available",
    depositRequired: "$30 (Refundable)",
    maxBorrowDays: 2,
    description: "For clearing fallen storm trees blocking ambulance arterial lanes. Includes helmet, gloves, and ear protection.",
    condition: "Sharp Chain & Safety Brake OK",
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cs-06",
    title: "Infant Travel Crib & Multi-Bottle Electric Sterilizer",
    category: "Infant Care",
    lender: "Pooja & Sameer (Residents)",
    trustScore: 99,
    location: "Sushant Lok 1 (1.4km away)",
    status: "available",
    depositRequired: "$10 (Refundable)",
    maxBorrowDays: 14,
    description: "Safe elevated foldable crib with mosquito mesh. Includes fast 6-minute steam bottle sterilizer for displaced mothers.",
    condition: "Spotless Clean",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_PULSE_FLASH_NEEDS = [
  {
    id: "pulse-01",
    centerId: "rc-delhi-01",
    centerName: "Yamuna Flood Relief & Transit Base",
    title: "Flash Need: 30 Thermal Blankets before 6:00 PM Tonight",
    deadline: "Today, 18:00 (2h 45m left)",
    category: "clothes",
    targetQty: 30,
    pledgedQty: 18,
    unit: "blankets",
    urgency: "critical",
    urgencyReason: "Night drop forecast to 14°C on floodplain tent shelters. Wet ground requires double insulation.",
    organizer: "Dr. Ananya Sen",
    radius: "3 km Hyperlocal Alert"
  },
  {
    id: "pulse-02",
    centerId: "rc-delhi-01",
    centerName: "Yamuna Flood Relief & Transit Base",
    title: "Flash Need: 15 Volunteers for Evening Sandbag Berm Fortification",
    deadline: "Today, 17:30 (2h 15m left)",
    category: "volunteer",
    targetQty: 15,
    pledgedQty: 9,
    unit: "volunteers",
    urgency: "critical",
    urgencyReason: "Upstream dam release expected at 8 PM. Strengthening temporary bund near school shelter.",
    organizer: "NDRF Joint Coordinator",
    radius: "5 km Radius"
  },
  {
    id: "pulse-03",
    centerId: "rc-gurugram-02",
    centerName: "Aravalli Migrant Community Shelter",
    title: "Flash Need: 40 Packets of Clean Infant Rehydration Salts (ORS)",
    deadline: "Tomorrow, 09:00 AM",
    category: "ration",
    targetQty: 40,
    pledgedQty: 32,
    unit: "ORS packs",
    urgency: "moderate",
    urgencyReason: "Preventing dehydration in temporary migrant shelter children after drinking water disruptions.",
    organizer: "Vikram Malhotra",
    radius: "4 km Radius"
  },
  {
    id: "pulse-04",
    centerId: "rc-border-04",
    centerName: "Shattered Haven Displacement Depot",
    title: "Flash Need: 20 Heavy Plastic Storage Crates for Medication",
    deadline: "Tonight, 21:00",
    category: "utensils",
    targetQty: 20,
    pledgedQty: 6,
    unit: "crates",
    urgency: "critical",
    urgencyReason: "Insulin and emergency medical supplies arriving via courier require sealed waterproof storage.",
    organizer: "Tariq Mansoor",
    radius: "8 km Radius"
  }
];

export const INITIAL_MUTUAL_AID_LISTINGS = [
  {
    id: "ma-01",
    type: "request",
    title: "Escort for Elderly Mother to Civil Hospital Dialysis",
    category: "Elder & Mobility Care",
    member: "Sunita Kapoor (Score 98%)",
    locality: "Sector 56 (400m away)",
    hoursRequired: 2,
    creditsOffered: 2,
    details: "Wheelchair assistance needed from apartment elevator to OPD Dialysis room. Mother speaks Hindi and Punjabi.",
    timeframe: "Tomorrow morning 8:30 AM",
    status: "open"
  },
  {
    id: "ma-02",
    type: "offer",
    title: "Emergency Plumbing & Water Pipe Leak Repair",
    category: "Home & Repairs",
    member: "Devendra Rawat (Licensed Plumber)",
    locality: "Sushant Lok 2 (1.1km away)",
    hoursRequired: 1,
    creditsOffered: 1,
    details: "I can fix cracked PVC joints, emergency sump pipe clogs, or faulty taps for any elderly or flood-affected family.",
    timeframe: "Weekdays after 5 PM",
    status: "open"
  },
  {
    id: "ma-03",
    type: "request",
    title: "Class 8 Mathematics & Science Tutoring for Displaced Student",
    category: "Education & Tutoring",
    member: "Mohit Aggarwal (Volunteer Uncle)",
    locality: "Mayur Vihar (600m away)",
    hoursRequired: 1.5,
    creditsOffered: 1.5,
    details: "My niece lost her textbooks in the flood; needs help catching up on CBSE algebra concepts before midterm exam.",
    timeframe: "Flexible evening via zoom or in-person",
    status: "open"
  },
  {
    id: "ma-04",
    type: "offer",
    title: "Free Cargo Van Transport for Heavy Relief Donations",
    category: "Logistics & Transport",
    member: "Gurpreet Singh (Delivery Partner)",
    locality: "Old Delhi Road (2.8km away)",
    hoursRequired: 2,
    creditsOffered: 2,
    details: "Have a clean Maruti Eeco cargo van. Can transport up to 300kg of blankets, dry rations, or water filters to local shelters.",
    timeframe: "Sundays all day",
    status: "open"
  },
  {
    id: "ma-05",
    type: "offer",
    title: "Trauma Emotional First Aid & Mental Health Counseling",
    category: "Counseling & Care",
    member: "Ayesha Qureshi (Psychology Scholar)",
    locality: "DLF Ph 4 (1.8km away)",
    hoursRequired: 1,
    creditsOffered: 1,
    details: "Certified in psychological first aid. 45-minute active listening and grounding sessions for relief volunteers and stressed families.",
    timeframe: "Evenings 7:00 - 9:00 PM",
    status: "open"
  }
];

export const DB_SCHEMA_SQL = `-- budHelp: PostGIS & PostgreSQL Core Humanitarian Architecture
-- 1. Enable PostGIS Extension for Hyperlocal Geospatial Queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Link Google Places to live humanitarian relief requirements
CREATE TABLE relief_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_place_id TEXT UNIQUE,
    name TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED,
    crisis_type TEXT CHECK (crisis_type IN ('flood', 'war_displacement', 'earthquake', 'landslide', 'urban_emergency')),
    is_verified BOOLEAN DEFAULT false,
    verification_badge TEXT,
    reg_number TEXT,
    contact_phone TEXT,
    coordinator_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geospatial Index for < 5km / 15km nearest-neighbor bounding queries
CREATE INDEX idx_relief_centers_geom ON relief_centers USING GIST(geom);

-- 3. Real-time requested resources per center with capacity thresholds
CREATE TABLE resource_demands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    center_id UUID REFERENCES relief_centers(id) ON DELETE CASCADE,
    category TEXT CHECK (category IN ('money', 'ration', 'clothes', 'stationary', 'utensils', 'volunteer')),
    label TEXT NOT NULL,
    target_quantity INT NOT NULL,
    fulfilled_quantity INT DEFAULT 0,
    unit TEXT DEFAULT 'units',
    urgency_level TEXT CHECK (urgency_level IN ('critical', 'moderate', 'stable')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User commitments & donation pledges (The 6 Fulfillment Channels)
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    demand_id UUID REFERENCES resource_demands(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    pledged_amount_or_qty INT NOT NULL,
    status TEXT CHECK (status IN ('pledged', 'dropped_off', 'verified_received')) DEFAULT 'pledged',
    fulfillment_method TEXT, -- 'self_dropoff_qr', 'online_payment', 'bulk_wholesale', 'home_pickup'
    pass_code TEXT,          -- Unique QR Token (e.g., 'PASS-RAT-9402')
    tax_receipt_no TEXT,     -- 80G Tax Exemption Receipt Number
    metadata JSONB,          -- Details: expiry_declared, hygiene_checked, skills_offered
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Volunteer roster and on-ground emergency dispatching
CREATE TABLE volunteer_roster (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    center_id UUID REFERENCES relief_centers(id) ON DELETE CASCADE,
    skills TEXT[],           -- ARRAY['medical', 'driving', 'cooking', 'labor', 'counseling']
    availability_dates DATE[],
    shift_name TEXT,         -- 'Morning Emergency Dispatch', 'Evening Sorter'
    id_verified BOOLEAN DEFAULT false,
    sms_alerts_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CommonStock: Hyperlocal neighborhood asset lending circles
CREATE TABLE common_stock_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    trust_score INT DEFAULT 100,
    deposit_amount NUMERIC(10, 2) DEFAULT 0.00,
    max_borrow_days INT DEFAULT 3,
    status TEXT CHECK (status IN ('available', 'lent_out', 'maintenance')) DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MutualAid Ledger: Time-banking credit transactions
CREATE TABLE mutual_aid_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    giver_user_id UUID NOT NULL,
    receiver_user_id UUID NOT NULL,
    hours_credit NUMERIC(4, 2) NOT NULL,
    task_description TEXT NOT NULL,
    status TEXT CHECK (status IN ('pending', 'completed', 'disputed')) DEFAULT 'completed',
    transacted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- ONE HEALTH & ANIMAL WELFARE EXTENSIONS (Concept 4: ShelterWatch & Rabies Guard)
-- =========================================================================

-- 8. Animal Shelter Specific Attributes
CREATE TABLE animal_shelters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    center_id UUID REFERENCES relief_centers(id) ON DELETE CASCADE,
    quarantine_capacity INT DEFAULT 0,
    current_quarantine_count INT DEFAULT 0,
    has_isolation_ward BOOLEAN DEFAULT false
);

-- 9. Targeted Medical Sponsorship Catalog (Publicly Funded Items)
CREATE TABLE medical_sponsorship_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shelter_id UUID REFERENCES animal_shelters(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL, -- e.g., 'Rabies Rapid Antigen Kit', 'Anti-Rabies Vaccine'
    cost_per_unit NUMERIC(10, 2) NOT NULL,
    units_needed INT NOT NULL,
    units_funded INT DEFAULT 0
);

-- 10. Role-Restricted Animal Medical Records & AI Ingestion
CREATE TABLE animal_medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shelter_id UUID REFERENCES animal_shelters(id) ON DELETE CASCADE,
    animal_identifier TEXT, -- e.g., 'TAG-DOG-2026-081'
    species TEXT DEFAULT 'canine',
    rescue_latitude DOUBLE PRECISION,
    rescue_longitude DOUBLE PRECISION,
    original_report_url TEXT NOT NULL,
    ai_raw_json JSONB, -- Raw structured output from multimodal model
    test_type TEXT,    -- 'RIDT', 'dFA', 'RT-PCR'
    test_result TEXT CHECK (test_result IN ('positive', 'negative', 'inconclusive', 'pending')),
    verified_by_staff BOOLEAN DEFAULT false,
    verified_by_user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Supabase / PostgreSQL Row-Level Security (RLS)
ALTER TABLE animal_medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow only verified NGO staff to read animal medical records"
ON animal_medical_records
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'ngo_staff'
    )
);
`;

export const INITIAL_ANIMAL_SHELTERS = [
  {
    id: "ash-01",
    centerId: "rc-pet-01",
    shelterName: "Paws & Hope Animal Rescue Sanctuary",
    quarantineCapacity: 35,
    currentQuarantineCount: 28,
    hasIsolationWard: true,
    activeVetsCount: 3,
    rabiesPositiveClusterCount: 2
  },
  {
    id: "ash-02",
    centerId: "rc-pet-02",
    shelterName: "Friendicoes Wildlife & Stray Trauma Base",
    quarantineCapacity: 50,
    currentQuarantineCount: 38,
    hasIsolationWard: true,
    activeVetsCount: 5,
    rabiesPositiveClusterCount: 1
  }
];

export const INITIAL_MEDICAL_SPONSORSHIP_CATALOG = [
  {
    id: "med-01",
    shelterId: "ash-01",
    centerId: "rc-pet-01",
    itemName: "Rabies Rapid Antigen Test Kit (RIDT)",
    targetPathogen: "Rabies Virus Antigen",
    costPerUnit: 15.00,
    costUnitDisplay: "$15 (₹1,200)",
    unitsNeeded: 60,
    unitsFunded: 44,
    description: "Rapid lateral flow immunochromatographic kit for stray quarantine bite intake. Delivers 98% specificity in 15 minutes."
  },
  {
    id: "med-02",
    shelterId: "ash-01",
    centerId: "rc-pet-01",
    itemName: "Core Vaccine Course (ARV + DHPPi)",
    targetPathogen: "Rabies, Distemper, Parvo, Hepatitis",
    costPerUnit: 25.00,
    costUnitDisplay: "$25 (₹2,000)",
    unitsNeeded: 80,
    unitsFunded: 52,
    description: "Full preventive vaccination schedule for newly rescued community dogs, safeguarding against rabies and canine distemper."
  },
  {
    id: "med-03",
    shelterId: "ash-01",
    centerId: "rc-pet-01",
    itemName: "10-Day Quarantine Boarding Sponsorship",
    targetPathogen: "Bite Surveillance Isolation",
    costPerUnit: 10.00,
    costUnitDisplay: "$10 / day (₹800)",
    unitsNeeded: 120,
    unitsFunded: 85,
    description: "Covers daily high-calorie clinical food, disinfectant sanitation, and isolated single-kennel care during the critical 10-day bite incubation period."
  },
  {
    id: "med-04",
    shelterId: "ash-02",
    centerId: "rc-pet-02",
    itemName: "Flood Rescue Animal Trauma Kit & Splints",
    targetPathogen: "Wound & Fracture Emergency",
    costPerUnit: 30.00,
    costUnitDisplay: "$30 (₹2,400)",
    unitsNeeded: 40,
    unitsFunded: 22,
    description: "Bandages, povidone-iodine, sterile surgical dressing, and oral antibiotics for cattle and dogs injured in floodwaters."
  }
];

export const INITIAL_ANIMAL_MEDICAL_RECORDS = [
  {
    id: "rec-01",
    shelterId: "ash-01",
    animalIdentifier: "TAG-DOG-2026-081",
    species: "canine",
    rescueLatitude: 28.4385,
    rescueLongitude: 77.1122,
    rescueLocation: "Sector 54, Golf Course Road Market",
    originalReportUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80",
    testType: "RIDT",
    testResult: "negative",
    confidenceScore: 0.98,
    targetPathogen: "Rabies Virus Antigen",
    clinicalSignsNoted: ["hypersalivation", "lethargy"],
    quarantineRecommendedDays: 10,
    vetName: "Dr. R. Sharma",
    testDate: "2026-10-10",
    verifiedByStaff: true,
    quarantineDayCurrent: 3,
    status: "Under Observation"
  },
  {
    id: "rec-02",
    shelterId: "ash-01",
    animalIdentifier: "TAG-DOG-2026-082",
    species: "canine",
    rescueLatitude: 28.4520,
    rescueLongitude: 77.0890,
    rescueLocation: "Sector 43, Rapid Metro Underpass (Hotspot)",
    originalReportUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
    testType: "RIDT",
    testResult: "positive",
    confidenceScore: 0.99,
    targetPathogen: "Rabies Virus Antigen",
    clinicalSignsNoted: ["extreme aggression", "hydrophobia", "aerophobia", "jaw dropped"],
    quarantineRecommendedDays: 14,
    vetName: "Dr. K. Singhania",
    testDate: "2026-10-09",
    verifiedByStaff: true,
    quarantineDayCurrent: 4,
    status: "Isolation Ward Alpha (Active Outbreak)"
  },
  {
    id: "rec-03",
    shelterId: "ash-01",
    animalIdentifier: "TAG-FEL-2026-039",
    species: "feline",
    rescueLatitude: 28.4610,
    rescueLongitude: 77.0340,
    rescueLocation: "Old Railway Road, Sector 4",
    originalReportUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    testType: "RT-PCR",
    testResult: "negative",
    confidenceScore: 0.96,
    targetPathogen: "Feline Panleukopenia & Rabies Screen",
    clinicalSignsNoted: ["fever", "loss of appetite"],
    quarantineRecommendedDays: 7,
    vetName: "Dr. R. Sharma",
    testDate: "2026-10-08",
    verifiedByStaff: true,
    quarantineDayCurrent: 5,
    status: "Recovering"
  },
  {
    id: "rec-04",
    shelterId: "ash-01",
    animalIdentifier: "TAG-DOG-2026-085",
    species: "canine",
    rescueLatitude: 28.4480,
    rescueLongitude: 77.0980,
    rescueLocation: "Sector 56 Huda Market",
    originalReportUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
    testType: "dFA",
    testResult: "inconclusive",
    confidenceScore: 0.78,
    targetPathogen: "Direct Fluorescent Antibody (dFA)",
    clinicalSignsNoted: ["disorientation", "tremors"],
    quarantineRecommendedDays: 10,
    vetName: "Dr. A. Verma",
    testDate: "2026-10-11",
    verifiedByStaff: false,
    quarantineDayCurrent: 1,
    status: "Re-testing Required"
  },
  {
    id: "rec-05",
    shelterId: "ash-01",
    animalIdentifier: "TAG-DOG-2026-089",
    species: "canine",
    rescueLatitude: 28.4210,
    rescueLongitude: 77.1230,
    rescueLocation: "Ghata Village Foothills",
    originalReportUrl: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80",
    testType: "RIDT",
    testResult: "negative",
    confidenceScore: 0.97,
    targetPathogen: "Rabies Virus Antigen",
    clinicalSignsNoted: ["limping", "minor dog bite wound"],
    quarantineRecommendedDays: 10,
    vetName: "Dr. R. Sharma",
    testDate: "2026-10-07",
    verifiedByStaff: true,
    quarantineDayCurrent: 6,
    status: "Healthy / Observation Day 6"
  }
];

