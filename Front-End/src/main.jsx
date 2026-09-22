import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './i18n'
import './index.css'

const originalFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => {
  const headers = new Headers(init.headers || {});
  const lang = localStorage.getItem("preferred-language") === "en" ? "en" : "ar";
  if (!headers.has("Accept-Language")) headers.set("Accept-Language", lang);
  if (!headers.has("X-Language")) headers.set("X-Language", lang);
  return originalFetch(input, { ...init, headers });
};

createRoot(document.getElementById("root")).render(<App />);
