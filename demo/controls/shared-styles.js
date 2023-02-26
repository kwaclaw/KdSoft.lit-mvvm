import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';
// since tailwind classes are generated only as used, we cannot import them
// from a prebuilt library, but need to generate the ones we use locally (npm run build)
import tailwindStyles from './styles/tailwind-styles.js';
import checkboxStyles from './styles/kds-checkbox-styles.js';

export default [
  fontAwesomeStyles,
  tailwindStyles,
  checkboxStyles
];
