import React from 'react';
import { Star, Play, Code, Gamepad2, Sparkles } from 'lucide-react';

export const GameCard = ({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite,
  onViewIframe,
}) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/60 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/40">
      {/* Top Banner & Visual Graphic */}
      <div
        className="relative flex h-36 w-full items-center justify-center overflow-hidden cursor-pointer"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${game.themeColor}22 0%, #090d16 100%)`,
        }}
        onClick={() => onPlay(game)}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(${game.themeColor} 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Center Graphic */}
        <div className="relative flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg"
            style={{
              borderColor: `${game.themeColor}55`,
              backgroundColor: `${game.themeColor}18`,
              color: game.themeColor,
            }}
          >
            <Gamepad2 className="h-8 w-8" />
          </div>
        </div>

        {/* Top-Right Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-md transition-all ${
            isFavorite
              ? 'border-amber-500/50 bg-amber-500/20 text-amber-400'
              : 'border-slate-700/60 bg-slate-950/60 text-slate-400 hover:border-slate-600 hover:text-white'
          }`}
        >
          <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Featured marker if applicable */}
        {game.featured && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-400 drop-shadow">
            <Sparkles className="h-3 w-3" />
            <span>Featured</span>
          </div>
        )}

        {/* Hover play action overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-rose-500">
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>PLAY NOW</span>
          </div>
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="flex flex-1 flex-col p-4">
        {/* Unboxed Metadata Line (anti-slop standard) */}
        <div className="mb-1.5 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="font-medium text-slate-300">{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="tabular-nums font-medium text-amber-400">★ {game.rating.toFixed(1)}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="tabular-nums text-slate-400">{game.plays} plays</span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-slate-100 transition-colors group-hover:text-rose-400 cursor-pointer"
          onClick={() => onPlay(game)}
        >
          {game.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
          {game.description}
        </p>

        {/* Bottom Bar: Tags & Iframe inspect */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            {game.tags.slice(0, 2).map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">/</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewIframe(game)}
              title="View Iframe JSON snippet"
              className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <Code className="h-3 w-3" />
              <span>&lt;iframe&gt;</span>
            </button>
            <button
              onClick={() => onPlay(game)}
              className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors hover:bg-rose-600 hover:text-white"
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
