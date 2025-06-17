export interface Location {
  latitude: number;
  longitude: number; // Enum-like for risk names
  title?: string;
  description?: string;
}

export interface SavedPlace {
  description: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
