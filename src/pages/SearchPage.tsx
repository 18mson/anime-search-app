import { useEffect, useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useDebounce } from '../hooks/useDebounce';
import { searchAnimeThunk, setSearchQuery, clearError } from '../store/animeSlice';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { searchResults, loading, error, currentPage, hasNextPage, searchQuery } =
    useAppSelector((state) => state.anime);

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(localSearchQuery, 250);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      dispatch(setSearchQuery(debouncedSearchQuery));
      dispatch(searchAnimeThunk({ query: debouncedSearchQuery, page: 1 }));
    }
  }, [debouncedSearchQuery, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (searchQuery.trim()) {
      dispatch(searchAnimeThunk({ query: searchQuery, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchInput = (value: string) => {
    setLocalSearchQuery(value);
  };

  return (
    <div id="search-page" className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 id="search-title" className="text-5xl font-bold text-white mb-4 text-center bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
            Anime Explorer
          </h1>
          <p id="search-subtitle" className="text-white/70 text-center mb-8">
            Discover your next favorite anime from thousands of titles
          </p>

          <div id="search-input-wrapper" className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-white/50 text-xl" />
            </div>
            <input
              id="search-input"
              type="text"
              value={localSearchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search anime by title..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
            />
          </div>
        </div>

        {error && (
          <ErrorMessage message={error} onClose={() => dispatch(clearError())} data-testid="error" />
        )}

        {loading && !searchResults.length ? (
          <div id="search-skeletons" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div id="search-results" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {searchResults.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>

            <div id="search-pagination" className="flex justify-center items-center gap-4 mt-8">
              <button
                id="search-prev-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <FiChevronLeft />
                Previous
              </button>

              <div id="search-page-indicator" className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white">
                Page {currentPage}
              </div>

              <button
                id="search-next-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage || loading}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                Next
                <FiChevronRight />
              </button>
            </div>
          </>
        ) : localSearchQuery.trim() ? (
          <EmptyState type="no-results" searchQuery={localSearchQuery} />
        ) : (
          <EmptyState type="initial" />
        )}
      </div>
    </div>
  );
};
