import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testing1 = () => {
  const [propertyData, setPropertyData] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://infanttravels.com/goolok/property');
         setPropertyData(response.data);  
      } catch (error) {
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {propertyData.map((item, index) => (
        <div key={index}>
          <h1>{item.id}</h1>
          <p>{item.status}</p>
          <p>{item.type}</p>
          <p>{item.createdat}</p> 
          <p>{item.updatedat}</p> 
        </div>
      ))}
    </div>
  );
};

export default Testing1;
