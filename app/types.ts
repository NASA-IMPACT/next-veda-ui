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
}
