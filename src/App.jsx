import React, { useState, useEffect, useMemo, useRef } from 'react';
import initialGamesData from './data/games.json';
import { Navbar } from './components/Navbar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { JsonViewerModal } from './components/JsonViewerModal';
import { PanicOverlay } from './components/PanicOverlay';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Gamepad2,
  Sparkles,
  Play,
  Code2,
} from 'lucide-react';

export default function App() {
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [inspectGameForIframe, setInspectGameForIframe] = useState(null);
  const [isPanicOpen, setIsPanicOpen] = useState(false);

  const searchInputRef = useRef(null);

  // Load games from localStorage or fetch public/games.json or fallback
  useEffect(() => {
    let customList = [];
    try {
      const savedCustom = localStorage.getItem('firestudeo_custom_games');
      if (savedCustom) {
        customList = JSON.parse(savedCustom);
      }
    } catch (e) {
      customList = [];
    }

    fetch('/games.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setGames([...data, ...customList]);
      })
      .catch(() => {
        // Fallback to bundled data
        setGames([...initialGamesData, ...customList]);
      });

    // Load favorites
    try {
      const savedFavs = localStorage.getItem('firestudeo_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  // Global hotkeys (Panic key: [ or Esc, Search: /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '[') {
        setIsPanicOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('firestudeo_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCustomGame = (newGame) => {
    setGames((prev) => {
      const next = [newGame, ...prev];
      const customOnly = next.filter((g) => g.id.startsWith('custom-'));
      localStorage.setItem('firestudeo_custom_games', JSON.stringify(customOnly));
      return next;
    });
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('firestudeo_custom_games');
    setGames(initialGamesData);
  };

  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomIdx = Math.floor(Math.random() * games.length);
    setActiveGame(games[randomIdx]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter & Sort
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Category filter
        if (activeFilter === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (activeFilter !== 'All') {
          if (game.category !== activeFilter) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchCategory = game.category.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          const matchTags = game.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchCategory && !matchDesc && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'plays') {
          const aPlays = parseInt(a.plays) || 0;
          const bPlays = parseInt(b.plays) || 0;
          return bPlays - aPlays;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [games, activeFilter, searchQuery, sortBy, favorites]);

  // Featured game for spotlight
  const spotlightGame = useMemo(() => {
    return games.find((g) => g.featured) || games[0];
  }, [games]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Panic Cloak Overlay */}
      <PanicOverlay isOpen={isPanicOpen} onClose={() => setIsPanicOpen(false)} />

      {/* JSON Viewer and Iframe Inspector Modal */}
      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => {
          setIsJsonModalOpen(false);
          setInspectGameForIframe(null);
        }}
        games={games}
        onAddGame={handleAddCustomGame}
        onResetDefaults={handleResetDefaults}
        selectedGameForIframe={inspectGameForIframe}
      />

      {/* Top Bar Contract (Wordmark - Links - Primary Actions) */}
      <Navbar
        onOpenJson={() => {
          setInspectGameForIframe(null);
          setIsJsonModalOpen(true);
        }}
        onOpenAddGame={() => {
          setInspectGameForIframe(null);
          setIsJsonModalOpen(true);
        }}
        onRandomGame={handleRandomGame}
        onTogglePanic={() => setIsPanicOpen(true)}
        activeFilter={activeFilter}
        onSelectCategory={(cat) => {
          setActiveFilter(cat);
          setActiveGame(null);
        }}
        totalGames={games.length}
      />

      {/* Active Game Player Stage */}
      {activeGame ? (
        <main className="flex-1">
          <GamePlayer
            game={activeGame}
            onBack={() => setActiveGame(null)}
            isFavorite={favorites.includes(activeGame.id)}
            onToggleFavorite={handleToggleFavorite}
            onSelectGame={(g) => {
              setActiveGame(g);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            allGames={games}
            onViewIframe={(g) => {
              setInspectGameForIframe(g);
              setIsJsonModalOpen(true);
            }}
          />
        </main>
      ) : (
        /* Catalog View */
        <main className="flex-1">
          {/* Hero Spotlight Section */}
          <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                {/* Left Text Zone */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400">
                    <Flame className="h-4 w-4" />
                    <span>Unblocked Web Games Catalog</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">JSON Iframe Architecture</span>
                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Fast, unblocked games running directly in clean iframes.
                  </h1>

                  <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
                    firestudeo loads self-contained HTML5 games stored as iframe elements inside a lightweight JSON catalog. Zero ads, zero trackers, fast play.
                  </p>

                  {/* Quantitative proof metrics (clean unboxed numbers) */}
                  <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                    <div>
                      <span className="tabular-nums font-bold text-white text-base mr-1.5">{games.length}</span>
                      <span>Playable Games</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <div>
                      <span className="tabular-nums font-bold text-emerald-400 text-base mr-1.5">100%</span>
                      <span>Client-Side JSON</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <div>
                      <span className="tabular-nums font-bold text-amber-400 text-base mr-1.5">0</span>
                      <span>Blocked Frames</span>
                    </div>
                  </div>
                </div>

                {/* Right Hero Spotlight Card */}
                {spotlightGame && (
                  <div className="lg:col-span-5">
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl transition-all hover:border-slate-700">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-rose-400">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Spotlight Game</span>
                        </span>
                        <span>{spotlightGame.category} · ★ {spotlightGame.rating}</span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                        {spotlightGame.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
                        {spotlightGame.description}
                      </p>

                      <div className="mt-5 flex items-center gap-3">
                        <button
                          onClick={() => setActiveGame(spotlightGame)}
                          className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-rose-500"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>PLAY SPOTLIGHT</span>
                        </button>

                        <button
                          onClick={() => {
                            setInspectGameForIframe(spotlightGame);
                            setIsJsonModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Code2 className="h-3.5 w-3.5" />
                          <span>View Iframe</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Filtering & Search Bar Section */}
          <section className="sticky top-16 z-30 border-b border-slate-800/80 bg-slate-950/95 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Category Segmented Control Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-900/90 rounded-lg border border-slate-800 scrollbar-none">
                {['All', 'Arcade', 'Classic', 'Puzzle', 'Action', 'Skill', 'Favorites'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        activeFilter === cat
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      {cat === 'Favorites' ? `Favorites (${favorites.length})` : cat}
                    </button>
                  )
                )}
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search games (/ to focus)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-white"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500 hidden sm:inline-block" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 focus:border-rose-500 focus:outline-none"
                  >
                    <option value="featured">Featured First</option>
                    <option value="plays">Most Played</option>
                    <option value="rating">Top Rated</option>
                    <option value="title">A - Z</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Games Grid Section */}
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
              <div>
                Showing <span className="tabular-nums font-bold text-white">{filteredGames.length}</span> games
                {activeFilter !== 'All' && <span> in <span className="text-rose-400 font-semibold">{activeFilter}</span></span>}
              </div>
              <div className="text-[11px] text-slate-500">
                Click any card to play in iframe
              </div>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onPlay={(g) => {
                      setActiveGame(g);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewIframe={(g) => {
                      setInspectGameForIframe(g);
                      setIsJsonModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 py-16 text-center">
                <Gamepad2 className="h-12 w-12 text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-white">No games matched your query</h3>
                <p className="mt-1 text-xs text-slate-400 max-w-sm">
                  {activeFilter === 'Favorites'
                    ? "You haven't bookmarked any favorites yet. Click the star icon on any game card to add it!"
                    : "Try searching for a different keyword or reset the category filter to All."}
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* Explanatory JSON Architecture Note */}
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-slate-800/80">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white">How firestudeo Iframe Storage Works</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400 max-w-2xl">
                    Every game in this library is defined inside <code className="text-rose-400">public/games.json</code> with its title, category, description, and an HTML <code className="text-amber-400">&lt;iframe&gt;</code> string. Games run in isolated sandboxed viewports without server redirects.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setInspectGameForIframe(null);
                      setIsJsonModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
                  >
                    <Code2 className="h-4 w-4 text-rose-400" />
                    <span>View games.json</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">firestudeo</span>
            <span aria-hidden="true">·</span>
            <span>Unblocked Games Catalog</span>
            <span aria-hidden="true">·</span>
            <span>JSON Iframe Driven</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => {
                setInspectGameForIframe(null);
                setIsJsonModalOpen(true);
              }}
              className="hover:text-white transition-colors"
            >
              JSON Catalog
            </button>
            <button
              onClick={() => setIsPanicOpen(true)}
              className="hover:text-rose-400 transition-colors"
            >
              Panic Key [
            </button>
            <span>v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
