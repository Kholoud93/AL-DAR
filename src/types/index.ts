// ALDAR shared types

export interface Project {
  id: string;
  name: string;
  nameAr: string;
  year: number;
  location: string;
  locationAr: string;
  image: string;
  description: string;
  descriptionAr: string;
}

export interface Service {
  id: string;
  title: string;
  titleAr: string;
  image: string;
  slug: string;
}

export interface Certificate {
  id: string;
  title: string;
  titleAr: string;
  image: string;
  description: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}

export interface StatItem {
  label: string;
  labelAr: string;
  value: number;
  suffix: string;
  icon: string;
}

export type Language = "en" | "ar";
