import React, { useState, useEffect } from 'react';
import GetRandomProducts from './RandomProducts';

function Home() {
  const [products, setProducts] = useState([]);

  // Termékek lekérése az API-ból
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://localhost:7012/api/Products');
        const data = await response.json();
        
        // Ellenőrizzük, hogy a válasz tartalmazza-e a termékek listáját és biztosítjuk, hogy egy tömböt kapjunk
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('A válasz nem tartalmaz termékeket, vagy hibás formátumban van!');
        }
      } catch (error) {
        console.error('Hiba történt a termékek lekérése során:', error);
      }
    })();
  }, []);

  return (
    <div style={styles.wrapper}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={styles.videoBackground}
      >
        <source
          src="/Tachometer_1920_1080_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
  
      <div style={styles.overlay}>
        <h1 style={styles.title}>Üdvözöljük a MR Q Electronics-nál!</h1>
        <p>Fedezze fel legújabb termékeinket és szolgáltatásainkat.</p>
        <div style={styles.title} className="col-md-6">
          <h3>Miért válasszon minket?</h3>
          <ul>
            <li>Professzionális alkatrészek</li>
            <li>Versenyautókra szabott kinézet</li>
            <li>Gyors és megbízható szállítás</li>
          </ul>
        </div>
        <GetRandomProducts products={products} />
      </div>
    </div>
  );
}

// Stílusok
const styles = {
  wrapper: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  overlay: {
    position: "relative",
    zIndex: 1,
    color: "#fff",
    textAlign: "center",
    padding: "50px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // sötét átlátszó háttér
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
};

export default Home;