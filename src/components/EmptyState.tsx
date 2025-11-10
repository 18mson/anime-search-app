import { FiSearch, FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
  searchQuery?: string;
}

export const EmptyState = ({ type, searchQuery }: EmptyStateProps) => {
  if (type === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-full mb-6 border border-white/20">
          <FiSearch className="text-6xl text-white/70" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Discover Your Next Favorite Anime
        </h3>
        <p className="text-white/70 text-center max-w-md">
          Start typing in the search bar above to explore thousands of anime titles.
          Find detailed information, ratings, and more!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-full mb-6 border border-white/20">
        <FiInbox className="text-6xl text-white/70" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
      <p className="text-white/70 text-center max-w-md">
        We couldn't find any anime matching{' '}
        <span className="font-semibold text-white">"{searchQuery}"</span>.
        <br />
        Try a different search term or check your spelling.
      </p>
    </div>
  );
};
