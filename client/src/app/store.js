import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localStorage for web

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // specify which reducer to persist
};

// Combine reducers into a single reducer
const rootReducer = combineReducers({
  auth: authReducer, // You can add more slices if you have them
});

// Wrap the combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persistedReducer here
});

const persistor = persistStore(store);

export { store, persistor };
