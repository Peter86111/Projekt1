import React from 'react';

function Services() {
    return (
        <div className="bg-dark">
            <h1>Szolgáltatásaink</h1>
            <p>Fedezze fel a MR Q Electronics által kínált professzionális szolgáltatásokat.</p>

            <div className="row">
                <div className="col-md-6">
                    <h3>Alkatrészek</h3>
                    <p>Verseny és hobbiautóhoz profi elektronikai alkatrészek.</p>
                </div>

                <div className="col-md-6">
                    <h3>Lézertisztítás</h3>
                    <p>A hatékony felületisztításhoz.</p>
                </div>

                <div className="col-md-6">
                    <h3>📦 Egyedi árajánlat</h3>
                    <p>Kérje egyedi árajánlatunkat.</p>
                </div>
            </div>
        </div>
    );
}

export default Services;
