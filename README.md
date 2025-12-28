# 🎨 3D Gallery

<div align="center">

![3D Gallery Preview](image_8f6307.jpg)

**A modern, interactive 3D model viewer and gallery**

[Live Demo](https://3d-project-showcase.netlify.app/) • [Report Bug](https://github.com/yourusername/3d-gallery/issues) • [Request Feature](https://github.com/yourusername/3d-gallery/issues)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

3D Gallery is a powerful web application built with React and Google's `<model-viewer>` that provides an immersive experience for exploring and interacting with 3D models. Whether you're a designer showcasing your work, a developer exploring 3D web technologies, or simply curious about 3D assets, this gallery offers a seamless and intuitive interface.

---

## ✨ Features

### 🖼️ Core Functionality
- **Interactive 3D Viewing** - Rotate, zoom, and pan around models with smooth, intuitive controls
- **Curated Model Library** - Pre-loaded collection featuring characters, vehicles, weapons, and objects
- **Custom Model Upload** - Import your own `.glb` or `.gltf` files for instant viewing
- **Search & Filter** - Quick search by name and filter by categories (Character, Car, Weapon, Object, etc.)
- **Favorites System** - Save favorite models with persistent storage via LocalStorage

### 🎨 Viewing Options
- **Multiple View Modes** - Switch between Grid and List layouts in the sidebar
- **Environment Presets** - Choose from Neutral, Studio, Warehouse, or Forest lighting
- **Advanced Lighting Controls**
  - Adjustable exposure for brightness control
  - Shadow intensity customization
  - Auto-rotate feature for continuous turntable display

### 🛠️ Utility Tools
- **Screenshot Capture** - Save high-quality PNG images of your current view
- **Fullscreen Mode** - Immersive viewing experience
- **AR Support** - View models in Augmented Reality on compatible mobile devices
- **Model Download** - Export `.glb` source files directly
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** (Vite) | Frontend framework for building the UI |
| **`<model-viewer>`** | Google's Web Component for 3D rendering |
| **CSS3** | Styling with custom properties, Flexbox, and Grid |
| **Lucide React** | Modern icon library |
| **React Hooks** | State management (`useState`, `useEffect`, `useRef`) |
| **Netlify** | Deployment and hosting |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/3d-gallery.git
   cd 3d-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173` (or the port displayed in your terminal)

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be generated in the `dist/` directory.

---

## 📖 Usage Guide

### Browsing the Library

1. Use the **sidebar** on the left to browse the model collection
2. Click on any **model card** to load it in the main viewer
3. Use the **category filters** at the top to narrow down results
4. Toggle between **Grid** and **List** view using the view mode buttons

### Interacting with Models

| Action | Control |
|--------|---------|
| **Rotate** | Left Click + Drag |
| **Pan** | Right Click + Drag |
| **Zoom** | Scroll Wheel |

### Uploading Custom Models

1. Click the **"Import Model"** button at the bottom of the sidebar
2. Select a `.glb` or `.gltf` file from your device
3. Your model will appear in the list with a **"Custom"** tag
4. Interact with it just like the pre-loaded models

### Customizing the Viewer

1. Click the **Settings (⚙️)** icon in the top-right corner
2. Adjust the following parameters:
   - **Environment** - Change the lighting preset
   - **Exposure** - Control overall brightness
   - **Shadow Intensity** - Adjust shadow darkness
   - **Auto-Rotate** - Enable/disable automatic rotation

### Additional Tools

- **❤️ Favorites** - Click the heart icon to save models to your favorites
- **📸 Screenshot** - Capture the current view as a PNG image
- **⛶ Fullscreen** - Enter immersive fullscreen mode
- **📱 AR View** - Launch AR experience on supported devices
- **⬇️ Download** - Download the model's source file

---

## 📂 Project Structure

```
3d-gallery/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, SVGs, and other static assets
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the project
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Contact

**Sheikh Redoan**  
Developer & Creator

- GitHub: [@Sheikh-Redoan](https://github.com/Sheikh-Redoan)
- Project Link: [https://github.com/Sheikh-Redoan/3d-gallery](https://github.com/Sheikh-Redoan/3d-gallery)
- Live Demo: [https://3d-project-showcase.netlify.app/](https://3d-project-showcase.netlify.app/)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Built with ❤️ using React and 3D Web Technologies

</div>
