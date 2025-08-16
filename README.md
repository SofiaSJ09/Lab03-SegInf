# Risk Calculator

A full-stack risk assessment application built with React, NestJS, and SQLite.

## Features

- **Risk Assessment**: Calculate risk scores based on likelihood (1-5) and severity (1-5)
- **Risk Classification**: Automatic classification into Low, Medium, High, and Extreme risk levels
- **CRUD Operations**: Create, read, update, and delete risks
- **Advanced Filtering**: Filter by risk level, search by hazard description
- **Sorting**: Sort by risk score or creation date
- **CSV Export**: Export risk data to CSV format
- **Sample Data**: Seed database with example risks
- **Responsive UI**: Modern, mobile-friendly interface built with Tailwind CSS

## Tech Stack

### Backend
- **NestJS 10**: Modern Node.js framework
- **TypeORM 0.3**: Database ORM with SQLite
- **SQLite**: Lightweight database
- **class-validator**: Input validation
- **class-transformer**: Data transformation

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling
- **React Query**: Server state management
- **Lucide React**: Beautiful icons

## Prerequisites

- Node.js 18+ 
- npm

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd risk-calculator
```

### 2. Backend Setup
```bash
cd server
npm install
npm run start:dev
```

The API will be available at `http://localhost:3001`

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Risks
- `POST /api/risks` - Create a new risk
- `GET /api/risks` - Get all risks (with optional filters)
- `GET /api/risks/:id` - Get a specific risk
- `PATCH /api/risks/:id` - Update a risk
- `DELETE /api/risks/:id` - Delete a risk
- `POST /api/risks/seed` - Seed database with sample data

### Query Parameters
- `level`: Filter by risk level (Low, Medium, High, Extreme)
- `search`: Search hazards by description
- `sortBy`: Sort by field (riskScore, createdAt)
- `order`: Sort order (ASC, DESC)

## Risk Calculation

**Risk Score = Likelihood × Severity**

**Risk Levels:**
- **Low**: 1-4
- **Medium**: 5-9  
- **High**: 10-16
- **Extreme**: 17-25

## Development

### Backend Scripts
```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
```

### Frontend Scripts
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run test           # Run tests
```

## Testing

### Backend Tests
- **Unit Tests**: Test service logic and risk classification
- **E2E Tests**: Test API endpoints and CRUD operations

### Frontend Tests
- **Component Tests**: Test React components with React Testing Library
- **Integration Tests**: Test component interactions

## Database

The application uses SQLite with automatic synchronization in development mode. The database file (`data.sqlite`) will be created automatically in the server directory.

## CORS Configuration

CORS is enabled for `http://localhost:5173` (frontend development server).

## Contributing

1. Follow TypeScript strict mode
2. Use proper typing (no `any` types)
3. Follow the established component structure
4. Add tests for new functionality
5. Ensure responsive design with Tailwind CSS

## License

This project is licensed under the MIT License.
