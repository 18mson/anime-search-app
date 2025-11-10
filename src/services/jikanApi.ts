import type { SearchResponse, AnimeDetailResponse } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

let currentAbortController: AbortController | null = null;

export const cancelPendingRequests = () => {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
};

export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  cancelPendingRequests();

  currentAbortController = new AbortController();

  const response = await fetch(
    `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
    { signal: currentAbortController.signal }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }
    throw new Error('Failed to fetch anime data. Please try again.');
  }

  const data = await response.json();
  currentAbortController = null;
  return data;
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  const response = await fetch(`${BASE_URL}/anime/${id}/full`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }
    if (response.status === 404) {
      throw new Error('Anime not found.');
    }
    throw new Error('Failed to fetch anime details. Please try again.');
  }

  return response.json();
};
