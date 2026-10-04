import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCw,
  Star,
  Code2,
  Gamepad,
  Info,
  Sliders,
} from 'lucide-react';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  onSelectGame,
  allGames,
  onViewIframe,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const containerRef = useRef(null);

  // Parse or sanitize the iframe HTML string from the JSON file
  const extractIframeSrc = (iframeHtml) => {
    const match = iframeHtml?.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : '';
  };

  const iframeSrc = extractIframeSrc(game.iframe);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const relatedGames = allGames
    .filter((g) => g.id !== game.id && (g.category === game.category || g.featured))
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Back bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Reload button */}
          <button
            onClick={() => setReloadKey((prev) => prev + 1)}
            title="Reload game frame"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          {/* Theater Mode */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            title={isTheater ? 'Exit theater mode' : 'Expand theater mode'}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isTheater ? 'Default View' : 'Theater'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>

          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(game.id)}
            title={isFavorite ? 'Saved in favorites' : 'Add to favorites'}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              isFavorite
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          {/* Raw iframe in JSON snippet */}
          <button
            onClick={() => onViewIframe(game)}
            title="Inspect stored iframe in games.json"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">JSON Iframe</span>
          </button>
        </div>
      </div>

      {/* Main Game Stage Container */}
      <div
        ref={containerRef}
        className={`relative mx-auto overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl transition-all duration-300 ${
          isTheater ? 'w-full max-w-none' : 'max-w-5xl'
        }`}
        style={{
          height: isFullscreen ? '100vh' : isTheater ? '78vh' : '620px',
        }}
      >
        {/* The Game Iframe */}
        {iframeSrc ? (
          <iframe
            key={reloadKey}
            src={iframeSrc}
            title={game.title}
            className="h-full w-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
          />
        ) : (
          /* Direct HTML insertion fallback for custom pasted iframe elements */
          <div
            key={reloadKey}
            className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
            dangerouslySetInnerHTML={{ __html: game.iframe }}
          />
        )}
      </div>

      {/* Game Details & Controls Bar below */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Details & How to Play */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">{game.title}</h1>
              {/* Unboxed metadata standard */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{game.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums font-semibold text-amber-400">★ {game.rating.toFixed(1)}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{game.plays} plays</span>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">{game.description}</p>

            <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Gamepad className="h-4 w-4" />
                <span>Controls & Keybinds</span>
              </div>
              <p className="mt-1.5 font-mono text-xs text-slate-300">{game.controls}</p>
            </div>
          </div>
        </div>

        {/* Right Col: Iframe Info & Quick Suggestions */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Info className="h-4 w-4 text-sky-400" />
              <span>Catalog Source</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Stored as an <code className="rounded bg-slate-800 px-1 py-0.5 text-slate-200">&lt;iframe&gt;</code> entry inside <code className="rounded bg-slate-800 px-1 py-0.5 text-slate-200">games.json</code>. Clean client-side loading with zero ads or tracking.
            </p>

            <div className="mt-3">
              <button
                onClick={() => onViewIframe(game)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/80 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <Code2 className="h-3.5 w-3.5 text-amber-400" />
                <span>Inspect Stored Iframe JSON</span>
              </button>
            </div>
          </div>

          {/* Related / More games */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              More {game.category} Games
            </h4>
            <div className="mt-3 space-y-2">
              {relatedGames.map((rg) => (
                <div
                  key={rg.id}
                  onClick={() => onSelectGame(rg)}
                  className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-950/40 p-2.5 transition-colors hover:border-slate-700 hover:bg-slate-800/60 cursor-pointer"
                >
                  <div className="truncate pr-2">
                    <div className="truncate text-xs font-bold text-slate-200">{rg.title}</div>
                    <div className="text-[11px] text-slate-500">{rg.category} · ★ {rg.rating}</div>
                  </div>
                  <button className="shrink-0 rounded bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:bg-rose-600 hover:text-white">
                    Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
