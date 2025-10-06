import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroCarousel from "./components/HeroCarousel";
import ProductGrid from "./components/ProductGrid";
import Login from "./components/Login";

function AppRoutes({ alert, filtered, handleAdd, setModalProduct }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HeroCarousel slides={[
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
              "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80",
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
            ]} />
            <div className="container mt-3">
              {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">{alert.message}</div>}
            </div>
            <ProductGrid productos={filtered} onAdd={handleAdd} onView={setModalProduct} />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;