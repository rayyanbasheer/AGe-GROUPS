
export type Language = 'en' | 'ta';

export interface Service {
  id: string;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  icon: string;
  details: string[];
  detailsTa: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

export enum ProjectCategory {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
  EDUCATIONAL = 'Educational',
  HEALTHCARE = 'Healthcare',
  RELIGIOUS = 'Religious'
}
