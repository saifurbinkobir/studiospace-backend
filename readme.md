# StudioSpace Backend

Live client site: [https://studio-space-liard.vercel.app/](https://studio-space-liard.vercel.app/)

StudioSpace Backend is the REST API for StudioSpace, a peer-to-peer creative space marketplace for filmmakers, photographers, podcasters, musicians, and other creators. It provides secure endpoints for browsing studios, managing listings, submitting reviews, and creating or cancelling bookings.

## Features

- Provides studio listing, featured studio, category filtering, details, and owner-specific studio APIs.
- Supports creating, updating, and deleting personal studio listings.
- Provides review creation and studio review retrieval endpoints.
- Supports booking creation, booking history, and booking cancellation.
- Detects overlapping confirmed bookings to help prevent double-booking a studio.
- Protects private routes with JWT verification through the frontend Better Auth JWKS endpoint.
- Uses MongoDB collections for studios, reviews, and bookings.
- Enables cross-origin requests for communication with the deployed frontend.

## Technology Stack

- Node.js
- Express 5
- MongoDB Node.js Driver
- JavaScript with ES modules
- JOSE for JWT verification
- CORS
- dotenv
- Vercel serverless deployment

## Local Setup

1. Clone the repository:

   ```bash
   git clone <your-backend-repository-url>
   cd studiospace-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the required environment variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:3000
   ```

   `CLIENT_URL` must point to the frontend application that exposes the Better Auth JWKS endpoint. For the deployed application, use `https://studio-space-liard.vercel.app`.

4. Start the backend:

   ```bash
   node index.js
   ```

5. The API will be available at `http://localhost:5000`.

## API Overview

- `GET /` - Check whether the server is running.
- `GET /studios` - Retrieve studios, optionally filtered by category.
- `GET /studios/featured` - Retrieve featured studios.
- `GET /studios/:id` - Retrieve studio details.
- `POST`, `PUT`, `DELETE /studios...` - Manage studio listings.
- `GET` and `POST /studios/reviews...` - Retrieve and create reviews.
- `GET`, `POST`, `PATCH /studios/bookings...` - Retrieve, create, and cancel bookings.

Private endpoints require a valid JWT in the request's `Authorization: Bearer <token>` header.

## Examiner Test Credentials

- Email: `john@smith.com`
- Password: `John1234`

## Available Scripts

This backend currently does not define custom npm scripts. Use the following commands:

```bash
npm install       # Install dependencies
node index.js     # Start the API server
```
