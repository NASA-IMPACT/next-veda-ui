export type Theme = {
  id: string;
  title: string;
  cardImage: string;
};

export interface Exhibit {
  id: string;
  heading: string;
  openingHours: string[];
  address: string[];
  imgSrc: string;
  imgAlt: string;
  description?: string;
}

export type Interactive = {
  id: string;
  url: string;
  title: string;
  description: string;
  cardImageAlt: string;
};

export type Center = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};
