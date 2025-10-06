import React from "react";

 function Footer() {
  return (
    <footer className="py-4" style={{ background: "linear-gradient(90deg,#7b2cbf,#06d6a0)" }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-white">
        <div className="mb-2 mb-md-0"><strong>MAFETEX</strong> — Diseño textil artesanal © 2025</div>
        <div className="small">
          <button type="button" className="btn btn-link text-white me-3 p-0" style={{textDecoration:'underline'}} onClick={()=>{}}>Términos</button>
          <button type="button" className="btn btn-link text-white p-0" style={{textDecoration:'underline'}} onClick={()=>{}}>Contacto</button>
        </div>
      </div>
    </footer>
  );
}
export default Footer;