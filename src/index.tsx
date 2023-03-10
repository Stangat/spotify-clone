import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./i18n"

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
