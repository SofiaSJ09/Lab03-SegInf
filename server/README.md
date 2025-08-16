# Risk Calculator Backend

NestJS API for risk assessment and management.

## Features

- CRUD operations for risks
- Automatic risk score calculation (Likelihood × Severity)
- Risk level classification (Low, Medium, High, Extreme)
- SQLite database with TypeORM
- Input validation with class-validator
- RESTful API endpoints

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run build
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Endpoints

### Base URL: `/api/risks`

- `POST /` - Create a new risk
- `GET /` - Get all risks (with optional filters)
- `GET /:id` - Get a specific risk
- `PATCH /:id` - Update a risk
- `DELETE /:id` - Delete a risk
- `POST /seed` - Seed database with sample data

### Query Parameters for GET /risks

- `level` - Filter by risk level (Low, Medium, High, Extreme)
- `search` - Search in hazard description
- `sortBy` - Sort by field (riskScore, createdAt, etc.)
- `order` - Sort order (ASC, DESC)

### Example Request

```bash
# Create a risk
curl -X POST http://localhost:3001/api/risks \
  -H "Content-Type: application/json" \
  -d '{
    "hazard": "Electrical equipment failure",
    "likelihood": 3,
    "severity": 4
  }'

# Get all risks
curl http://localhost:3001/api/risks

# Filter by level
curl "http://localhost:3001/api/risks?level=High"

# Search hazards
curl "http://localhost:3001/api/risks?search=electrical"
```

## Risk Calculation

- **Risk Score** = Likelihood × Severity (1-25)
- **Risk Levels**:
  - 1-4: Low
  - 5-9: Medium
  - 10-16: High
  - 17-25: Extreme

## Likelihood Scale

1. Rare
2. Unlikely
3. Possible
4. Likely
5. Almost Certain

## Severity Scale

1. Insignificant
2. Minor
3. Moderate
4. Major
5. Catastrophic
