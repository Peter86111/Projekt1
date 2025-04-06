import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function BookedAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Az API hívás a foglalt időpontok lekérésére
  useEffect(() => {
    fetch("https://localhost:7012/api/Appointment/appointments")
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Hiba történt a foglalások lekérése közben.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Betöltés...</p>;
  }

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  // Törlés gomb művelet
  const handleDeleteAppointment = async (id) => {
    try {
      const response = await fetch(`https://localhost:7012/api/Appointment/appointments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Törlés sikeresen végrehajtva, frissíteni kell az időpontok listáját
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Hiba történt a törlés során.");
        console.error("Hiba történt a törlés során:", errorData);
      }
    } catch (error) {
      setErrorMessage("Hiba a kérés közben.");
      console.error("Hiba a kérés közben:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-white">Foglalt időpontok</h3>
      {appointments.length === 0 ? (
        <p className="text-white">Nincs foglalt időpont.</p>
      ) : (
        <ul className="list-group">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white mb-2 rounded">
              <div>
                <strong>{appointment.name}</strong> ({appointment.email}) –{" "}
                {format(new Date(appointment.date), "yyyy.MM.dd HH:mm")}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteAppointment(appointment.id)} // Javítva, helyes objektum használat
              >
                Törlés
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

