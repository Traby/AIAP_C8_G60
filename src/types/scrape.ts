export interface ScrapeResult {
  id: string;
  url: string;
  title: string;
  date: string;
  summary: string;
  headings: string[];
  links: string[];
}

export interface ResearchSource {
  url: string;
  title: string;
}

export interface ResearchResponse {
  briefing: string;
  sources: ResearchSource[];
  query: string;
}
