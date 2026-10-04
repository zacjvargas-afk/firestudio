import React, { useState } from 'react';
import { X, Copy, Check, Download, Plus, FileCode, RotateCcw } from 'lucide-react';

export const JsonViewerModal = ({
  isOpen,
  onClose,
  games,
  onAddGame,
  onResetDefaults,
  selectedGameForIframe,
}) => {
  const [tab, setTab] = useState('view');
  const [copied, setCopied] = useState(false);

  // Form states for adding custom game
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Arcade');
  const [newDesc, setNewDesc] = useState('');
  const [newControls, setNewControls] = useState('Mouse or Keyboard');
  const [newIframe, setNewIframe] = useState('<iframe src="https://example.com/game" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const currentTab = selectedGameForIframe ? 'single' : tab;

  const fullJsonString = JSON.stringify(games, null, 2);
  const singleJsonString = selectedGameForIframe ? JSON.stringify(selectedGameForIframe, null, 2) : '';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Please enter a game title.');
      return;
    }
    if (!newIframe.includes('<iframe') || !newIframe.includes('>')) {
      setFormError('Please provide a valid <iframe> code snippet.');
      return;
    }

    const createdGame = {
      id: 'custom-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim() || 'Custom community unblocked game.',
      controls: newControls.trim() || 'Mouse and Keyboard controls',
      rating: 4.8,
      plays: '1K',
      themeColor: '#38bdf8',
      tags: [newCategory, 'Custom'],
      iframe: newIframe.trim(),
    };

    onAddGame(createdGame);
    setNewTitle('');
    setNewDesc('');
    setFormError('');
    setTab('view');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
              <FileCode className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                {selectedGameForIframe ? `Iframe JSON: ${selectedGameForIframe.title}` : 'games.json Catalog Storage'}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedGameForIframe
                  ? 'Raw iframe element entry in the database'
                  : 'Every game is stored as an <iframe> snippet inside this JSON catalog'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Controls (when not inspecting single game) */}
        {!selectedGameForIframe && (
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 px-6 py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab('view')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tab === 'view' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                View Full games.json ({games.length})
              </button>
              <button
                onClick={() => setTab('add')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tab === 'add' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Game Iframe</span>
              </button>
            </div>

            {tab === 'view' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(fullJsonString)}
                  className="flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5 text-sky-400" />
                  <span>Download .json</span>
                </button>
                <button
                  onClick={onResetDefaults}
                  title="Reset to default games catalog"
                  className="flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-500 hover:text-slate-300"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentTab === 'single' && selectedGameForIframe && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stored Iframe String</label>
                <div className="mt-1 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-rose-300 break-all">
                  <span>{selectedGameForIframe.iframe}</span>
                  <button
                    onClick={() => handleCopy(selectedGameForIframe.iframe)}
                    className="ml-3 shrink-0 rounded bg-slate-800 px-2.5 py-1 text-xs font-sans text-slate-200 hover:bg-slate-700"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full JSON Entry</label>
                <pre className="mt-1 max-h-80 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300">
                  {singleJsonString}
                </pre>
              </div>
            </div>
          )}

          {currentTab === 'view' && !selectedGameForIframe && (
            <div>
              <pre className="max-h-[55vh] overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400/90 leading-relaxed">
                {fullJsonString}
              </pre>
            </div>
          )}

          {currentTab === 'add' && !selectedGameForIframe && (
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {formError && (
                <div className="rounded-lg border border-rose-800/80 bg-rose-950/40 p-3 text-xs text-rose-300">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300">Game Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pixel Racing 3D"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                  >
                    <option value="Arcade">Arcade</option>
                    <option value="Classic">Classic</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Action">Action</option>
                    <option value="Skill">Skill</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the game gameplay..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">Keybinds & Controls</label>
                <input
                  type="text"
                  placeholder="e.g. Arrow keys to steer, Space to brake"
                  value={newControls}
                  onChange={(e) => setNewControls(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Iframe HTML Code (stored directly in JSON)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder='<iframe src="https://example.com/game" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>'
                  value={newIframe}
                  onChange={(e) => setNewIframe(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-amber-300 focus:border-rose-500 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Tip: Supports any valid HTML iframe embed from trusted unblocked sources or self-hosted games.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setTab('view')}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-rose-600 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-rose-500"
                >
                  Save to games.json
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
