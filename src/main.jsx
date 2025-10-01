import { run as initializeReactRoot } from './config/initializers/reactRoot';
import { run as initializeUI } from './config/initializers/ui';
// import { run as initializeSession } from './config/initializers/session';
import { run as initializeImages } from './config/initializers/images';

import './application/stylesheets/index.css';

const main = async () => {
  await initializeImages();
  initializeReactRoot();
  // await initializeSession();
  initializeUI();
}

main();
