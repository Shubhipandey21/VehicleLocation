import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import carIcon from './carIcon.png';

const App = () => {
  const [vehiclePosition, setVehiclePosition] = useState([19.0760, 72.8777]); // Initial position (Mumbai)
  const [route, setRoute] = useState([[19.0760, 72.8777]]);

  const vehicleIcon = new L.Icon({
    iconUrl: carIcon, 
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    const fetchVehiclePosition = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/location');
        const newPos = [response.data.latitude, response.data.longitude];
        setVehiclePosition(newPos);
        setRoute(prevRoute => [...prevRoute, newPos]);
      } catch (error) {
        console.error('Error fetching vehicle position:', error);
      }
    };

    const interval = setInterval(fetchVehiclePosition, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MapContainer center={vehiclePosition} zoom={5} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline positions={route} color="blue" />
        <Marker position={vehiclePosition} icon={vehicleIcon} />
      </MapContainer>
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <h3>Current Vehicle Position: {vehiclePosition.join(', ')}</h3>
      </div>
    </div>
  );
};

export default App;
