import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ThemeState } from './theme.state';

// Create a feature selector for the theme state
export const selectThemeState = createFeatureSelector<ThemeState>('theme');

// Create a selector for the darkMode property
export const selectDarkMode = createSelector(
  selectThemeState,
  (state: ThemeState) => state.darkMode
);