// Hyperlocal Crisis Centers, Inventory Demands, CommonStock Assets & Mutual Aid Seed Data

export const INITIAL_RELIEF_CENTERS = [
  {
    id: "rc-delhi-01",
    googlePlaceId: "ChIJ_yqX9v8DdTkR9cKx5Q8YV3c",
    name: "Yamuna Flood Relief & Transit Base",
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
);`;
