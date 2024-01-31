import React, { useEffect } from 'react';
import { ElementConfig, ElementType } from '../types';

const Element: React.FC<{ config: ElementConfig }> = ({ config }) => {
  useEffect(() => {
    console.log('Component created:', config.label);
    return () => console.log('Component destroyed:', config.label);
  }, [config]);

  switch (config.type) {
    case ElementType.TEXT_INPUT:
      return <input type="text" placeholder={config.value} aria-label={config.label} />;
    case ElementType.SELECT:
      return (
        <select aria-label={config.label}>
          {config.value.split(',').map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
};

export default Element;
