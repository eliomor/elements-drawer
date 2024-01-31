export enum ElementType {
  TEXT_INPUT = "TEXT_INPUT",
  SELECT = "SELECT",
}

export interface ElementConfig {
  line: number;
  column: number;
  label: string;
  type: ElementType;
  value: string;
}
