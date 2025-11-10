import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import type { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {anime.score && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <FiStar className="text-yellow-400 text-sm" />
            <span className="text-white text-sm font-semibold">
              {anime.score.toFixed(1)}
            </span>
          </div>
        )}
        {anime.airing && (
          <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-white text-xs font-semibold">AIRING</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors">
          {anime.title}
        </h3>
        <p className="text-white/60 text-sm mb-3">
          {anime.type} • {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
        </p>
        <div className="flex justify-between items-center text-xs text-white/50">
          <span>{anime.year || 'N/A'}</span>
          {anime.members && (
            <span>{(anime.members / 1000).toFixed(0)}K members</span>
          )}
        </div>
      </div>
    </Link>
  );
};
