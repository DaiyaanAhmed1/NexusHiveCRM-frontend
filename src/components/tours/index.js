// Main Tour System Export
// This file serves as the entry point for all tour functionality

export { default as TourOverlay } from './TourOverlay';
export { default as TourStep } from './TourStep';
export { useTour, TourProvider } from './TourContext';
export { tourRegistry } from './data/tourRegistry';
export { getTourData } from './data/tourData';

// Tour system version and configuration
export const TOUR_SYSTEM_VERSION = '1.0.0';
export const TOUR_SYSTEM_CONFIG = {
  defaultDuration: 3000,
  animationSpeed: 300,
  zIndex: 9999,
  overlayOpacity: 0.5
}; 