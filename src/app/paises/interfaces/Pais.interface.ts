export interface Pais {
  name: Name;
  cioc: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common: string;
}

export interface PaisFronteras {
  borders: string[];
}

