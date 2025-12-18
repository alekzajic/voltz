# voltZ

A React-based web application for visualizing transformer asset data.

## Features
- **Data Ingestion**: Fetches transformer data from a JSON source.
- **Table**: Interactive table with search updates and voltage health filtering.
- **Chart**: Voltage visualization with transformer lines.
- **Persistence**: Filters and selection state are saved using local storage (Zustand).

## Tech Stack
- React 19.2
- TypeScript
- Vite
- Axios (Data fetching)
- React Query (Data caching & state)
- Zustand (Global state persistence)
- Visx (Data visualization)
- Tailwind CSS (Styling)

## Setup & Running

### Directory Structure
- `frontend/`: Contains the React source code.
- `Dockerfile`: Production build configuration.
- `docker-compose.yml`: Development configuration with hot-reloading.
- `deploy.sh`: Deployment script for production.

### Local Development (with Docker)
1. Run development environment with hot-reloading:
   ```bash
   docker-compose up --watch --build
   ```
2. Open `http://localhost:5173`.


### Local Development (without Docker)
1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install & Start:
   ```bash
   npm install --legacy-peer-deps && npm run dev
   ```
Using a flag `--legacy-peer-deps` is required due to a react version mismatch between the project and the visx library.

### Deployment
1. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```
   This will build the production Docker image and start it on port 8080.
3. Access at `http://localhost:8080`.

