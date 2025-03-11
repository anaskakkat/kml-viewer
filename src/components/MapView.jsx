import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ geoJsonData, fileName }) => {
  // Function to determine color based on feature type
  const getFeatureStyle = (feature) => {
    let color;
    switch (feature.geometry.type) {
      case 'Point':
        color = '#ff0000';
        break;
      case 'LineString':
        color = '#0000ff';
        break;
      case 'Polygon':
        color = '#00ff00';
        break;
      case 'MultiLineString':
        color = '#9900ff';
        break;
      default:
        color = '#000000';
    }
    return { color, weight: 3, opacity: 0.7 };
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Map View</h2>
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner border">
        {geoJsonData ? (
          <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON 
              data={geoJsonData} 
              style={getFeatureStyle}
            />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>{fileName ? "Processing map data..." : "Upload a KML file to view the map"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;