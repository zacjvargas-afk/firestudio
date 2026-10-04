// firestudeo - Unblocked Games Hub Engine
(function () {
  // Built-in fallback catalog to ensure 100% uptime even on file:// protocol or offline GitHub clones
  const DEFAULT_GAMES = [
    {
      id: "snake",
      title: "Retro Snake 8-Bit",
      category: "Arcade",
      description: "Navigate the pixel serpent across the grid, gobble glowing energy orbs, and test your reflexes as speed increases.",
      controls: "Arrow Keys or WASD to turn · Space to pause",
      rating: 4.9,
      plays: "248K",
      featured: true,
      themeColor: "#10b981",
      tags: ["Arcade", "Retro", "Reflex"],
      iframe: '<iframe src="./games/snake.html" title="Retro Snake 8-Bit" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "tetris",
      title: "Tetra Blocks",
      category: "Classic",
      description: "The timeless falling blocks puzzle. Rotate shapes, plan drop placements, clear multiple lines, and aim for maximum score.",
      controls: "Left / Right arrows to move · Up to rotate · Down to soft drop · Space to hard drop",
      rating: 4.9,
      plays: "312K",
      featured: true,
      themeColor: "#38bdf8",
      tags: ["Classic", "Puzzle", "Logic"],
      iframe: '<iframe src="./games/tetris.html" title="Tetra Blocks" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "2048",
      title: "2048 Puzzle",
      category: "Puzzle",
      description: "Slide matching numbered tiles across a 4x4 grid. Merge 2s into 4s, 8s into 16s, and climb your way to the elusive 2048 tile.",
      controls: "Arrow Keys or Swipe to slide tiles in any direction",
      rating: 4.8,
      plays: "194K",
      featured: true,
      themeColor: "#f59e0b",
      tags: ["Puzzle", "Numbers", "Strategy"],
      iframe: '<iframe src="./games/2048.html" title="2048 Puzzle" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "flappy",
      title: "Flappy Aviator",
      category: "Skill",
      description: "Timing and touch are everything. Flap your wings through narrow obstacles and see how far you can fly without crashing.",
      controls: "Spacebar or Left Click / Tap to flap upward",
      rating: 4.7,
      plays: "285K",
      featured: false,
      themeColor: "#38bdf8",
      tags: ["Skill", "Endless", "Arcade"],
      iframe: '<iframe src="./games/flappy.html" title="Flappy Aviator" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "space-invaders",
      title: "Space Blaster",
      category: "Action",
      description: "Command your starship defense cannon against descending waves of hostile alien invaders before they overwhelm your sector.",
      controls: "A / D or Arrow Keys to glide · Spacebar to fire lasers",
      rating: 4.8,
      plays: "162K",
      featured: true,
      themeColor: "#a855f7",
      tags: ["Action", "Shooter", "Retro"],
      iframe: '<iframe src="./games/space-invaders.html" title="Space Blaster" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "breakout",
      title: "Brick Breaker",
      category: "Arcade",
      description: "Deflect the high-velocity energy sphere with your paddle to shatter fortified brick layouts and advance through challenging stages.",
      controls: "Mouse or A / D / Arrow Keys to position paddle",
      rating: 4.8,
      plays: "178K",
      featured: false,
      themeColor: "#f59e0b",
      tags: ["Arcade", "Physics", "Classic"],
      iframe: '<iframe src="./games/breakout.html" title="Brick Breaker" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "dino-runner",
      title: "Chrome Dino Runner",
      category: "Skill",
      description: "Sprint through the prehistoric desert, leap across prickly cacti, and duck under flying pterodactyls in this endless runner.",
      controls: "Space or Up Arrow to jump · Down Arrow to duck",
      rating: 4.9,
      plays: "410K",
      featured: true,
      themeColor: "#10b981",
      tags: ["Skill", "Runner", "Endless"],
      iframe: '<iframe src="./games/dino-runner.html" title="Chrome Dino Runner" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "pong",
      title: "Retro Pong Arena",
      category: "Classic",
      description: "The grandfather of video games. Challenge the CPU on easy or hard modes, or duel against a friend in local two-player mode.",
      controls: "Player 1: W / S or Mouse · Player 2: Up / Down Arrows",
      rating: 4.7,
      plays: "142K",
      featured: false,
      themeColor: "#38bdf8",
      tags: ["Classic", "2 Player", "Sports"],
      iframe: '<iframe src="./games/pong.html" title="Retro Pong Arena" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "minesweeper",
      title: "Minesweeper Classic",
      category: "Puzzle",
      description: "Uncover numbers, deduce hazardous tile coordinates, and flag every concealed explosive on the board to win without detonating.",
      controls: "Left Click to reveal safe tile · Right Click to place flag",
      rating: 4.8,
      plays: "153K",
      featured: false,
      themeColor: "#ef4444",
      tags: ["Puzzle", "Logic", "Strategy"],
      iframe: '<iframe src="./games/minesweeper.html" title="Minesweeper Classic" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "asteroids",
      title: "Asteroids 360",
      category: "Action",
      description: "Pilot your vector spacecraft with authentic zero-gravity momentum, blast through dense asteroid fields, and avoid collisions.",
      controls: "Left / Right to rotate · Up Arrow to thrust · Space to shoot",
      rating: 4.7,
      plays: "129K",
      featured: false,
      themeColor: "#38bdf8",
      tags: ["Action", "Physics", "Retro"],
      iframe: '<iframe src="./games/asteroids.html" title="Asteroids 360" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "pacmaze",
      title: "Pac-Maze Chaser",
      category: "Arcade",
      description: "Navigate labyrinthine corridors, consume all the dots, grab power pellets to turn the tables on patrolling ghosts.",
      controls: "Arrow Keys or WASD to navigate maze junctions",
      rating: 4.8,
      plays: "220K",
      featured: false,
      themeColor: "#facc15",
      tags: ["Arcade", "Maze", "Retro"],
      iframe: '<iframe src="./games/pacmaze.html" title="Pac-Maze Chaser" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    },
    {
      id: "connect4",
      title: "Connect Four Tactical",
      category: "Classic",
      description: "Drop discs into vertical slots and create an unbroken line of four chips before the computer or your rival blocks your strategy.",
      controls: "Click or Tap column to drop disc",
      rating: 4.7,
      plays: "115K",
      featured: false,
      themeColor: "#3b82f6",
      tags: ["Classic", "Board", "Strategy"],
      iframe: '<iframe src="./games/connect4.html" title="Connect Four Tactical" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; gamepad"></iframe>'
    }
  ];

  // State
  let games = [];
  let currentCategory = 'All';
  let searchQuery = '';
  let currentSort = 'featured';
  let activeGame = null;
  let favorites = [];
  let isTheater = false;
  let isPanic = false;

  // DOM Elements
  const catalogView = document.getElementById('catalog-view');
  const playerView = document.getElementById('player-view');
  const gamesGrid = document.getElementById('games-grid');
  const emptyState = document.getElementById('empty-state');
  const gamesCountEl = document.getElementById('games-count');
  const totalGamesCountEl = document.getElementById('total-games-count');
  const totalGamesStatEl = document.getElementById('total-games-stat');
  const categoryFilterLabel = document.getElementById('category-filter-label');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select');
  const categoryTabs = document.querySelectorAll('.tab-btn');

  // Spotlight Elements
  const spotlightTitle = document.getElementById('spotlight-title');
  const spotlightDesc = document.getElementById('spotlight-desc');
  const spotlightMeta = document.getElementById('spotlight-meta');
  const btnPlaySpotlight = document.getElementById('btn-play-spotlight');
  const btnCodeSpotlight = document.getElementById('btn-code-spotlight');

  // Player Elements
  const stageWrapper = document.getElementById('stage-wrapper');
  const playerGameTitle = document.getElementById('player-game-title');
  const playerGameMeta = document.getElementById('player-game-meta');
  const playerGameDesc = document.getElementById('player-game-desc');
  const playerGameControls = document.getElementById('player-game-controls');
  const playerFavBtn = document.getElementById('player-fav-btn');
  const playerTheaterBtn = document.getElementById('player-theater-btn');
  const playerFullscreenBtn = document.getElementById('player-fullscreen-btn');
  const playerRestartBtn = document.getElementById('player-restart-btn');
  const playerBackBtn = document.getElementById('player-back-btn');
  const playerIframeCodeBtn = document.getElementById('player-iframe-code-btn');

  // Modal Elements
  const jsonModal = document.getElementById('json-modal');
  const jsonCodeView = document.getElementById('json-code-view');
  const modalTabJson = document.getElementById('modal-tab-json');
  const modalTabAdd = document.getElementById('modal-tab-add');
  const modalTabIframe = document.getElementById('modal-tab-iframe');
  const jsonTabContent = document.getElementById('json-tab-content');
  const addTabContent = document.getElementById('add-tab-content');
  const iframeTabContent = document.getElementById('iframe-tab-content');
  const singleIframeString = document.getElementById('single-iframe-string');
  const singleJsonView = document.getElementById('single-json-view');
  const btnCopyJson = document.getElementById('btn-copy-json');
  const btnDownloadJson = document.getElementById('btn-download-json');
  const btnCopySingleIframe = document.getElementById('btn-copy-single-iframe');
  const addGameForm = document.getElementById('add-game-form');

  // Panic Elements
  const panicScreen = document.getElementById('panic-screen');
  const btnPanic = document.getElementById('btn-panic');
  const btnResumePanic = document.getElementById('btn-resume-panic');

  // Load custom games & favorites from localStorage
  function loadPersistedData() {
    try {
      const favs = localStorage.getItem('firestudeo_favorites');
      if (favs) favorites = JSON.parse(favs);
    } catch (e) {
      favorites = [];
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('firestudeo_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }

  function getCustomGames() {
    try {
      const custom = localStorage.getItem('firestudeo_custom_games');
      return custom ? JSON.parse(custom) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomGame(game) {
    const custom = getCustomGames();
    custom.unshift(game);
    localStorage.setItem('firestudeo_custom_games', JSON.stringify(custom));
  }

  // Initialize data
  async function initCatalog() {
    loadPersistedData();
    let loadedGames = [];

    try {
      const res = await fetch('./games.json');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      loadedGames = Array.isArray(data) && data.length > 0 ? data : DEFAULT_GAMES;
    } catch (err) {
      // Fallback
      loadedGames = DEFAULT_GAMES;
    }

    const customList = getCustomGames();
    games = [...customList, ...loadedGames];

    // Update counters
    if (totalGamesCountEl) totalGamesCountEl.textContent = `${games.length} games indexed`;
    if (totalGamesStatEl) totalGamesStatEl.textContent = games.length;

    setupSpotlight();
    render();
  }

  function setupSpotlight() {
    const spotlight = games.find(g => g.featured) || games[0];
    if (!spotlight) return;

    if (spotlightTitle) spotlightTitle.textContent = spotlight.title;
    if (spotlightDesc) spotlightDesc.textContent = spotlight.description;
    if (spotlightMeta) {
      spotlightMeta.textContent = `${spotlight.category} · ★ ${spotlight.rating} · ${spotlight.plays} plays`;
    }

    if (btnPlaySpotlight) {
      btnPlaySpotlight.onclick = () => openGame(spotlight);
    }
    if (btnCodeSpotlight) {
      btnCodeSpotlight.onclick = () => openIframeModal(spotlight);
    }
  }

  function render() {
    const filtered = games.filter(g => {
      // Category
      if (currentCategory === 'Favorites') {
        if (!favorites.includes(g.id)) return false;
      } else if (currentCategory !== 'All') {
        if (g.category !== currentCategory) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = g.title.toLowerCase().includes(q);
        const inCat = g.category.toLowerCase().includes(q);
        const inDesc = g.description.toLowerCase().includes(q);
        const inTags = g.tags && g.tags.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inCat && !inDesc && !inTags) return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (currentSort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (currentSort === 'plays') return (parseInt(b.plays) || 0) - (parseInt(a.plays) || 0);
      if (currentSort === 'rating') return b.rating - a.rating;
      if (currentSort === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    // Render Cards
    gamesGrid.innerHTML = '';
    if (filtered.length === 0) {
      gamesGrid.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      gamesGrid.style.display = 'grid';
      emptyState.style.display = 'none';

      filtered.forEach(game => {
        const isFav = favorites.includes(game.id);
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
          <div class="game-thumb" style="background: radial-gradient(circle at 50% 50%, ${game.themeColor}22 0%, #090d16 100%);">
            <div class="game-thumb-icon" style="background: ${game.themeColor}18; border: 1px solid ${game.themeColor}55; color: ${game.themeColor};">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="6" y1="12" x2="10" y2="12"></line>
                <line x1="8" y1="10" x2="8" y2="14"></line>
                <line x1="15" y1="13" x2="15.01" y2="13"></line>
                <line x1="18" y1="11" x2="18.01" y2="11"></line>
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              </svg>
            </div>
            ${game.featured ? '<div class="game-featured-badge">★ Featured</div>' : ''}
            <button class="game-fav-btn ${isFav ? 'active' : ''}" title="Favorite">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
          <div class="game-card-body">
            <div class="game-meta">
              <span class="cat">${game.category}</span>
              <span>·</span>
              <span class="rating">★ ${game.rating.toFixed(1)}</span>
              <span>·</span>
              <span class="tabular-nums">${game.plays} plays</span>
            </div>
            <div class="game-title">${game.title}</div>
            <div class="game-desc">${game.description}</div>
            <div class="game-footer">
              <div class="game-tags">
                ${(game.tags || []).slice(0, 2).map((t, idx) => (idx > 0 ? '<span>/</span>' : '') + `<span>${t}</span>`).join('')}
              </div>
              <div class="game-actions">
                <button class="btn-card-iframe" title="Inspect stored iframe in games.json">&lt;iframe&gt;</button>
                <button class="btn-card-play">Play</button>
              </div>
            </div>
          </div>
        `;

        // Card Click Handlers
        card.querySelector('.game-thumb').onclick = (e) => {
          if (!e.target.closest('.game-fav-btn')) openGame(game);
        };
        card.querySelector('.game-title').onclick = () => openGame(game);
        card.querySelector('.btn-card-play').onclick = () => openGame(game);

        card.querySelector('.game-fav-btn').onclick = (e) => {
          e.stopPropagation();
          toggleFavorite(game.id);
        };

        card.querySelector('.btn-card-iframe').onclick = (e) => {
          e.stopPropagation();
          openIframeModal(game);
        };

        gamesGrid.appendChild(card);
      });
    }

    if (gamesCountEl) gamesCountEl.textContent = filtered.length;
    if (categoryFilterLabel) {
      categoryFilterLabel.textContent = currentCategory !== 'All' ? ` in ${currentCategory}` : '';
    }
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(item => item !== id);
    } else {
      favorites.push(id);
    }
    saveFavorites();
    render();
    if (activeGame && activeGame.id === id) {
      updatePlayerFavBtn();
    }
  }

  function openGame(game) {
    activeGame = game;
    catalogView.style.display = 'none';
    playerView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Set Info
    playerGameTitle.textContent = game.title;
    playerGameMeta.innerHTML = `<span style="font-weight:600; color:#cbd5e1;">${game.category}</span> · <span style="color:#f59e0b; font-weight:600;">★ ${game.rating.toFixed(1)}</span> · <span class="tabular-nums">${game.plays} plays</span>`;
    playerGameDesc.textContent = game.description;
    playerGameControls.textContent = game.controls;

    updatePlayerFavBtn();
    renderIframe(game.iframe);
  }

  function renderIframe(iframeCode) {
    stageWrapper.innerHTML = '';
    // Check if it has a src attribute to create native iframe or insert code
    const srcMatch = iframeCode.match(/src=["']([^"']+)["']/i);
    const iframe = document.createElement('iframe');
    iframe.allowFullscreen = true;
    iframe.setAttribute('allow', 'autoplay; fullscreen; gamepad; focus-without-user-activation *');
    if (srcMatch) {
      iframe.src = srcMatch[1];
    } else {
      // fallback html doc insertion
      iframe.srcdoc = iframeCode;
    }
    stageWrapper.appendChild(iframe);
  }

  function closeGame() {
    activeGame = null;
    stageWrapper.innerHTML = '';
    playerView.style.display = 'none';
    catalogView.style.display = 'block';
    render();
  }

  function updatePlayerFavBtn() {
    if (!activeGame) return;
    const isFav = favorites.includes(activeGame.id);
    playerFavBtn.style.color = isFav ? '#f59e0b' : '#94a3b8';
    playerFavBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span>${isFav ? 'Favorited' : 'Favorite'}</span>
    `;
  }

  // Modals & Panels
  function openJsonModal() {
    jsonModal.classList.add('active');
    modalTabJson.classList.add('active');
    modalTabAdd.classList.remove('active');
    if (modalTabIframe) modalTabIframe.style.display = 'none';

    jsonTabContent.style.display = 'block';
    addTabContent.style.display = 'none';
    if (iframeTabContent) iframeTabContent.style.display = 'none';

    jsonCodeView.textContent = JSON.stringify(games, null, 2);
  }

  function openIframeModal(game) {
    jsonModal.classList.add('active');
    modalTabJson.classList.remove('active');
    modalTabAdd.classList.remove('active');
    if (modalTabIframe) {
      modalTabIframe.style.display = 'inline-block';
      modalTabIframe.classList.add('active');
    }

    jsonTabContent.style.display = 'none';
    addTabContent.style.display = 'none';
    if (iframeTabContent) iframeTabContent.style.display = 'block';

    singleIframeString.textContent = game.iframe;
    singleJsonView.textContent = JSON.stringify(game, null, 2);
  }

  function closeJsonModal() {
    jsonModal.classList.remove('active');
  }

  // Panic Cloak
  function togglePanic() {
    isPanic = !isPanic;
    if (isPanic) {
      document.title = 'Unit 4 Assignment: World History Notes - Google Docs';
      panicScreen.classList.add('active');
    } else {
      document.title = 'firestudeo - Unblocked Games Hub';
      panicScreen.classList.remove('active');
    }
  }

  // Event Listeners
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      render();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    render();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    render();
  });

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    render();
  });

  // Nav actions
  document.getElementById('nav-json-btn').onclick = openJsonModal;
  document.getElementById('btn-add-game').onclick = () => {
    openJsonModal();
    modalTabAdd.click();
  };
  document.getElementById('btn-random-game').onclick = () => {
    if (games.length > 0) {
      const random = games[Math.floor(Math.random() * games.length)];
      openGame(random);
    }
  };

  btnPanic.onclick = togglePanic;
  btnResumePanic.onclick = togglePanic;

  // Player view buttons
  playerBackBtn.onclick = closeGame;
  playerRestartBtn.onclick = () => {
    if (activeGame) renderIframe(activeGame.iframe);
  };
  playerTheaterBtn.onclick = () => {
    isTheater = !isTheater;
    stageWrapper.classList.toggle('theater', isTheater);
    playerTheaterBtn.querySelector('span').textContent = isTheater ? 'Default View' : 'Theater';
  };
  playerFullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
      stageWrapper.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };
  playerFavBtn.onclick = () => {
    if (activeGame) toggleFavorite(activeGame.id);
  };
  playerIframeCodeBtn.onclick = () => {
    if (activeGame) openIframeModal(activeGame);
  };

  // Modal tabs
  modalTabJson.onclick = () => {
    modalTabJson.classList.add('active');
    modalTabAdd.classList.remove('active');
    if (modalTabIframe) modalTabIframe.classList.remove('active');
    jsonTabContent.style.display = 'block';
    addTabContent.style.display = 'none';
    if (iframeTabContent) iframeTabContent.style.display = 'none';
  };

  modalTabAdd.onclick = () => {
    modalTabAdd.classList.add('active');
    modalTabJson.classList.remove('active');
    if (modalTabIframe) modalTabIframe.classList.remove('active');
    jsonTabContent.style.display = 'none';
    addTabContent.style.display = 'block';
    if (iframeTabContent) iframeTabContent.style.display = 'none';
  };

  document.getElementById('modal-close-btn').onclick = closeJsonModal;
  jsonModal.onclick = (e) => {
    if (e.target === jsonModal) closeJsonModal();
  };

  btnCopyJson.onclick = () => {
    navigator.clipboard.writeText(JSON.stringify(games, null, 2));
    btnCopyJson.textContent = 'Copied!';
    setTimeout(() => btnCopyJson.textContent = 'Copy JSON', 1800);
  };

  btnDownloadJson.onclick = () => {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (btnCopySingleIframe) {
    btnCopySingleIframe.onclick = () => {
      navigator.clipboard.writeText(singleIframeString.textContent);
      btnCopySingleIframe.textContent = 'Copied!';
      setTimeout(() => btnCopySingleIframe.textContent = 'Copy Iframe', 1800);
    };
  }

  // Add custom game form
  addGameForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('new-game-title').value.trim();
    const cat = document.getElementById('new-game-category').value;
    const desc = document.getElementById('new-game-desc').value.trim();
    const controls = document.getElementById('new-game-controls').value.trim();
    const iframeHtml = document.getElementById('new-game-iframe').value.trim();

    if (!title || !iframeHtml.includes('<iframe')) {
      alert('Please provide a valid Title and <iframe> tag.');
      return;
    }

    const newGame = {
      id: 'custom-' + Date.now(),
      title,
      category: cat,
      description: desc || 'Custom unblocked community game.',
      controls: controls || 'Mouse or Keyboard',
      rating: 4.8,
      plays: '1K',
      themeColor: '#38bdf8',
      tags: [cat, 'Custom'],
      iframe: iframeHtml
    };

    saveCustomGame(newGame);
    games.unshift(newGame);
    addGameForm.reset();
    closeJsonModal();
    render();
    openGame(newGame);
  };

  // Global hotkeys (Panic key: [ or Esc, Search: /)
  window.addEventListener('keydown', (e) => {
    if (e.key === '[') {
      togglePanic();
    } else if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape') {
      if (jsonModal.classList.contains('active')) closeJsonModal();
      if (isPanic) togglePanic();
    }
  });

  // Start applet
  initCatalog();
})();
