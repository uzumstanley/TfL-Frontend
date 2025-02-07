import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getBusStops, searchBusStops } from "./api";
import "leaflet/dist/leaflet.css";

function App() {
  const [busStops, setBusStops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBusStops().then(setBusStops);
  }, []);

  const handleSearch = async () => {
    if (search.trim() === "") {
      getBusStops().then(setBusStops);
    } else {
      searchBusStops(search).then(setBusStops);
    }
  };

  return (
    <div className="container">
      <h1>🚌 TfL Bus Stop Tracker</h1>
      <input
        type="text"
        placeholder="Search by stop name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <MapContainer center={[51.5074, -0.1278]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {busStops.map((stop, index) => (
          <Marker key={index} position={[stop.Y, stop.X]}>
            <Popup>
              <strong>{stop.STOP_NAME}</strong><br />
              🚏 {stop.ROAD_NAME}<br />
              Routes: {stop.ROUTES}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
