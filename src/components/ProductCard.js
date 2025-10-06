import React, { useState } from "react";
 function ProductCard({ producto, onAdd, onView }) {
  const [hover, setHover] = useState(false);
  const cardStyle = {
    transform: hover ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
    transition: "transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms ease",
    boxShadow: hover ? "0 26px 60px rgba(0,0,0,0.18)" : "0 8px 20px rgba(0,0,0,0.08)",
    borderRadius: 12,
    overflow: "hidden",
  };

  return (
    <div className="card h-100 border-0" style={cardStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ overflow: "hidden" }}>
        <img
          src={producto.images[0]}
          alt={producto.nombre}
          className="img-fluid w-100"
          style={{ height: 220, objectFit: "cover", display: "block", transition: "transform 450ms ease", transform: hover ? "scale(1.06)" : "scale(1)" }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Imagen"; }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{producto.nombre}</h5>
        <p className="text-muted small mb-2">{producto.descripcion}</p>

        <div className="d-flex justify-content-between align-items-end mt-auto">
          <div>
            <div className="fw-bold text-danger">${producto.precio}</div>
            <div className="small text-muted">En stock</div>
          </div>

          <div className="btn-group">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => onView(producto)}>Ver</button>
            <button className="btn btn-sm btn-warning text-white fw-bold" onClick={() => onAdd(producto)}>Añadir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;