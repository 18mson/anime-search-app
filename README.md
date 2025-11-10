# Anime Search App

## Overview

Anime Search App is a React application built with TypeScript and Vite that allows users to search for anime, view details, and explore related information. The app uses the Jikan API to fetch anime data and Redux for state management.

## Features

### 1. Anime Search
- Search for anime by title using the Jikan API
- Debounced search input for better performance
- Pagination support for search results
- Loading states and error handling

### 2. Anime Details
- View detailed information about selected anime
- Display of anime cover image, title, synopsis, genres, and studios
- Loading states and error handling

### 3. UI Components
- **AnimeCard**: Displays anime information in a card format
- **EmptyState**: Shows different empty states for search and details
- **ErrorMessage**: Displays error messages with a dismiss option
- **Skeleton**: Loading skeletons for better UX during data fetching

### 4. State Management
- Redux Toolkit for state management
- Async thunks for handling API calls
- Proper error handling and loading states

### 5. Testing
- Unit tests for components using Vitest and React Testing Library
- Mock API calls for testing

## Technical Stack

### Core Technologies
- React 19 with TypeScript
- Vite for fast development and building
- Redux Toolkit for state management
- Axios for API calls
- Tailwind CSS for styling

### Development Tools
- ESLint for code linting
- Vitest for testing
- React Testing Library for component testing

### APIs
- Jikan API for anime data

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AnimeCard.tsx   # Anime card component
│   ├── EmptyState.tsx  # Empty state component
│   ├── ErrorMessage.tsx # Error message component
│   └── Skeleton.tsx    # Loading skeleton components
│
├── hooks/             # Custom React hooks
│   ├── useAppDispatch.ts # Typed dispatch hook
│   └── useDebounce.ts   # Debounce hook
│
├── pages/             # Application pages
│   ├── DetailPage.tsx  # Anime detail page
│   └── SearchPage.tsx  # Anime search page
│
├── services/          # API services
│   └── jikanApi.ts     # Jikan API service
│
├── store/             # Redux store
│   ├── animeSlice.ts    # Anime slice with reducers
│   └── store.ts         # Redux store configuration
│
├── types/             # TypeScript types
│   └── anime.ts         # Anime-related types
│
├── App.css            # Global styles
├── App.tsx            # Main app component
├── index.css          # Global CSS
└── main.tsx           # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

### Building
Build the project for production:
```bash
npm run build
```

### Testing
Run tests:
```bash
npm run test
```

## Available Scripts

- `dev`: Start development server
- `build`: Build for production
- `lint`: Run ESLint
- `preview`: Preview production build
- `test`: Run tests
- `test:watch`: Run tests in watch mode
- `test:cover`: Run tests with coverage

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
