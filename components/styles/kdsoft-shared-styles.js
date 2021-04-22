import { html } from 'lit';
import styleLinks from './kdsoft-style-links.js';

export default html`
  <link rel="stylesheet" type="text/css" href=${styleLinks.tailwind} />
  <link rel="stylesheet" type="text/css" href=${styleLinks.fontawesome} />
`;
