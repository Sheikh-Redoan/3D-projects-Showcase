import { useState, useRef, useEffect } from 'react';
import '@google/model-viewer';
import './App.css';
import {
  Search,
  Upload,
  Info,
  RotateCcw,
  Download,
  Heart,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Sun,
  Moon,
  Share2,
  Eye,
  Grid,
  List,
  Settings,
  Zap,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

function App() {
  const defaultModels = [
    {
      id: 'Redoan',
      name: 'Sheikh Redoan',
      src: '/Sheikh-Redoan.glb',
      type: 'preset',
      category: 'Character',
      description: 'The developer who has made this website'
    },
    {
      id: 'catWarrior',
      name: 'Cat Warrior',
      src: '/Cat-Warrior.glb',
      type: 'preset',
      category: 'Character',
      description: 'Feline warrior character'
    },
    {
      id: 'Alien',
      name: 'Water Alien baby',
      src: '/Water-Alien-baby.glb',
      type: 'preset',
      category: 'Character',
      description: 'water alien character'
    },
    {
      id: 'Scorpion',
      name: 'Mechanical Scorpion',
      src: '/mechanical-scorpion.glb',
      type: 'preset',
      category: 'Car',
      description: 'Mechanical scorpion car'
    },
    {
      id: 'Lamborghini',
      name: 'Lamborghini Huracan',
      src: '/lambo.glb',
      type: 'preset',
      category: 'Car',
      description: 'Futuristic car'
    },
    {
      id: 'LisaTheDragon',
      name: 'Lisa The Dragon Princes',
      src: '/Lisa-The-Dragon-princes.glb',
      type: 'preset',
      category: 'Character',
      description: 'Futuristic princess character'
    },
    {
      id: 'alien',
      name: 'Alien Scout',
      src: '/Meshy_AI_A_Scout_from_an_alien_1226194048_texture.glb',
      type: 'preset',
      category: 'Character',
      description: 'Futuristic alien scout character'
    },
    {
      id: 'JackDAniels',
      name: 'Jack DAniels',
      src: '/Jack-DAniels.glb',
      type: 'preset',
      category: 'Object',
      description: 'A bottle of Jack Daniels'
    },
    {
      id: 'iceKnight',
      name: 'Ice Knight',
      src: '/ice-knight.glb',
      type: 'preset',
      category: 'Character',
      description: 'Knight with ice-themed armor'
    },
    {
      id: 'snakeDagger',
      name: 'Snake Dagger',
      src: '/snake-dagger.glb',
      type: 'preset',
      category: 'Weapon',
      description: 'Dagger with snake-themed design'
    },
    {
      id: 'iceKnigf',
      name: 'Ice Knight Weapon',
      src: '/ice-knigf.glb',
      type: 'preset',
      category: 'Weapon',
      description: 'Alternative ice knight character'
    },
    {
      id: 'iceLadyWizard',
      name: 'Ice Lady Wizard',
      src: '/ice-leady-wizerd.glb',
      type: 'preset',
      category: 'Character',
      description: 'Ice-themed female wizard character'
    },
    {
      id: 'ladyWizard',
      name: 'Lady Wizard',
      src: '/leady-wizerd.glb',
      type: 'preset',
      category: 'Character',
      description: 'Female wizard character'
    }
  ];

  const [models, setModels] = useState(defaultModels);
  const [selectedModel, setSelectedModel] = useState(defaultModels[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showSettings, setShowSettings] = useState(false);
  const [environment, setEnvironment] = useState('neutral');
  const [exposure, setExposure] = useState(1);
  const [shadowIntensity, setShadowIntensity] = useState(1);
  const modelViewerRef = useRef(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newModel = {
        id: `custom-${Date.now()}`,
        name: file.name.replace(/\.(glb|gltf)$/i, ''),
        src: url,
        type: 'custom',
        category: 'Custom',
        description: 'User uploaded model'
      };
      setModels((prev) => [newModel, ...prev]);
      setSelectedModel(newModel);
    }
  };

  const downloadModel = async (model) => {
    try {
      const response = await fetch(model.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${model.name}.glb`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download model. Please try again.');
    }
  };

  const toggleFavorite = (modelId) => {
    setFavorites((prev) =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  };

  const shareModel = async (model) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: model.name,
          text: model.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const takeScreenshot = () => {
    if (modelViewerRef.current) {
      const dataUrl = modelViewerRef.current.toDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${selectedModel.name}-screenshot.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const toggleFullscreen = () => {
    const element = document.querySelector('.viewer-wrapper');
    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const filteredModels = models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || model.category === filterCategory;
    const matchesFavorites = filterCategory === 'Favorites' ? favorites.includes(model.id) : true;
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const categories = ['All', 'Favorites', ...new Set(models.map((m) => m.category))];

  const resetCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.resetTurntableRotation();
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>🎨 3D Gallery</h1>
          <p>Explore & Interact</p>
        </div>

        <div className="search-section">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-section">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat === 'Favorites' && <Heart size={14} />}
              {cat}
            </button>
          ))}
        </div>

        <div className="view-mode-toggle">
          <button
            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="section-title">
            Library <span className="count">({filteredModels.length})</span>
          </div>
          <div className={`model-${viewMode}`}>
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className={`model-card ${selectedModel.id === model.id ? 'active' : ''}`}
                onClick={() => setSelectedModel(model)}
              >
                <div className="card-preview">
                  <model-viewer
                    src={model.src}
                    alt={model.name}
                    auto-rotate
                    camera-controls
                    disable-zoom
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                  ></model-viewer>
                  <button
                    className="favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(model.id);
                    }}
                    title={favorites.includes(model.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      size={16}
                      fill={favorites.includes(model.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
                <div className="card-info">
                  <h3>{model.name}</h3>
                  <span className="category-tag">{model.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <label htmlFor="modelFile" className="upload-btn">
            <Upload size={18} />
            <span>Import Model</span>
            <input
              type="file"
              id="modelFile"
              accept=".glb,.gltf"
              onChange={handleFileUpload}
              className="file-input"
            />
          </label>
        </div>
      </aside>

      <main className="main-content">
        <div className="viewer-header">
          <div className="header-left">
            <h2>{selectedModel.name}</h2>
            <p className="description">{selectedModel.description}</p>
          </div>
          <div className="header-right">
            <button
              className="icon-btn"
              onClick={() => downloadModel(selectedModel)}
              title="Download Model"
            >
              <Download size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={() => shareModel(selectedModel)}
              title="Share Model"
            >
              <Share2 size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={takeScreenshot}
              title="Take Screenshot"
            >
              <Camera size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? 'Pause Rotation' : 'Start Rotation'}
            >
              {autoRotate ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              className="icon-btn"
              onClick={() => setShowInfo(!showInfo)}
              title="Info"
            >
              <Info size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setShowSettings(!showSettings)}
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={resetCamera}
              title="Reset Camera"
            >
              <RotateCcw size={18} />
            </button>
            <button
              className="icon-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <span className="badge">
              {selectedModel.type === 'preset' ? (
                <>
                  <Zap size={14} /> Official
                </>
              ) : (
                <>
                  <Upload size={14} /> Custom
                </>
              )}
            </span>
          </div>
        </div>

        <div className="viewer-wrapper">
          <model-viewer
            ref={modelViewerRef}
            src={selectedModel.src}
            alt={`3D model of ${selectedModel.name}`}
            auto-rotate={autoRotate}
            camera-controls
            ar
            shadow-intensity={shadowIntensity}
            loading="eager"
            environment-image={environment}
            exposure={exposure}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent'
            }}
          ></model-viewer>

          {showInfo && (
            <div className="info-panel">
              <div className="panel-header">
                <h3>
                  <Eye size={18} />
                  Model Information
                </h3>
                <button className="close-btn" onClick={() => setShowInfo(false)}>
                  ×
                </button>
              </div>
              <div className="info-item">
                <strong>Name:</strong> {selectedModel.name}
              </div>
              <div className="info-item">
                <strong>Category:</strong> {selectedModel.category}
              </div>
              <div className="info-item">
                <strong>Type:</strong>{' '}
                {selectedModel.type === 'preset' ? 'Preset Model' : 'Custom Upload'}
              </div>
              <div className="info-item">
                <strong>Description:</strong> {selectedModel.description}
              </div>
              <div className="info-actions">
                <button
                  className="action-btn"
                  onClick={() => toggleFavorite(selectedModel.id)}
                >
                  <Heart
                    size={16}
                    fill={favorites.includes(selectedModel.id) ? 'currentColor' : 'none'}
                  />
                  {favorites.includes(selectedModel.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </div>
          )}

          {showSettings && (
            <div className="settings-panel">
              <div className="panel-header">
                <h3>
                  <Settings size={18} />
                  Viewer Settings
                </h3>
                <button className="close-btn" onClick={() => setShowSettings(false)}>
                  ×
                </button>
              </div>

              <div className="setting-group">
                <label>Environment</label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  className="setting-select"
                >
                  <option value="neutral">Neutral</option>
                  <option value="studio">Studio</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="forest">Forest</option>
                </select>
              </div>

              <div className="setting-group">
                <label>Exposure: {exposure.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={exposure}
                  onChange={(e) => setExposure(parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>

              <div className="setting-group">
                <label>Shadow Intensity: {shadowIntensity.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={shadowIntensity}
                  onChange={(e) => setShadowIntensity(parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>

              <div className="setting-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => setAutoRotate(e.target.checked)}
                  />
                  Auto-rotate
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="controls-panel">
          <div className="controls-hint">
            <span>
              <Eye size={16} /> Left Click: Rotate
            </span>
            <span>
              <Search size={16} /> Scroll: Zoom
            </span>
            <span>
              <ImageIcon size={16} /> Right Click: Pan
            </span>
            <span>
              <Camera size={16} /> AR Ready
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;