// MapComponent.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 28.704060,
  lng: 77.102493
};

const MapComponent = () => {
  const [path, setPath] = useState([]);
  const [position, setPosition] = useState(center);

  useEffect(() => {
    const fetchLocationData = async () => {
      const response = await axios.get('http://localhost:3001/api/location');
      setPath(response.data);
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < path.length) {
        setPosition({ lat: path[index].latitude, lng: path[index].longitude });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [path]);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
      >
        <Polyline
          path={path.map(loc => ({ lat: loc.latitude, lng: loc.longitude }))}
          options={{ strokeColor: '#FF0000', strokeWeight: 2 }}
        />
        <Marker position={position} icon="carIcon.png" />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
