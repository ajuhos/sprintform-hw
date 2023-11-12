# Sprintform Homework

## Local setup

To run locally, you will need the following environment:
- Node.js 20.9.0 (LTS)
- Typescript 5.x
- MongoDB 7.x

### Frontend

Create the `.env.local` file in the `frontend` director:
```dotenv
VITE_API_URL=http://localhost:8080
```

Then install the dependencies and run the development server:
```bash
cd frontend
yarn
yarn dev
```

### Backend

Install the dependencies:
```bash
cd backend
yarn
```

Before starting the server for the first time, seed the database with demo data:
```bash
yarn seed
```

Finally run the server:
```bash
yarn start
```

## Deployment

When deploying the system, you can use the `PORT` and `MONGODB_URI` environment variables to configure the server.