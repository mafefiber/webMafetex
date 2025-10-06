import React, { useEffect, useRef, useState } from "react";
 function HeroCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, paused]);

  function startAuto() {
    stopAuto();
    if (paused || slides.length <= 1) return;
    intervalRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 3800);
  }
  function stopAuto() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  function go(i) {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }
  function prev() { go(index - 1); }
  function next() { go(index + 1); }

  // full-bleed wrapper to stretch edge-to-edge
  const fullBleedWrap = {
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    width: "100vw",
    overflow: "hidden",
    borderRadius: 12,
  };
  const height = 420;

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slides.length]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={fullBleedWrap} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div style={{ position: "relative", height }}>
          {slides.map((s, i) => (
            <img
              key={i}
              src={s}
              alt={`slide-${i + 1}`}
              className="img-fluid position-absolute top-0 start-0"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 700ms ease, filter 700ms ease",
                opacity: i === index ? 1 : 0,
                filter: i === index ? "brightness(1)" : "brightness(.78) contrast(.95)",
                zIndex: i === index ? 2 : 1,
              }}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/1400x600?text=Slide"; }}
            />
          ))}

          {/* Controls */}
          <button aria-label="Anterior" onClick={prev} className="btn btn-light"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.9, zIndex: 40, borderRadius: 999, width: 48, height: 48 }}>
            ‹
          </button>
          <button aria-label="Siguiente" onClick={next} className="btn btn-light"
            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.9, zIndex: 40, borderRadius: 999, width: 48, height: 48 }}>
            ›
          </button>

          {/* Indicators */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 14, zIndex: 40, display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Ir a slide ${i + 1}`}
                style={{
                  width: 12, height: 12, borderRadius: 999, border: "none",
                  background: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                  boxShadow: i === index ? "0 6px 18px rgba(0,0,0,0.25)" : "none",
                  cursor: "pointer", padding: 0,
                }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeroCarousel;