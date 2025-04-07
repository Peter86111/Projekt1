import React from 'react';
import ImageCarousel from './ImageCarousel';

function Home() {
  return (
<div style={styles.wrapper}>
  <ImageCarousel />

  <div style={styles.overlay}>
    <h1 style={styles.title}>Üdvözöljük a MR Q Electronics-nál!</h1>
    <p>Fedezze fel termékeinket és szolgáltatásainkat.</p>

    <div className="container bg-opacity-75">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-12 bg-dark bg-opacity-75 text-white p-4 rounded shadow">
          <h3 className="mb-3">Miért válasszon minket?</h3>
          <ul className="mb-0">
            <li>Professzionális alkatrészek</li>
            <li>Versenyautókra szabott kinézet</li>
            <li>7 éve a motorsport szolgálatában</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

const styles = {
    wrapper: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
      paddingBottom: "80px",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "50px",
      color: "#fff",
    },
    title: {
      fontSize: "32px",
      marginBottom: "0",
    },
  };
  


export default Home;
