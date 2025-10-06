import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !pass) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError(null);
    // Simula login exitoso
    if (onLogin) onLogin(email);
    else alert("¡Bienvenido/a " + email + "!");
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: 370, width: "100%", borderRadius: 18, background: "rgba(255,255,255,0.95)" }}>
        <div className="text-center mb-4">
          <div style={{
            width: 64, height: 64, margin: "0 auto 10px", borderRadius: "50%",
            background: "linear-gradient(135deg, #a770ef 0%, #f64f59 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#fff", fontWeight: 700, boxShadow: "0 4px 24px #a770ef33"
          }}>
            <span>🧶</span>
          </div>
          <h2 className="fw-bold mb-1" style={{ color: "#a770ef" }}>Bienvenido/a</h2>
          <div className="text-muted" style={{ fontSize: 15 }}>Inicia sesión en <b>MAFETEX</b></div>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                placeholder="Tu contraseña"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                tabIndex={-1}
                onClick={() => setShowPass(s => !s)}
                aria-label="Mostrar/Ocultar contraseña"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-primary w-100 fw-bold mt-2" style={{ background: "linear-gradient(90deg,#a770ef,#f64f59)", border: "none" }}>
             <Link to="/login" className="btn btn-light text-dark fw-bold">Iniciar sesión</Link>
          </button>
        </form>
        <div className="text-center mt-3 small">
          ¿No tienes cuenta? <a href="#" style={{ color: "#a770ef", textDecoration: "underline" }}>Regístrate</a>
        </div>
      </div>
    </div>
  );
}