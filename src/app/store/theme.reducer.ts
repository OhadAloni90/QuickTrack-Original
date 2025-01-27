import { createReducer, on } from '@ngrx/store';
import { toggleDarkMode, setDarkMode } from './theme.actions';

// Define the initial state for the theme
export interface ThemeState {
  darkMode: boolean;
}

export const initialState: ThemeState = {
  darkMode: false
};

// Create the reducer function
export const themeReducer = createReducer(
  initialState,
  on(toggleDarkMode, state => ({ ...state, darkMode: !state.darkMode })),
  on(setDarkMode, (state, { darkMode }) => ({ ...state, darkMode }))
);
