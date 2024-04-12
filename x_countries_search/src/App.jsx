// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetch all countries upon component mount
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); // Initialize filteredCountries with all countries
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter countries based on search term
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <header className="fixed-header">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      {searchTerm && <hr />} {/* Conditionally render the <hr /> element */}
      <div className="flag-grid">
        {filteredCountries.map(country => (
          <div key={country.cca2} className="countryCard">
            <img
              className="flag-img"
              src={country.flags.png}
              alt={`${country.name.common} flag`}
            />
            <span className="country-name">{country.name.common}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
