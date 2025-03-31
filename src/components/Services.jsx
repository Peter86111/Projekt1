import React from 'react';

function Services() {
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
              src="Ferrari_2160_24fps.mp4"
              type="video/mp4"
            />
            A böngésződ nem támogatja a videót.
          </video>
      
          <div style={styles.overlay}>
            <h1 style={styles.title}>Szolgáltatásaink</h1>
            <p>Fedezze fel a MR Q Electronics által kínált professzionális szolgáltatásokat.</p>
      
            <div className="row" style={styles.serviceBox}>
              <div className="col-md-6">
                <h3 style={styles.title}>🔩 Alkatrészek</h3>
                <p>Verseny és hobbiautóhoz profi elektronikai alkatrészek.</p>
              </div>
      
              <div className="col-md-6">
                <h3 style={styles.title}>🔬 Lézertisztítás</h3>
                <p>A hatékony felületisztításhoz.</p>
              </div>
      
              <div className="col-md-6">
                <h3 style={styles.title}>📦 Egyedi árajánlat</h3>
                <p>Kérje egyedi árajánlatunkat.</p>
              </div>
            </div>
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
      height: "100%",
      width: "100%",
      padding: "60px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "#fff",
      textAlign: "center",
    },
    title: {
      fontSize: "26px",
      marginBottom: "20px",
    },
    serviceBox: {
      marginTop: "30px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
    },
  };

export default Services;
