import React, { useState, useEffect } from 'react';

function GetRandomProducts({ products }) {
  // Véletlenszerű termékek kiválasztása
  const getRandomProducts = (products, numberOfProducts = 3) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Random sorrend
    return shuffled.slice(0, numberOfProducts); // Válaszd ki az első X terméket
  };

  const randomProducts = getRandomProducts(products, 3); // 3 véletlenszerű terméket

  return (
    <div className="container py-4">
      {/* TERMÉKLISTA */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {randomProducts.length > 0 ? (
          randomProducts.map((p) => (
            <div className="col" key={p.id}>
              <div className="card shadow-sm">
                <img
                  className="img-products card-img-top"
                  src={p.picture || 'default-image.jpg'} // Alapértelmezett kép, ha nincs
                  alt={p.name}
                  onError={(e) => e.target.src = 'default-image.jpg'} // Hiba esetén alapértelmezett kép
                />
                <div className="card-body">
                  <p className="card-text">
                    {p.name} - {p.price} Ft
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">Nincsenek elérhető termékek</p>
        )}
      </div>
    </div>
  );
}

export default GetRandomProducts;
