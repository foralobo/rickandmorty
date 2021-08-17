export interface PageInfo {
  count: number;
  next: string;
  pages: number;
  prev: string;
}

export interface ResponseApi {
  info: PageInfo;
  results: any[];
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
  episode: string;
  url: string;
  created: string;
}
