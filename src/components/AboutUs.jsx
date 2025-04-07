import React from 'react';

function AboutUs() {
  return (
    <div style={styles.wrapper}>
      {/* Background video element */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={styles.videoBackground}
      >
        <source
          src="City_3840_2160_30fps.mp4"
          type="video/mp4"
        />
        A böngésződ nem támogatja a videót.
      </video>
  
      {/* Content overlay displayed over the video */}
      <div style={styles.overlay}>
        <h1 style={styles.title}>Üdvözöljük a MR Q Electronics-nál!</h1>
        <div className="col-md-6">
          <p>
            A célunk, hogy a legjobb minőségű elektronikai termékeket és szolgáltatásokat nyújtsuk,
            a versenyautók szerelmeseinek.
          </p>
          <ul>
            <li>Egyedi tervezés</li>
            <li>Szakmai segítség és szolgáltatás</li>
            <li>Professzionális megjelenés</li>
          </ul>
          <h3 style={styles.title}>Kapcsolat</h3>
          <p>
            Ha bármilyen kérdése van, vagy további információt szeretne kapni, ne habozzon kapcsolatba lépni velünk!
            Itt találja elérhetőségeinket:
          </p>
          <ul>
            <li>Email: info@mrq-electronics.hu</li>
            <li>Telefon: +36 30 123 4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Component styles using inline CSS-in-JS syntax
const styles = {
  wrapper: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden", // Prevent scrollbars
  },
  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
    objectFit: "cover", // Cover the full screen
    zIndex: 0, // Send behind overlay
  },
  overlay: {
    position: "relative",
    zIndex: 1, // Above the video
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    color: "#fff",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
};

export default AboutUs;
