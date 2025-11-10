import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiStar,
  FiCalendar,
  FiTv,
  FiClock,
  FiUsers,
  FiHeart,
  FiPlay,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchAnimeDetail, clearError } from '../store/animeSlice';
import { AnimeDetailSkeleton } from '../components/Skeleton';
import { ErrorMessage } from '../components/ErrorMessage';

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, detailLoading, error } = useAppSelector(
    (state) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(Number(id)));
    }
  }, [id, dispatch]);

  if (detailLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <FiArrowLeft />
            Back
          </button>
          <AnimeDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <FiArrowLeft />
            Back
          </button>
          <ErrorMessage message={error} onClose={() => dispatch(clearError())} />
        </div>
      </div>
    );
  }

  if (!selectedAnime) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="md:col-span-1">
              <img
                src={
                  selectedAnime.images.webp.large_image_url ||
                  selectedAnime.images.jpg.large_image_url
                }
                alt={selectedAnime.title}
                className="w-full rounded-xl shadow-2xl"
              />

              {selectedAnime.trailer?.youtube_id && (
                <a
                  href={selectedAnime.trailer.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <FiPlay />
                  Watch Trailer
                </a>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-white mb-2">
                {selectedAnime.title}
              </h1>
              {selectedAnime.title_english && (
                <h2 className="text-xl text-white/70 mb-4">
                  {selectedAnime.title_english}
                </h2>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedAnime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {selectedAnime.score && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                      <FiStar />
                      <span className="text-sm">Score</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {selectedAnime.score.toFixed(1)}
                    </p>
                  </div>
                )}

                {selectedAnime.rank && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                      <FiStar />
                      <span className="text-sm">Rank</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      #{selectedAnime.rank}
                    </p>
                  </div>
                )}

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <FiUsers />
                    <span className="text-sm">Members</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {(selectedAnime.members / 1000).toFixed(0)}K
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-pink-400 mb-1">
                    <FiHeart />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {(selectedAnime.favorites / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <FiTv className="text-blue-400 text-xl shrink-0 mt-1" />
                    <div>
                      <p className="text-white/50 text-sm">Type</p>
                      <p className="text-white">{selectedAnime.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiClock className="text-green-400 text-xl shrink-0 mt-1" />
                    <div>
                      <p className="text-white/50 text-sm">Episodes</p>
                      <p className="text-white">
                        {selectedAnime.episodes || 'Unknown'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiCalendar className="text-purple-400 text-xl shrink-0 mt-1" />
                    <div>
                      <p className="text-white/50 text-sm">Aired</p>
                      <p className="text-white">{selectedAnime.aired.string}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiTv className="text-yellow-400 text-xl shrink-0 mt-1" />
                    <div>
                      <p className="text-white/50 text-sm">Status</p>
                      <p className="text-white">{selectedAnime.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAnime.synopsis && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Synopsis</h3>
                  <p className="text-white/80 leading-relaxed">
                    {selectedAnime.synopsis}
                  </p>
                </div>
              )}

              {selectedAnime.background && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Background</h3>
                  <p className="text-white/80 leading-relaxed">
                    {selectedAnime.background}
                  </p>
                </div>
              )}

              {selectedAnime.studios.length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Studios</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnime.studios.map((studio) => (
                      <span
                        key={studio.mal_id}
                        className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                      >
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
