import React from "react";
import { Link } from "react-router-dom";
function  Navbar({ cartCount = 0, query, setQuery }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(90deg,#06d6a0,#7b2cbf)" }}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/" onClick={(e)=>e.preventDefault()}>
          <div className="badge bg-white text-primary fw-bold">MT</div>
          <div className="text-white fw-bold">MAFETEX</div>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navToggle" aria-controls="navToggle" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navToggle">
          <form className="d-flex ms-3 w-100" onSubmit={(e)=>e.preventDefault()}>
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Buscar prendas, colores..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
          </form>

          <div className="d-flex align-items-center ms-auto gap-2">
            <button className="btn btn-outline-light position-relative" title="Carrito" onClick={() => window.alert('Carrito demo')}>
              👜
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{cartCount}</span>
            </button>
            <Link
              to="/login"
              className="btn btn-light d-flex align-items-center px-2 py-1"
              style={{
                fontSize: "0.92rem",
                fontWeight: 500,
                borderRadius: "1rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                lineHeight: 1,
                minHeight: "32px"
              }}
            >
              <span className="me-1" style={{ fontSize: "1.1em", lineHeight: 1 }}>🔑</span>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;