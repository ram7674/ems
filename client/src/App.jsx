import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;