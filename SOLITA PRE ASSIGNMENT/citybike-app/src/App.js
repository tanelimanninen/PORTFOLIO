import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from "react";

function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  async function fetchStations() {
    try {
      const response = await fetch('/stations');
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  }

  const position = [60.1685348, 24.9304942]
  const zoom = 14

  return (
    <div className='App'>
      <div className='MapOverlay'>
        <h2>City Bike App</h2>
        <p>This application shows <br/> the locations of the public <br/> citybike stations in the <br/> Helsinki / Espoo area.</p>
        <p>Made by: Taneli Manninen</p>
      </div>

      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="MapContainer">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations.map((station) => (
          <Marker
            key={station._id}
            position={[station.y, station.x]}
            title={station.Nimi}
          >
            <Popup>
              {station.Nimi}/{station.Namn}<br/>
              {station.Osoite}/{station.Adress}<br/>
              Capacity: {station.Kapasiteet}
            </Popup>
          </Marker>
        ))}
      
    </MapContainer> 
  </div>
  );
}

export default App;
