import React from 'react';
import ImageCarousel from './ImageCarousel';

function Home() {
  return (
    <div style={styles.wrapper}>
      <ImageCarousel />

      <div style={styles.overlay}>
        <h1 style={styles.title}>Üdvözöljük a MR Q Electronics-nál!</h1>
        <p>Fedezze fel legújabb termékeinket és szolgáltatásainkat.</p>
        <div className="col-md-6">
          <h3>Miért válasszon minket?</h3>
          <ul>
            <li>Professzionális alkatrészek</li>
            <li>Versenyautókra szabott kinézet</li>
            <li>7 éve a motorsport szolgálatában</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100vh", // ez tartja a képernyő méretet
    overflow: "hidden",
  },
  overlay: {
    position: "relative",
    zIndex: 1,
    padding: "50px",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%", // 100vh nincs itt, így nem csúszik ki
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
};

export default Home;


