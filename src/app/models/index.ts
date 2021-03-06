export type VersionType = 'alternative' | 'all';

export interface PageInfo {
  count: number;
  next: string;
  pages: number;
  prev: string;
}

export interface ResponseApi {
  info: PageInfo;
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
  episodesInfo?: Episode[];
}

export interface Location {
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
  dimension: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string[];
  characters: Character[];
  episode: string;
  url: string;
  created: string;
}
