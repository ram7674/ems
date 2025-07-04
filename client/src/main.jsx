import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthContext from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom'; // ✅ import BrowserRouter

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* ✅ wrap everything in BrowserRouter */}
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>
);
