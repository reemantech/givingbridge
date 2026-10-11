# 🌉 GivingBridge
### Hyperlocal Community Cooperation, NGO Disaster Relief & One Health Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Storage-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-Places%20%26%20Distance-4285F4?logo=google-maps&logoColor=white)](https://developers.google.com/maps)
[![PostGIS](https://img.shields.io/badge/PostGIS-Spatial%20Queries-336791?logo=postgresql&logoColor=white)](https://postgis.net/)

> **Direct Citizen-to-Ground Relief, Neighborhood Mutual Aid & Animal Welfare Management**  
> Built for emergency response, war/disaster displacement, neighborhood resource sharing, and stray animal disease control (Rabies surveillance).

---

## 📌 1. Executive Summary & Themes

* **Core Theme:** **Cooperation** — Hyperlocal communication and resource sharing within local neighborhoods, civic groups, and non-governmental organizations (NGOs).
* **Focus Areas:**
  1. **Human Emergency Response & Disaster Displacement:** Direct assistance for flood shelters, migrant camps, and disaster zones.
  2. **One Health & Animal Welfare:** Stray animal disease control, pet shelter discovery, and micro-funded rabies diagnostic testing.
* **Key Challenge Solved:** Bridges the trust barrier, avoids donation mismatches, prevents warehouse supply clogs, and provides private automated intelligence for overburdened shelter and disaster teams.

---

## 🌟 2. Product Concepts

| Concept | Target Users | Core Mechanic | Key Differentiator |
| :--- | :--- | :--- | :--- |
| **1. CommonStock** | Residents, tenants' associations, DIY groups | Hyperlocal "lending circles" for tools, generators, water pumps, moving boxes | Eliminates redundant purchases; includes refundable deposit holds, trust ratings, and **Handshake PIN** check-ins. |
| **2. PulseRelay** | Grassroots NGOs, food banks, community volunteers | Real-time "flash needs" board (e.g., *Food drive needs 30 blankets by 6:00 PM*) | Event-driven matching within walking & transit radius; verified NGO requests with countdown clocks. |
| **3. MutualAid Ledger** | Elderly residents, students, working parents, volunteers | Zero-cash Time-banking credit loop (*1 hour walking an elder's dog = 1 hour algebra tutoring*) | Eliminates cash transactions while preventing free-riding through a fair reciprocal credit ledger. |
| **4. ShelterWatch & Rabies Guard** | Animal shelters, rescue teams, community advocates | Micro-fund diagnostic test kits & vaccines; AI-automated lab report extraction for internal NGO teams | Direct animal impact tracking, early warning outbreak heatmaps, and zero-overhead digitizing of veterinary paperwork. |

---

## 🗺️ 3. End-to-End User Journeys

### A. Public Discovery & Contribution Journey
```
[Location / Search Entry] (Google Places Autocomplete)
           │
           ▼
[Map & List View] ──▶ Toggle: [All Relief Hubs] | [Human Relief Centers] | [Pet Shelters]
           │
           ▼ (User taps a pin or listing)
[Detail Profile] ──▶ Live shortage ticker, capacity progress bars, verified credentials
           │
           ▼ (User clicks "Take Action")
[Support Selector] ──▶ Choose aid stream:
                       ├─ Human Aid: [Money] [Ration] [Clothes] [Stationery] [Utensils] [Volunteer]
                       └─ Shelter Aid: [Fund Rabies Test] [Fund Vaccine Course] [Quarantine Day] [Volunteer]
           │
           ▼
[Fulfillment Flow] ──▶ Instant payment gateway, 80G Tax Receipt, or Warehouse Drop-off QR Pass
```

### B. NGO Internal AI Diagnostic Ingestion Flow
```
   [NGO Staff Uploads Document]
   (PDF / Lab Image / Scanned Form / Lateral Flow Assay Cassette Photo)
                  │
                  ▼
   [Multimodal AI / OCR Pipeline]
                  │
   ┌──────────────┴──────────────┐
   │ Structured Entity Extraction│
   │ - Animal Tag / Species      │
   │ - Test Type (dFA, RIDT, PCR)│
   │ - Result (Pos / Neg / Inc)  │
   │ - Attending Vet / Date      │
   │ - Quarantine Recommendation │
   └──────────────┬──────────────┘
                  │
                  ▼
   [Human-in-the-Loop Validation Screen]
   (Staff confirms or edits extracted fields)
                  │
                  ▼
   [Private Database Ingestion (PostGIS)]
                  │
                  ▼
   [NGO Health Dashboard & Spatial Outbreak Cluster Map]
```

---

## 📦 4. Fulfillment & Contribution Streams

### Human Disaster Relief Channels
* 💵 **Help with Money:** Presets ($25, $50, $100, $250) or custom amount; one-time vs. recurring; simulated secure gateway; instant **Section 80G Official Tax Exemption Receipt** with authorized digital signature and verification hash.
* 🍲 **Help with Ration:** Select kit bundles (Staple Flour/Rice/Lentil bundles, High-Energy nutrition packs, Infant formula); mandatory 6-month shelf-life pledge; generates **Warehouse Drop-off QR Check-in Pass** (`PASS-RAT-XXXX`) with dock assignment or routes bulk orders through partner wholesale vendors.
* 👕 **Help with Clothes:** Warm wear, thermal blankets, children coats, waterproof tarps; hygiene declaration check; drop-off scheduling or volunteer doorstep pickup.
* 📚 **Help with Stationery:** School starter kits, notebooks, pencil cases, child trauma recovery art kits matching makeshift shelter curricula.
* 🍳 **Help with Utensils:** Stainless steel family dining sets, pressure cookers, single-burner LPG stoves, insulated 10L thermal food dispensers.
* 🦺 **Volunteer On-Ground:** Immediate emergency triage shift, morning dispatch, evening sorting; specialized skills (Medical EMT, Logistics/Driving, Mass Cooking, Heavy Debris Clearance); government ID verification check; emergency SMS/WhatsApp dispatch roster enrollment.

### Pet Shelter & Animal Care Streams
* 🧪 **Fund Rabies Test Kit:** Unit cost **$15 (₹1,200)**. Funds rapid lateral flow (RIDT) antigen kits for stray quarantine intake. Sends donor an anonymized tag deployment confirmation (`TAG-SPONSOR-XXXX`).
* 💉 **Fund Vaccine Course:** Unit cost **$25 (₹2,000)**. Covers Anti-Rabies Vaccine (ARV) + DHPPi core combinations for newly rescued strays.
* 🏡 **Sponsor Quarantine Day:** Daily rate **$10 (₹800)**. Covers food, sanitation, and single-kennel boarding for animals undergoing mandatory 10–14 day bite observation.
* 🐾 **Shelter Volunteer:** Dog walking, kennel sanitation, food preparation, rescue driving.

---

## 🔒 5. NGO Portal: Multimodal AI & Role-Based Access Control (RBAC)

* **Access Security:** Role-based toggle (`citizen` vs `ngo_staff` / `vet_partner`). Access to identifiable animal medical records and epidemiological heatmaps is restricted to verified staff accounts.
* **AI Extraction Schema:** Multimodal optical character recognition parses veterinary reports into structured JSON:
  ```json
  {
    "animal_identifier": "TAG-DOG-2026-081",
    "species": "canine",
    "test_date": "2026-10-10",
    "test_type": "RIDT",
    "target_pathogen": "Rabies Virus Antigen",
    "result": "negative",
    "confidence_score": 0.98,
    "clinical_signs_noted": ["hypersalivation", "lethargy"],
    "quarantine_recommended_days": 10,
    "vet_name": "Dr. R. Sharma"
  }
  ```
* **Epidemiological KPIs:**
  - **Positivity & Suspect Rate:** Tracks percentage of rescues testing positive/inconclusive over time.
  - **Spatial Outbreak Cluster Map:** Plots geotagged rescue coordinates using PostGIS to identify emerging local transmission zones.
  - **Diagnostic Kit Burn Rate:** Live ratio of kits remaining in inventory vs community-sponsored kits.
  - **Quarantine Turnover:** Tracks animals approaching completion of observation.

---

## 🏗️ 6. Technical Architecture

```
                 ┌────────────────────────────────────────────────────────┐
                 │          Frontend (Modern Web / Mobile Web)            │
                 │   - Public UI: Crisis & Shelter Map, Action Selector   │
                 │   - Staff UI: Document Upload & Analytics Dashboard    │
                 └───────────────────────────┬────────────────────────────┘
                                             │ HTTPS / WebSocket
                 ┌───────────────────────────▼────────────────────────────┐
                 │                Backend Application Layer               │
                 └──────┬────────────────────┬────────────────────┬───────┘
                        │                    │                    │
         ┌──────────────▼──────┐     ┌───────▼───────────┐ ┌──────▼──────────────┐
         │  Google Maps APIs   │     │  Multimodal AI    │ │  Database (PostGIS) │
         │  - Places API       │     │  - Vision/Doc OCR │ │  - Profiles & Needs │
         │  - Geocoding API    │     │  - JSON Extractor │ │  - Animal Records   │
         │  - Distance Matrix  │     │  - Schema Validate│ │  - RLS Security     │
         └─────────────────────┘     └───────────────────┘ └─────────────────────┘
```

---

## 🗄️ 7. Database Schema (PostgreSQL / PostGIS)

```sql
-- 1. Base Relief Centers & Shelters (Google Places Enriched)
CREATE TABLE relief_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_place_id TEXT UNIQUE,
    name TEXT NOT NULL,
    category TEXT CHECK (category IN ('disaster_relief', 'pet_shelter', 'community_kitchen')),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED,
    crisis_type TEXT, -- e.g., 'flood', 'war_displacement', 'stray_rabies_surge'
    is_verified BOOLEAN DEFAULT false,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geospatial Index for < 5km / 15km nearest-neighbor bounding queries
CREATE INDEX idx_relief_centers_geom ON relief_centers USING GIST(geom);

-- 2. Animal Shelter Specific Attributes
CREATE TABLE animal_shelters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    center_id UUID REFERENCES relief_centers(id) ON DELETE CASCADE,
    quarantine_capacity INT DEFAULT 0,
    current_quarantine_count INT DEFAULT 0,
    has_isolation_ward BOOLEAN DEFAULT false
);

-- 3. Targeted Medical Sponsorship Catalog (Publicly Funded Items)
CREATE TABLE medical_sponsorship_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shelter_id UUID REFERENCES animal_shelters(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    cost_per_unit NUMERIC(10, 2) NOT NULL,
    units_needed INT NOT NULL,
    units_funded INT DEFAULT 0
);

-- 4. General Human Relief Demands
CREATE TABLE resource_demands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    center_id UUID REFERENCES relief_centers(id) ON DELETE CASCADE,
    category TEXT CHECK (category IN ('money', 'ration', 'clothes', 'stationary', 'utensils', 'volunteer')),
    target_quantity INT NOT NULL,
    fulfilled_quantity INT DEFAULT 0,
    urgency_level TEXT CHECK (urgency_level IN ('critical', 'moderate', 'stable')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. User Contributions & Pledges
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    center_id UUID REFERENCES relief_centers(id) ON DELETE CASCADE,
    sponsorship_item_id UUID REFERENCES medical_sponsorship_catalog(id),
    category TEXT NOT NULL,
    pledged_amount_or_qty INT NOT NULL,
    payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')),
    status TEXT CHECK (status IN ('pledged', 'dropped_off', 'deployed_on_ground')) DEFAULT 'pledged',
    pass_code TEXT,
    tax_receipt_no TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Role-Restricted Animal Medical Records & AI Ingestion
CREATE TABLE animal_medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shelter_id UUID REFERENCES animal_shelters(id) ON DELETE CASCADE,
    animal_identifier TEXT,
    species TEXT DEFAULT 'canine',
    rescue_latitude DOUBLE PRECISION,
    rescue_longitude DOUBLE PRECISION,
    original_report_url TEXT NOT NULL,
    ai_raw_json JSONB,
    test_type TEXT,
    test_result TEXT CHECK (test_result IN ('positive', 'negative', 'inconclusive', 'pending')),
    verified_by_staff BOOLEAN DEFAULT false,
    verified_by_user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Row-Level Security (RLS) Policy
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
```

---

## 🚀 8. Getting Started

### Prerequisites
* **Node.js**: v18+ (tested on v24)
* **npm**: v9+

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/reemantech/givingbridge.git
cd givingbridge

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Environment Configuration (`.env`)
Create a `.env` file in the project root:
```env
# Firebase Configuration (Cloud Firestore & Storage)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef...

# Google Maps Platform (Places Autocomplete & Distance Matrix)
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...

# CARTO Basemap Key (Optional - Public Voyager tiles load free by default)
VITE_CARTO_API_KEY=your_carto_key
```

---

## 🧪 9. Interactive Features to Test

1. **Relief & Shelter Discovery:** Toggle between human crisis zones and animal rescue sanctuaries on the live Leaflet map. Filter by `< 5km`, `< 15km`, or `< 50km`.
2. **6 Fulfillment Flows:** Pledge a food ration kit to get an instant **QR Check-in Pass**; donate money to view the **Section 80G Tax Certificate**.
3. **CommonStock Lending Circle:** Borrow emergency tools (Honda generator, sump pump) with a **Handshake PIN**.
4. **PulseRelay Flash Needs:** Quick-pledge to time-critical needs before countdown deadlines.
5. **MutualAid Ledger:** Trade care hours (dog walking, senior care) for educational tutoring without money.
6. **ShelterWatch & AI Scanner:** Switch to `[🩺 Staff / Vet]` mode, run the **Multimodal AI OCR pipeline** on sample lab reports, verify the extracted fields, and inspect the **Rabies Outbreak Cluster Heatmap**.

---

## 📄 License
This project is licensed under the MIT License.
