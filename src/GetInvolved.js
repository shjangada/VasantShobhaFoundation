import React, { useState, useEffect } from 'react';
import './supporting/style/GetInvolved.css';
import './supporting/style/OpenLayersMap.css';
import './supporting/style/SearchableClassList.css';
import NavBar from './NavBar';
import OpenLayersMap from './supporting/OpenLayersMap';
import Papa from 'papaparse';
import classesCsv from './csv/Classes.csv';
import Footer from './Footer';
import ContactUs from './supporting/ContactBox';

const geocode = async (location) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=9758420f33a142a48171e709ad0cab96`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry;
    return [lng, lat];
  }
  return [78, 20];
};

const haversineDistance = ([lon1, lat1], [lon2, lat2]) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const GetInvolved = () => {
  const [zipCode, setZipCode] = useState('');
  const [classType, setClassType] = useState('youth');
  const [radius, setRadius] = useState('');
  const [allClasses, setAllClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      const response = await fetch(classesCsv);
      const csvText = await response.text();
      const data = Papa.parse(csvText, { header: true }).data;

      for (let cls of data) {
        cls.coordinates = await geocode(cls.Location);
      }

      setAllClasses(data);
    };

    loadClasses();
  }, []);

  const handleSearch = async () => {
    setSearchInitiated(true);
    const userLocation = await geocode(zipCode);
    const filtered = allClasses.filter((cls) => {
      const distance = haversineDistance(userLocation, cls.coordinates);
      return distance <= radius && (classType === 'all' || cls.AgeGroup === classType);
    });
    setFilteredClasses(filtered);
  };

  return (
    <>
      <NavBar greenBackground={true} />
      <div className="get-involved__body">
        <h2 className="get-involved__title">Contact</h2>
        <p className="get-involved__lead">
          Find nearby classes, explore our locations, and send us a message.
        </p>

        <section className="get-involved__section">
          <h3>Find Classes Near You</h3>
          <div className="search-form">
            <input
              type="text"
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <select value={classType} onChange={(e) => setClassType(e.target.value)}>
              <option value="all">All Ages</option>
              <option value="youth">Youth</option>
              <option value="adult">Adult</option>
            </select>
            <input
              type="number"
              placeholder="Radius in km"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <OpenLayersMap classes={searchInitiated ? filteredClasses : allClasses} />
        </section>

        <section className="get-involved__section get-involved__section--contact">
          <h3>Send a Message</h3>
          <ContactUs />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default GetInvolved;
