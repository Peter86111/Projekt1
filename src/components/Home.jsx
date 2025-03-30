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
    <div style={styles.container} className="bg-dark">
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
  );
}

// Stílusok
const styles = {
  container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
  },
  title: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
  }, 
};

export default Home;    