export interface ScrapeResult {
  id: string;
  url: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  headings: string[];
  links: string[];
}

export interface Category {
  id: string;
  name: string;
}
