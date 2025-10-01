import { createRoot } from 'react-dom/client'

export const run = () => {
  window.reactRootElement = createRoot(document.getElementById('root'));
}