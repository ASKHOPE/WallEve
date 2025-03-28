// Define types for the Pexels API response
export interface PhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string; // Link to the photo page on Pexels
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PhotoSrc;
  liked: boolean;
  alt: string | null; // The alt text
}

export interface PexelsResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page?: string;
  prev_page?: string;
}
