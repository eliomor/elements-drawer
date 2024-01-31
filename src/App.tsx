import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { ElementConfig } from './types'; 
import { parseElements } from './utils/parseElements';
import Element from './components/Element';

const App: React.FC = () => {
  const [elementsText, setElementsText] = useState('');
  const [elements, setElements] = useState<ElementConfig[]>([]);
  const [existingElementKeys, setExistingElementKeys] = useState<string[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setElementsText(newText);
    const lines = newText.split('\n');
    const updatedElements: ElementConfig[] = [];
    const updatedElementKeys: string[] = [];

    lines.forEach((line, index) => {
      const parsedElements = parseElements(line);
      if (parsedElements.length > 0) {
        const lineElements = parsedElements.map((element, elementIndex) => {
          const elementKey = `${element.line}-${element.column}-${elementIndex}`;
          if (existingElementKeys.includes(elementKey)) {
            const existingIndex = existingElementKeys.indexOf(elementKey);
            updatedElementKeys.push(elementKey);
            return elements[existingIndex];
          } else {
            updatedElementKeys.push(elementKey);
            return element;
          }
        });

        updatedElements.push(...lineElements);
      }
    });

    setElements(updatedElements);
    setExistingElementKeys(updatedElementKeys);
  };

  return (
    <div className="App">
      <textarea
        value={elementsText}
        onChange={handleTextChange}
        placeholder="Enter element configurations here"
        rows={10}
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <div className="grid">
        {elements.map((config, index) => (
          <div 
            style={{ gridRow: config.line, gridColumn: config.column }} 
            key={`${config.line}-${config.column}-${index}`}
          >
            <Element config={config} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
