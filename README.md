# React PlacePicker

A project built with React and TypeScript that shows how to work with HTTP requests in React. The app lets you build a personal collection of places you would like to visit. Places are loaded from a backend, sorted by distance from your location, and your selection is saved on the server.


## Features

- List of available places loaded from the backend
- Places sorted by distance from the user, based on browser geolocation
- Personal collection of places that is saved on the server and loaded on startup
- Selecting a place adds it to the collection right away
- Removing a place with a confirmation dialog that confirms automatically after 3 seconds, with a progress bar
- Loading texts while data is being fetched
- Error messages when a request fails, shown on the page or in a modal
- Rollback of the collection when saving to the server fails

## Tech Stack

- React
- TypeScript
- Vite
- Plain CSS
- Node.js backend (in the `backend` folder)
- Vercel for the frontend and Render for the backend

## React Concepts Used

- `useEffect` to fetch data when a component is mounted
- `useState` for data, loading and error states
- `useRef` to remember the selected place and to control the `dialog` element
- `useCallback` to keep the delete handler stable, so the confirmation timer is not restarted on every render
- Cleanup functions in `useEffect` for timers and intervals
- A custom `useFetch` hook with generics that moves loading, error and data logic out of components
- Portals with `createPortal` and the native `dialog` element for modals
- Optimistic updating: the interface changes first, and the change is rolled back if the request fails
- Separate `http.ts` module for all requests to the backend
- Environment variables with Vite for the backend address
- Browser Geolocation API and the haversine formula to calculate distance between places
- Handling loading and error states in the interface
- Typed props, state, API responses and shared types

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

1. Clone the repository with `git clone https://github.com/dianakovtoniuk/react_placepicker_http.git`
2. Go to the project folder with `cd react_placepicker_http`
3. Install frontend dependencies with `npm install`
4. Install backend dependencies with `cd backend && npm install`

### Running the app

The frontend and the backend must run at the same time, so you need two terminals.

1. In the first terminal, start the backend:
```
   cd backend
   node app.js
```
   The backend runs at http://localhost:3000.
2. In the second terminal, start the frontend from the project root:
```
   npm run dev
```
   The app will be available at http://localhost:5173.

If the app shows "Failed to fetch", the backend is not running or the API address is wrong. Allow location access in the browser to see places sorted by distance.

### Environment variables

The frontend reads the backend address from `VITE_API_URL`. If it is not set, the app uses `http://localhost:3000`.

To use a different backend locally, create a `.env` file in the project root:

```
VITE_API_URL=https://your-backend.onrender.com
```

Do not add a slash at the end of the address. Vite adds `VITE_` variables to the build, so restart the dev server after changing the file.

## Deployment

- **Backend (Render):** create a Web Service from the repository, set the root directory to `backend`, the build command to `npm install` and the start command to `node app.js`. The server must listen on `process.env.PORT`.
- **Frontend (Vercel):** import the repository and add the environment variable `VITE_API_URL` with the address of the Render service. Redeploy after changing it, because the value is added during the build.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build in the `dist` folder
- `npm run preview` serves the production build locally

## Project Structure

- `backend/` Node.js server that stores places and user places
- `public/` static files
- `src/`
  - `assets/` logo image
  - `components/`
    - `AvailablePlaces.tsx` list of places from the server, sorted by distance
    - `Places.tsx` reusable list of places with loading and fallback texts
    - `DeleteConfirmation.tsx` confirmation dialog with auto-confirm timer
    - `ProgressBar.tsx` progress bar for the timer
    - `Modal.tsx` modal built with a portal and the `dialog` element
    - `Error.tsx` error message block
  - `hooks/`
    - `useFetch.ts` reusable hook for loading data with loading and error states
  - `App.tsx` root component with the user collection and update logic
  - `config.ts` backend address from the environment variable
  - `http.ts` functions for requests to the backend
  - `loc.ts` distance calculation and sorting of places
  - `types.ts` shared types
  - `vite-env.d.ts` Vite type declarations
  - `main.tsx` application entry point
  - `index.css` global styles
- `index.html` HTML template
- `tsconfig.json` TypeScript configuration
- `vite.config.js` Vite configuration

## Notes

This project is meant for learning, so the error handling is intentionally simple. The backend is part of the course material and has no database: data is stored in JSON files.

The free Render plan puts the backend to sleep after a period of inactivity, so the first request can take up to a minute. The file system there is also not persistent, so the saved collection can reset when the service restarts.
