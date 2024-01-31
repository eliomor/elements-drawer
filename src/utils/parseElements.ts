import { ElementConfig, ElementType } from '../types';

export const parseElements = (text: string): ElementConfig[] => {
  const elementRegex = /^(\d+);(\d+);([^;]+);(TEXT_INPUT|SELECT);(.+)$/;
  return text.trim().split('\n').map(line => {
    const match = line.match(elementRegex);
    if (match) {
      const [, lineStr, columnStr, label, typeStr, value] = match;
      return {
        line: parseInt(lineStr, 10),
        column: parseInt(columnStr, 10),
        label,
        type: typeStr as ElementType,
        value,
      };
    }
    return null;
  }).filter(Boolean) as ElementConfig[];
};
