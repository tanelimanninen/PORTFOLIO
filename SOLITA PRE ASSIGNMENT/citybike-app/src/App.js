import './App.css';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import React from "react";

function App() {

  const position = [62, 26]
  const zoom = 5

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="App">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <Marker position={position}>
      <Popup>Popup text for testing.</Popup>
    </Marker>
    
  </MapContainer> 
  );
}

export default App;
