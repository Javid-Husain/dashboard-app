import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import dashboardReducer from './dashboardSlice'; // Your dashboard slice

// Persist configuration for dashboard slice
const persistConfig = {
  key: 'dashboard',
  storage,
};

// Persisted reducer
const persistedDashboardReducer = persistReducer(persistConfig, dashboardReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: {
    dashboard: persistedDashboardReducer,
  },
});

// Create persistor for the store
export const persistor = persistStore(store);
