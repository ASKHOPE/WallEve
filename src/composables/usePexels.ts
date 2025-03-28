import { ref, onMounted, onUnmounted } from 'vue';
import type { PexelsResponse, Photo } from '../types/pexels';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

const fallbackPhotos: Photo[] = [
  {
    id: 0,
    width: 1920,
    height: 1080,
    url: 'https://www.pexels.com',
    photographer: 'Fallback',
    photographer_url: '#',
    photographer_id: 0,
    avg_color: '#cccccc',
    src: {
      original: '/landscape.jpg',
      large2x: '/landscape.jpg',
      large: '/landscape.jpg',
      medium: '/landscape.jpg',
      small: '/landscape.jpg',
      portrait: '/portrait.jpg',
      landscape: '/landscape.jpg',
      tiny: '/landscape.jpg'
    },
    liked: false,
    alt: 'Fallback image'
  }
];
// Define an array of 5 random categories
const categories = ['Nature', 'Technology', 'Food', 'Animals'];

// Select a random category on initialization
const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

export function usePexels(queryParam: string = getRandomCategory(), perPageParam: number = 9) {
  const query = ref<string>(queryParam);
  const photos = ref<Photo[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isUsingFallback = ref<boolean>(false);
  const currentPage = ref<number>(1);
  const totalResults = ref<number>(0);
  const nextPageUrl = ref<string | null>(null);
  const prevPageUrl = ref<string | null>(null);
  const perPage = ref<number>(perPageParam); 
  const orientation = ref<string>(window.innerWidth < 768 ? 'portrait' : 'landscape');

  const updateScreenSettings = () => {
    perPage.value = window.innerWidth < 768 ? 6 : perPageParam;
    orientation.value = window.innerWidth < 768 ? 'portrait' : 'landscape';
    fetchPhotos(currentPage.value); // Re-fetch photos when screen size changes
  };

  const fetchPhotos = async (page: number = 1) => {
    isLoading.value = true;
    error.value = null;
    photos.value = [];
    isUsingFallback.value = false;

    if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY') {
      console.warn('Pexels API Key not found. Using fallback images.');
      error.value = 'Pexels API Key not configured.';
      photos.value = fallbackPhotos;
      isUsingFallback.value = true;
      isLoading.value = false;
      return;
    }

    try {
      const url = `${BASE_URL}/search?query=${encodeURIComponent(query.value)}&per_page=${perPage.value}&page=${page}&orientation=${orientation.value}`;

      const response = await fetch(url, {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }

      const data: PexelsResponse = await response.json();

      if (data.photos && data.photos.length > 0) {
        photos.value = data.photos;
        totalResults.value = data.total_results;
        nextPageUrl.value = data.next_page || null;
        prevPageUrl.value = data.prev_page || null;
      } else {
        console.warn(`No photos found for query "${query.value}" with orientation "${orientation.value}". Using fallback images.`);
        photos.value = fallbackPhotos;
        isUsingFallback.value = true;
      }
    } catch (err: any) {
      console.error('Failed to fetch photos:', err);
      error.value = err.message || 'Failed to fetch photos. Displaying fallback.';
      photos.value = fallbackPhotos;
      isUsingFallback.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const nextPage = () => {
    if (nextPageUrl.value) {
      currentPage.value++;
      fetchPhotos(currentPage.value);
    }
  };

  const prevPage = () => {
    if (prevPageUrl.value && currentPage.value > 1) {
      currentPage.value--;
      fetchPhotos(currentPage.value);
    }
  };

  onMounted(() => {
    fetchPhotos(currentPage.value);
    window.addEventListener('resize', updateScreenSettings);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSettings);
  });

  return {
    query,
    photos,
    isLoading,
    error,
    isUsingFallback,
    currentPage,
    totalResults,
    nextPageUrl,
    prevPageUrl,
    fetchPhotos,
    nextPage,
    prevPage
  };
}
