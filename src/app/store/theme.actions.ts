import { createAction, props } from '@ngrx/store';

// Action to toggle dark mode
export const toggleDarkMode = createAction(
  '[Theme] Toggle Dark Mode'
);

// Action to set dark mode state based on user settings
export const setDarkMode = createAction(
  '[Theme] Set Dark Mode',
  props<{ darkMode: boolean }>()
);
