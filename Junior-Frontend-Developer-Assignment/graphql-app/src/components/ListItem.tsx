
import React, { useState } from 'react';

interface ListItemProps {
  country: any;
  selected: boolean;
  onSelect: () => void; 
}

const ListItem: React.FC<ListItemProps> = ({ country, selected, onSelect }) => {
  return (
    <div
      style={{
        margin: '5px',
        padding: '10px',
        border: '1px solid #3498db',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: selected ? '#3498db' : '#ecf0f1',
      }}
      onClick={onSelect} 
    >
      {country.name}
    </div>
  );
};

export default ListItem;


