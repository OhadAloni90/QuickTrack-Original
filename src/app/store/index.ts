// src/app/store/index.ts

// Importing necessary store-related modules
import { ActionReducerMap } from '@ngrx/store';
import { themeReducer } from './theme.reducer';
import { ThemeState } from './theme.state';

// Define the overall application state
export interface AppState {
  theme: ThemeState;
}

// Combine all reducers into a single reducer map
export const reducers: ActionReducerMap<AppState> = {
  theme: themeReducer,
};

// Exporting the store-related modules
export * from './theme.actions';
export * from './theme.reducer';
export * from './theme.state';
