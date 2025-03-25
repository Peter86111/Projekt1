import React, { useState, useEffect } from 'react';
import GetRandomProducts from './RandomProducts';

function Home() {
  const [products, setProducts] = useState([]);

  // Termékek lekérése az API-ból
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://localhost:7012/products');
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
    <div className="bg-dark text-white">
      <h1>Üdvözöljük a MR Q Electronics-nál!</h1>
      <p>Fedezze fel legújabb termékeinket és szolgáltatásainkat.</p>
      <div className="col-md-6">
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

export default Home;

    