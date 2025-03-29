import React from 'react';

function Services() {
    return (
        <div style={styles.container} className="bg-dark">
            <h1 style={styles.title}>Szolgáltatásaink</h1>
            <p>Fedezze fel a MR Q Electronics által kínált professzionális szolgáltatásokat.</p>

            <div className="row">
                <div className="col-md-6">
                    <h3 style={styles.title}>Alkatrészek</h3>
                    <p>Verseny és hobbiautóhoz profi elektronikai alkatrészek.</p>
                </div>

                <div className="col-md-6">
                    <h3 style={styles.title}>Lézertisztítás</h3>
                    <p>A hatékony felületisztításhoz.</p>
                </div>

                <div className="col-md-6">
                    <h3 style={styles.title}>📦 Egyedi árajánlat</h3>
                    <p>Kérje egyedi árajánlatunkat.</p>
                </div>
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

export default Services;
