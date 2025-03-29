import React from 'react';

function AboutUs() {
  return (
    <div style={styles.container} className="bg-dark">
      <h1 style={styles.title}>Üdvözöljük a MR Q Electronics-nál!</h1>
      <p></p>
      <div className="col-md-6">
        <p>A célunk, hogy a legjobb minőségű elektronikai termékeket és szolgáltatásokat nyújtsuk, a
          versenyautók szerelmeseinek.  </p>
        <ul>
          <li>Egyedi tervezés</li>
          <li>Szakmai segítség és szolgáltatás</li>
          <li>Professzionális megjelenés</li>
        </ul>
        <h3 style={styles.title}>Kapcsolat</h3>
        <p>
          Ha bármilyen kérdése van, vagy további információt szeretne kapni, ne habozzon
          kapcsolatba lépni velünk! Itt találja elérhetőségeinket:
        </p>
        <ul>
          <li>Email:</li>
          <li>Telefon: +36 </li>
        </ul>
      </div>
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
    height: "50vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
};

export default AboutUs;