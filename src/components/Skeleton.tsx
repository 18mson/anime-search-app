export const AnimeCardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 animate-pulse">
      <div className="aspect-3/4 bg-gray-700/50" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700/50 rounded w-3/4" />
        <div className="h-3 bg-gray-700/50 rounded w-1/2" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-700/50 rounded w-16" />
          <div className="h-6 w-12 bg-gray-700/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const AnimeDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        <div className="grid md:grid-cols-3 gap-8 p-8">
          <div className="md:col-span-1">
            <div className="aspect-3/4 bg-gray-700/50 rounded-xl" />
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="h-8 bg-gray-700/50 rounded w-3/4" />
            <div className="h-4 bg-gray-700/50 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-700/50 rounded" />
              <div className="h-4 bg-gray-700/50 rounded" />
              <div className="h-4 bg-gray-700/50 rounded w-5/6" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-700/50 rounded-xl" />
              <div className="h-20 bg-gray-700/50 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
