import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Már lefoglalt időpontok lekérése az API-ról
  useEffect(() => {
    setLoading(true);
    fetch("https://localhost:7012/api/Appointment/appointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hiba történt a foglalások lekérése közben.");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.message);
        console.error("Error fetching appointments:", error);
      });
  }, []);

  // Időpontok hozzáadása a backendhez
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      email,
      date: date ? date.toISOString() : null,
    };

    try {
      const response = await fetch("https://localhost:7012/api/Appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments([...appointments, data]);
        setConfirmed(true);
        setName("");
        setEmail("");
        setDate(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Hiba történt a foglalás során.");
        console.error("Hiba történt:", errorData);
      }
    } catch (error) {
      setErrorMessage("Hiba a kérés közben.");
      console.error("Hiba a kérés közben:", error);
    }
  };
  return (
    <div className="container mt-5 bg-dark">
      <h3 className="mb-4"> Időpontfoglalás lézertisztításra</h3>

      <form onSubmit={handleAppointmentSubmit} className="bg-dark p-4 rounded shadow">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Név"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
             placeholder="Email"
          />
        </div>

        <div className="mb-3">
  <label className="form-label">Válassz időpontot:</label>
  <DatePicker
    selected={date}
    onChange={(date) => setDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={60} // Óránkénti időpontok
    dateFormat="yyyy-MM-dd HH:mm"
    placeholderText="Kattints a kiválasztáshoz"
    className="form-control  text-dark"  // Bootstrap osztályok a sötét háttérhez és világos számokhoz
    minDate={new Date()}
    timeCaption="Időpont"
    // Csak 9-17 óráig enged választani
    filterTime={(time) => {
      const hours = time.getHours();
      return hours >= 9 && hours <= 17;
    }}
  />
</div>
        <button type="submit" className="add-to-cart" disabled={loading}>
          {loading ? "Betöltés..." : "Foglalás"}
        </button>
      </form>

      {confirmed && (
        <div className="alert alert-success mt-4">
          <strong>Sikeres foglalás!</strong> 
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger mt-4">
          <strong>Hiba:</strong> {errorMessage}
        </div>
      )}

      
    
    </div>
  );
};

export default AppointmentScheduler;