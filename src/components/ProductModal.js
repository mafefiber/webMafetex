import React, { useEffect, useRef, useState } from "react";

 function ProductModal({ producto, onClose, onAdd }) {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [lens, setLens] = useState({ visible: false, x: 0, y: 0 });
  const [magnifierEnabled, setMagnifierEnabled] = useState(true);
  const imgRef = useRef(null);
  const zoom = 2.6;
  const lensSize = 180;

  useEffect(() => {
    setIdx(0);
    setShow(true);
    setLens({ visible: false, x: 0, y: 0 });
    return () => setShow(false);
  }, [producto]);

  if (!producto) return null;

  function handleMouseMove(e) {
    if (!magnifierEnabled || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = Math.max(0, Math.min(rect.width, x));
    const cy = Math.max(0, Math.min(rect.height, y));
    setLens({ visible: true, x: cx, y: cy });
  }
  function handleMouseLeave() {
    setLens({ visible: false, x: 0, y: 0 });
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1070, background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55))", backdropFilter: "blur(3px)", transition: "opacity 300ms ease" }}
      onClick={() => { setShow(false); setTimeout(onClose, 260); }} role="dialog" aria-modal="true"
    >
      <div className="bg-white rounded shadow-lg" onClick={(e) => e.stopPropagation()} style={{ width: "min(980px, 96%)", maxHeight: "92vh", overflow: "auto", transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(.98)", opacity: show ? 1 : 0, transition: "transform 260ms cubic-bezier(.2,.9,.2,1), opacity 260ms ease", borderRadius: 14 }}>
        <div className="p-3 border-bottom d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-0">{producto.nombre}</h5>
            <div className="small text-muted">${producto.precio} • Hecho a mano</div>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <button className={"btn btn-sm " + (magnifierEnabled ? "btn-warning" : "btn-outline-secondary")} onClick={() => setMagnifierEnabled(s => !s)}>
              {magnifierEnabled ? "Lupa ON" : "Lupa OFF"}
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { setShow(false); setTimeout(onClose, 260); }}>Cerrar</button>
          </div>
        </div>

        <div className="p-3">
          <div className="d-flex gap-3 flex-column flex-md-row">
            <div style={{ flex: "0 0 55%", minWidth: 240 }}>
              <div className="position-relative" style={{ borderRadius: 10, overflow: "hidden" }}>
                <img ref={imgRef} src={producto.images[idx]} alt="" className="img-fluid w-100" style={{ height: 460, objectFit: "cover", display: "block", transition: "transform 320ms ease" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onError={(e)=>{ e.target.onerror=null; e.target.src = "https://via.placeholder.com/900x600?text=Imagen"; }} />

                {magnifierEnabled && lens.visible && (
                  <div aria-hidden="true" style={{
                    position: "absolute",
                    left: Math.max(0, lens.x - lensSize / 2),
                    top: Math.max(0, lens.y - lensSize / 2),
                    width: lensSize,
                    height: lensSize,
                    borderRadius: "50%",
                    backgroundImage: `url("${producto.images[idx]}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${(imgRef.current ? imgRef.current.getBoundingClientRect().width : 900) * zoom}px ${(imgRef.current ? imgRef.current.getBoundingClientRect().height : 600) * zoom}px`,
                    backgroundPositionX: `${-((lens.x * zoom) - lensSize / 2)}px`,
                    backgroundPositionY: `${-((lens.y * zoom) - lensSize / 2)}px`,
                    border: "4px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
                    pointerEvents: "none",
                    transition: "left 40ms linear, top 40ms linear",
                    zIndex: 22,
                  }} />
                )}

                <div className="position-absolute top-50 start-0 translate-middle-y d-flex" style={{ left: 8 }}>
                  <button className="btn btn-sm btn-light" onClick={() => setIdx((idx - 1 + producto.images.length) % producto.images.length)}>‹</button>
                </div>
                <div className="position-absolute top-50 end-0 translate-middle-y" style={{ right: 8 }}>
                  <button className="btn btn-sm btn-light" onClick={() => setIdx((idx + 1) % producto.images.length)}>›</button>
                </div>
              </div>

              <div className="d-flex gap-2 mt-2">
                {producto.images.map((im, i) => (
                  <button key={i} className="p-0 border-0" style={{ background: "transparent" }} onClick={() => setIdx(i)}>
                    <img src={im} alt={`thumb-${i}`} style={{ width: 86, height: 62, objectFit: "cover", borderRadius: 8, boxShadow: i === idx ? "0 10px 30px rgba(0,0,0,0.25)" : "none" }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-grow-1">
              <h6 className="text-warning fw-bold">${producto.precio}</h6>
              <p className="text-muted">{producto.descripcion}</p>

              <ul className="list-unstyled small text-muted">
                <li>• Material: Fibras naturales</li>
                <li>• Tallas: S / M / L (según producto)</li>
                <li>• Envío: 24-72 horas</li>
                <li>• Hecho a mano • Edición limitada</li>
              </ul>

              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-warning fw-bold" onClick={() => { onAdd(producto); setShow(false); setTimeout(onClose, 260); }}>Añadir al carrito</button>
                <button className="btn btn-outline-secondary" onClick={() => { setShow(false); setTimeout(onClose, 260); }}>Seguir comprando</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductModal;