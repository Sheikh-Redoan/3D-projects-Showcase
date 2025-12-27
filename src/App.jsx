import { useState, useRef } from 'react';
import '@google/model-viewer';
import './App.css';

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
      id: 'astronaut',
      name: 'Astronaut',
      src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      type: 'preset',
      category: 'Character',
      description: 'Space explorer in full gear'
    },
    {
      id: 'JackDAniels',
      name: 'Jack DAniels',
      src: '/Jack-DAniels.glb',
      type: 'preset',
      category: 'Object',
      description: 'A bottle of Jack Daniels'
    },
  ];

  const [models, setModels] = useState(defaultModels);
  const [selectedModel, setSelectedModel] = useState(defaultModels[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showInfo, setShowInfo] = useState(false);
  const modelViewerRef = useRef(null);

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

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || model.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(models.map(m => m.category))];

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
          <input
            type="text"
            placeholder="🔍 Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sidebar-content">
          <div className="section-title">
            Library <span className="count">({filteredModels.length})</span>
          </div>
          <div className="model-grid">
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
            <span>📤 Import Model</span>
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
            <button className="icon-btn" onClick={() => setShowInfo(!showInfo)} title="Info">
              ℹ️
            </button>
            <button className="icon-btn" onClick={resetCamera} title="Reset Camera">
              🔄
            </button>
            <span className="badge">{selectedModel.type === 'preset' ? '✨ Official' : '📁 Custom'}</span>
          </div>
        </div>

        <div className="viewer-wrapper">
          <model-viewer
            ref={modelViewerRef}
            src={selectedModel.src}
            alt={`3D model of ${selectedModel.name}`}
            auto-rotate
            camera-controls
            ar
            shadow-intensity="1"
            loading="eager"
            environment-image="neutral"
            exposure="1"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent'
            }}
          ></model-viewer>

          {showInfo && (
            <div className="info-panel">
              <h3>Model Information</h3>
              <div className="info-item">
                <strong>Name:</strong> {selectedModel.name}
              </div>
              <div className="info-item">
                <strong>Category:</strong> {selectedModel.category}
              </div>
              <div className="info-item">
                <strong>Type:</strong> {selectedModel.type === 'preset' ? 'Preset Model' : 'Custom Upload'}
              </div>
              <div className="info-item">
                <strong>Description:</strong> {selectedModel.description}
              </div>
            </div>
          )}
        </div>

        <div className="controls-panel">
          <div className="controls-hint">
            <span>🖱️ Left Click: Rotate</span>
            <span>🔍 Scroll: Zoom</span>
            <span>✋ Right Click: Pan</span>
            <span>📱 AR Ready</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;