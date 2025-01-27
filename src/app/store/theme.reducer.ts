import { createReducer, on } from '@ngrx/store';
import { toggleDarkMode, setDarkMode } from './theme.actions';
import { ThemeState } from './theme.state';

export const initialState: ThemeState = {
  darkMode: false
};

// Create the reducer function
export const themeReducer = createReducer(
  initialState,
  on(toggleDarkMode, state => ({ ...state, darkMode: !state.darkMode })),
  on(setDarkMode, (state, { darkMode }) => ({ ...state, darkMode }))
);