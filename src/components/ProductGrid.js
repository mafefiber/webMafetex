import React from "react";
import ProductCard from "./ProductCard";

 function ProductGrid({ productos = [], onAdd, onView }) {
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Nuestra colección</h3>
        <div className="text-muted small">Mostrando {productos.length} resultados</div>
      </div>

      <div className="row g-4">
        {productos.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard producto={p} onAdd={onAdd} onView={onView} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductGrid;