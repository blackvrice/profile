// main.tsx (또는 App 루트)
import { createRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
