import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function BookedAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch appointment data from the backend API
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

  // Display loading state
  if (loading) {
    return <p>Betöltés...</p>;
  }

  // Display error message if data fetch fails
  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  // Handle appointment deletion by ID
  const handleDeleteAppointment = async (id) => {
    try {
      const response = await fetch(`https://localhost:7012/api/Appointment/appointments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove deleted appointment from the list
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

      {/* Show message if there are no appointments */}
      {appointments.length === 0 ? (
        <p className="text-white">Nincs foglalt időpont.</p>
      ) : (
        <ul className="list-group">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white mb-2 rounded"
            >
              {/* Appointment info */}
              <div>
                <strong>{appointment.name}</strong> ({appointment.email}) –{" "}
                {format(new Date(appointment.date), "yyyy.MM.dd HH:mm")}
              </div>

              {/* Delete button */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteAppointment(appointment.id)}
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
