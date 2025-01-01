# Seat Booking

## Deployed App

[Seat Booking App](https://seat-booking-azure.vercel.app/)

## Problem Description

- The coach of a train has 80 seats arranged in rows with:
  - 7 seats per row except for the last row, which has only 3 seats.
- A single coach is considered for simplicity.
- A user can reserve up to 7 seats in a single booking.
- Booking priority:
  - Seats should be booked within the same row if possible.
  - If not, nearby seats should be allocated.
- Users can continue to book tickets until all seats are occupied.
- No login functionality is required for this application.

## Tech Stack


- React.js
- Node.js
- Express.js
- PostgreSQL

## Backend Installation

1. Clone the repository.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:

   ```bash
   npm install

   ```

4. Run postgreSQL in local or create remote postgres repo

5. Add configuration in .env file (root level of backend folder)
  ```bash
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
   ```

6. Apply the migration:
   ```bash
   npm run migrate
   ```
7. Run the seed script (for generating demo seats):

   ```bash
   npm run seed
   ```

8. Start the backend server:
   ```bash
   npm run start
   ```

## Frontend Installation

1. Clone the repository.
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

4. Add .env file in root level of frontend directory:
```
REACT_APP_API_URL=
```

5. Start the frontend application:
   ```bash
   npm run start
   ```


### Endpoints:

1. **GET /api/seats**

   - Fetches all seat information.

2. **POST /api/seats**

   - Resets all seat bookings.

3. **POST /api/seats/book**
   - Books a specified number of seats.
