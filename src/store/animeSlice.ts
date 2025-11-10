import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Anime } from '../types/anime';
import { searchAnime, getAnimeById, cancelPendingRequests } from '../services/jikanApi';

interface AnimeState {
  searchResults: Anime[];
  selectedAnime: Anime | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  searchQuery: string;
}

const initialState: AnimeState = {
  searchResults: [],
  selectedAnime: null,
  loading: false,
  detailLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  searchQuery: '',
};

export const searchAnimeThunk = createAsyncThunk(
  'anime/search',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await searchAnime(query, page);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return rejectWithValue('Request cancelled');
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const fetchAnimeDetail = createAsyncThunk(
  'anime/fetchDetail',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getAnimeById(id);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    cancelSearch: (state) => {
      cancelPendingRequests();
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnimeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnimeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
        state.error = null;
      })
      .addCase(searchAnimeThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'Request cancelled') {
          state.error = action.payload as string;
        }
      })
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedAnime = action.payload;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearError, cancelSearch } = animeSlice.actions;
export default animeSlice.reducer;
