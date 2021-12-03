export interface Movie {
  title?: string;
  vote_average?: number;
  release_date?: string;
  poster_path?: string;
  runtime?: number;
  overview?: string;
  genres: string[];
  tagline: string;
  vote_count: number;
  budget: number;
  revenue: number;
}
