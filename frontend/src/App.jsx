import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
}

export default function App() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    ph: "",
    month: "",
  });
  const [location, setLocation] = useState({ lat: 26.8467, lon: 80.9462 }); // Default: Lucknow
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        latitude: location.lat,
        longitude: location.lon,
      };
      const res = await axios.post("http://localhost:5000/predict", dataToSend);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const icons = {
    Nitrogen: "🧪",
    Phosphorus: "🌱",
    Potassium: "💧",
    "PH level of soil": "⚗️",
    Month: "📅",
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-success bg-gradient">
      <form
        onSubmit={handleSubmit}
        className="card shadow-lg p-4 w-100"
        style={{ maxWidth: 450, borderRadius: "1.5rem" }}
      >
        <div className="card-body">
          <h1 className="card-title text-center mb-3 text-success fw-bold fs-2">
            🌾 Crop Recommendation
          </h1>
          <p className="text-center text-secondary mb-4">
            Enter soil nutrients and pH to get the best crop for your location.
          </p>
          {[
            { label: "Ratio of Nitrogen content in soil", name: "N" },
            { label: "Ratio of Phosphorus content in soil ", name: "P" },
            { label: "Ratio of Potassium content in soil ", name: "K"},
            { label: "PH level of soil", name: "ph"},
            { label: "Month", name: "month"},
          ].map(({ label, name, icon }) => (
            <div key={name} className="mb-3 position-relative">
              {name === "month" ? (
                <select
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="form-select ps-5"
                  required
                >
                  <option value="">Select Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name={name}
                  placeholder={label}
                  value={formData[name]}
                  onChange={handleChange}
                  className="form-control ps-5"
                  required
                />
              )}
            </div>
          ))}
          <div className="mb-3">
            <h2 className="fs-6 text-secondary mb-2">
              📍 Select Location on Map
            </h2>
            <div
              className="rounded overflow-hidden border border-success mb-2"
              style={{ height: "240px" }}
            >
              <MapContainer
                center={[location.lat, location.lon]}
                zoom={6}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                <LocationPicker setLocation={setLocation} />
                <Marker position={[location.lat, location.lon]} />
              </MapContainer>
            </div>
          </div>
          <div className="text-center text-secondary mb-3">
            <span className="me-1">📌</span>
            Selected Location:{" "}
            <span className="fw-semibold text-success">
              {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
            </span>
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold py-2">
            🚀 Predict Crop
          </button>
          {result && (
            <div className="mt-4 card bg-light border-success shadow-sm">
              <div className="card-body text-center">
                <p className="fs-5 fw-semibold text-success mb-1">
                  Recommended Crop:
                </p>
                <p className="fs-3 fw-bold text-success">{result.crop}</p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
