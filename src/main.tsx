import { createRoot } from 'react-dom/client';

import { Root } from './Root';

import './index.scss';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
  <Root />
</ThemeProvider>
);