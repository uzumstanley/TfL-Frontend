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
      console.log(`Searching for: ${search}`); // Debugging
      const results = await searchBusStops(search);
      console.log("Search Results:", results); // Debugging
      setBusStops(results);
    }
  };

  return (
    <div className="container">
      <h1>🚌 TfL Bus Stop Tracker</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter bus stop name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">🔍 Search</button>
      </div>

      <MapContainer
  center={[51.5074, -0.1278]}
  zoom={12}
  style={{ height: "500px", width: "100%" }}
  scrollWheelZoom={true} // Allows scrolling to zoom in/out
  dragging={true} // Allows dragging the map
  doubleClickZoom={true} // Allows zooming by double-click
>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
