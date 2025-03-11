
export const countElements = (geoJson) => {
    const counts = {};
    
    if (!geoJson || !geoJson.features) return counts;
    
    geoJson.features.forEach(feature => {
      const type = feature.geometry.type;
      counts[type] = (counts[type] || 0) + 1;
    });
    
    return counts;
  };

  export const calculateElementDetails = (geoJson) => {
    const details = [];
    
    if (!geoJson || !geoJson.features) return details;
    
    geoJson.features.forEach((feature, index) => {
      const type = feature.geometry.type;
      
      let length = 0;
      if (type === 'LineString') {
        length = calculateLineStringLength(feature.geometry.coordinates);
      } else if (type === 'MultiLineString') {
        feature.geometry.coordinates.forEach(line => {
          length += calculateLineStringLength(line);
        });
      }
      
      const name = feature.properties?.name || `Feature ${index + 1}`;
      
      details.push({
        id: index,
        name,
        type,
        length: length.toFixed(2)
      });
    });
    
    return details;
  };
  

  export const calculateLineStringLength = (coordinates) => {
    let length = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const [lon1, lat1] = coordinates[i];
      const [lon2, lat2] = coordinates[i+1];
      length += calculateDistance(lat1, lon1, lat2, lon2);
    }
    return length;
  };

  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };