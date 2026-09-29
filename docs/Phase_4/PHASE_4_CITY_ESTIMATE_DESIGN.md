# Phase 4 City Estimate Design

## 1. Core Rule
**No external APIs, no paid services, no live financial data, and no external AI.**
All data must be provided via a local, static JSON file or hardcoded database seed.

## 2. Static Estimate Structure
```json
{
  "cities": {
    "mumbai": {
      "name": "Mumbai",
      "rent": { "bachelor": 25000, "family": 45000 },
      "food": { "bachelor": 8000, "family": 15000 },
      "transport": 4000,
      "utilities": 3000
    },
    "bangalore": {
      "name": "Bangalore",
      "rent": { "bachelor": 18000, "family": 35000 },
      "food": { "bachelor": 7000, "family": 12000 },
      "transport": 3500,
      "utilities": 2500
    },
    "tier2_default": {
      "name": "Other Tier-2 City",
      "rent": { "bachelor": 10000, "family": 18000 },
      "food": { "bachelor": 5000, "family": 9000 },
      "transport": 2000,
      "utilities": 1500
    }
  }
}
```

## 3. City & Locality Handling
- The frontend will offer an autocomplete or dropdown of supported major cities.
- **Unknown City Behavior:** If a user types a city not in the static map, the system falls back to the `tier2_default` or `tier3_default` estimates.
- Locality is captured as a string for the user's reference but does not impact the static estimate map to avoid complexity.

## 4. User Overrides
- The system pre-fills the "Planned Expenses" form with these estimates.
- **Crucial Rule:** The user is completely free to override these estimates. 
- The system saves the user's overridden values in the database, NOT the static estimates.

## 5. Estimate Labels
To protect against liability, the UI must explicitly display:
> *"These are illustrative local estimates based on static sample data. Please edit them to match your actual situation."*

## 6. Implementation
- The estimates can be served via a lightweight backend route `GET /api/v1/city-estimates?city=mumbai` which just reads from a local `utils/cityData.js` file.
