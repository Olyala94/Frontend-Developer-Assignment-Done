import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ListItem from './ListItem';

import { COUNTRIES_QUERY } from '../apollo/queries';

const GraphQLComponent: React.FC = () => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);
  const [filterText, setFilterText] = useState('');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!loading && data && data.countries.length > 0) {
      const itemCount = data.countries.length;
      const defaultSelectedIndex = Math.min(9, itemCount - 1);
      setSelectedItem(defaultSelectedIndex);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const countries = data.countries;

  const filteredCountries = countries.filter((country: any) =>
    country.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedItem(null);
  };

  const handleSelectItem = (index: number) => {
    setSelectedItem(index);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const visibleCountries = filteredCountries.slice(startIndex, endIndex);

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Filtrele..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ margin: '10px', padding: '5px', fontSize: '16px' }}
      />

      <div style={{ margin: '10px', padding: '10px', border: '1px solid #3498db', borderRadius: '5px' }}>
        {visibleCountries.map((country: any, index: number) => (
          <ListItem
            key={index}
            country={country}
            selected={index === selectedItem}
            onSelect={() => handleSelectItem(index)}
          />
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        {Array.from({ length: Math.ceil(filteredCountries.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '5px',
              padding: '8px 12px',
              backgroundColor: currentPage === index + 1 ? '#3498db' : '#95a5a6',
              color: '#ecf0f1',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GraphQLComponent;

