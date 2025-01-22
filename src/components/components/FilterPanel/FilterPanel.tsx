// src/components/filterpanel/filterpanel.tsx
import React from 'react';

interface FilterPanelProps {
  categories: string[];
  onFilter: (category: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categories, onFilter }) => {
  return (
    <div>
      <h3>Filter by Category</h3>
      {categories.map((category) => (
        <button key={category} onClick={() => onFilter(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
