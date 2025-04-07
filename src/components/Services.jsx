import React from 'react';
import AppointmentScheduler from './AppointmentScheduler';

function Services() {
  return (
    <div className="position-relative vh-100 overflow-hidden">
      {/* Fullscreen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-index-0"
      >
        <source src="Ferrari_2160_24fps.mp4" type="video/mp4" />
        A böngésződ nem támogatja a videót.
      </video>

      {/* Overlay content on top of video */}
      <div className="position-relative z-index-1 text-white p-5 bg-dark bg-opacity-50">
        <h1 className="display-4 mb-4 text-center">Szolgáltatásaink</h1>
        <p className="lead mb-5 text-center">
          Fedezze fel a MR Q Electronics által kínált professzionális szolgáltatásokat.
        </p>

        <div className="row g-4">
          {/* Left column – service descriptions */}
          <div className="col-md-6 text-start">
            <div className="card bg-dark text-white shadow-lg">
              <div className="card-body">
                <h3 className="fs-5 service-title">Alkatrészek</h3>
                <p>Verseny és hobbiautóhoz profi elektronikai termékek.</p>

                <h3 className="fs-5 service-title">Lézertisztítás</h3>
                <p>A hatékony felületisztításhoz.</p>
                <p>
                  Ez a precíz eljárás eltávolítja a rozsdát, szennyeződéseket és festéket, biztosítva az optimális tapadást a festék vagy más bevonatok számára.
                </p>

                <h3 className="fs-5 service-title">Egyedi árajánlat</h3>
                <p>Kérje egyedi árajánlatunkat.</p>
              </div>
            </div>
          </div>

          {/* Right column – appointment booking form */}
          <div className="col-md-6">
            <div className="container p-4 bg-dark bg-opacity-75 rounded-3 shadow-lg">
              <AppointmentScheduler />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
