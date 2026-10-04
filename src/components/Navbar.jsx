import React from 'react';
import { Flame, ShieldAlert, Code2, PlusCircle, Shuffle } from 'lucide-react';

export const Navbar = ({
  onOpenJson,
  onOpenAddGame,
  onRandomGame,
  onTogglePanic,
  activeFilter,
  onSelectCategory,
  totalGames,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All');
            }}
            className="group flex items-center gap-2 text-xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-md shadow-rose-950/40">
              <Flame className="h-5 w-5 fill-current" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              fire<span className="text-rose-500">studeo</span>
            </span>
          </a>
          <span className="hidden text-xs text-slate-500 sm:inline-block">
            {totalGames} games indexed
          </span>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button
            onClick={() => onSelectCategory('All')}
            className={`transition-colors hover:text-white ${
              activeFilter === 'All' ? 'text-white font-semibold' : ''
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => onSelectCategory('Favorites')}
            className={`transition-colors hover:text-white ${
              activeFilter === 'Favorites' ? 'text-rose-400 font-semibold' : ''
            }`}
          >
            Favorites ★
          </button>
          <button
            onClick={() => onSelectCategory('Arcade')}
            className={`transition-colors hover:text-white ${
              activeFilter === 'Arcade' ? 'text-white font-semibold' : ''
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => onSelectCategory('Classic')}
            className={`transition-colors hover:text-white ${
              activeFilter === 'Classic' ? 'text-white font-semibold' : ''
            }`}
          >
            Classics
          </button>
          <button
            onClick={onOpenJson}
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Code2 className="h-4 w-4" />
            JSON Catalog
          </button>
        </nav>

        {/* Zone 3: Primary action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onRandomGame}
            title="Play a random game"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            <Shuffle className="h-3.5 w-3.5 text-amber-400" />
            <span>Random</span>
          </button>

          <button
            onClick={onOpenAddGame}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-rose-900/60 hover:bg-slate-800 hover:text-white"
          >
            <PlusCircle className="h-3.5 w-3.5 text-rose-400" />
            <span>Add Iframe</span>
          </button>

          <button
            onClick={onTogglePanic}
            title="School Panic Tab Cloaker (or press [ key)"
            className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-rose-500"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Panic [</span>
          </button>
        </div>
      </div>
    </header>
  );
};
