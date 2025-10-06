import React from "react";

 function Footer() {
  return (
    <footer className="py-4" style={{ background: "linear-gradient(90deg,#7b2cbf,#06d6a0)" }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-white">
        <div className="mb-2 mb-md-0"><strong>MAFETEX</strong> — Diseño textil artesanal © 2025</div>
        <div className="small">
          <a className="text-white me-3" href="#" onClick={(e)=>e.preventDefault()}>Términos</a>
          <a className="text-white" href="#" onClick={(e)=>e.preventDefault()}>Contacto</a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;