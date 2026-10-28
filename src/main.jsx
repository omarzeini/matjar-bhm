import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "goey-toast/styles.css";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home-page.jsx";
import ProductPage from "./pages/product-page.jsx";
import Login from "./pages/Admin/login.jsx";
import Dashboard from "./pages/Admin/dashboard.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import CompanyPage from "./pages/company.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/product/:slugAndId" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
