import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

import productosData from "./data/productos";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import AppRoutes from './AppRoutes';


 function App() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(productosData);
  const [modalProduct, setModalProduct] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(null), 2000);
    return () => clearTimeout(t);
  }, [alert]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(productosData.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)));
  }, [query]);

  function handleAdd(p) {
    setCart(c => [...c, p]);
    setAlert({ type: "success", message: `${p.nombre} añadido` });
  }

  return (
  
      <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        .container, .card { background-clip: padding-box; }
      `}</style>
      <NavBar cartCount={cart.length} query={query} setQuery={setQuery} />
      <AppRoutes
        alert={alert}
        filtered={filtered}
        handleAdd={handleAdd}
        setModalProduct={setModalProduct}
      />
      <Footer />
      <ProductModal producto={modalProduct} onClose={() => setModalProduct(null)} onAdd={handleAdd} />
    </div>
  );

}
export default App;