# Lab 14 - API RESTful Deployment and Testing Lab

Student: M Abdullah  
Registration ID: 232052

GitHub Repository: https://github.com/abdullahfawadd/Full-stack-programming-lab

This lab implements Task 8.1 and Task 8.2 with real external no-key services, an Express REST API, a polished Next.js browser dashboard, and Jest unit, integration, and system testing evidence.

## Services Used

- Task 8.1 Weather Forecast API: Open-Meteo Geocoding API and Open-Meteo Forecast API
- Task 8.2 News Headlines API: Google News RSS country feeds parsed into JSON

No OpenWeather or NewsAPI key is required.

## Backend

```bash
cd lab_14_api_restful_deployment_and_testing_lab/backend
npm install
npm run dev
```

Default backend URL: `http://localhost:5000`

### API Endpoints

| Task | Method | Endpoint | Description |
| --- | --- | --- | --- |
| 8.1 | GET | `/api/weather/:city` | Fetch live weather for a city |
| 8.2 | GET | `/api/news/:countryCode?limit=6` | Fetch 5-10 top headlines for a country |

### Weather Response Includes

- City name: `city`
- Current temperature: `currentTemperature`, `temperatureUnit`
- Weather condition: `weatherCondition`
- Humidity level: `humidityLevel`, `humidityUnit`

### News Response Includes

- News title: `newsTitle`
- Source name: `sourceName`
- News URL: `newsUrl`
- Publication date: `publicationDate`

## Frontend

```bash
cd lab_14_api_restful_deployment_and_testing_lab/frontend
npm install
npm run dev
```

Default frontend URL: `http://localhost:3000`

Use `NEXT_PUBLIC_API_URL` to point the dashboard to a different backend port.

## Testing

```bash
cd lab_14_api_restful_deployment_and_testing_lab/backend
npm test
npm run test:unit
npm run test:integration
npm run test:system
```

The Jest tests mock the external providers so they are stable and repeatable.

## Verification

Frontend:

```bash
cd lab_14_api_restful_deployment_and_testing_lab/frontend
npm run lint
npm run build
```

Production dependency audits for both backend and frontend currently report `0 vulnerabilities`.

## Screenshots

- Task 8.1 weather screenshots: `screenshots/task-8.1-weather/`
- Task 8.2 news screenshots: `screenshots/task-8.2-news/`
- Testing and browser proof: `screenshots/testing/`

## Submission Report

Open `submission-report.html` in a browser or use `submission-report.pdf` if generated.
