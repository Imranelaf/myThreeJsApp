# 🌌 Three.js Galaxy Simulation

A visually engaging, interactive 3D galaxy simulation, using custom shaders to animate thousands of stars in a spiral structure.

## 🚀 Features

- Realistic spiral galaxy using points and shaders  
- Custom GLSL shaders for dynamic star glow and rotation  
- Adjustable parameters for number of stars, spin, radius, randomness, and colors  
- Interactive camera controls using OrbitControls  
- Smooth animation loop with time-based transformation  

## 🖼️ Preview

Screenshot


## 📦 Installation & Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/threejs-galaxy.git
cd threejs-galaxy
```

### 2. Install dependencies (if using a bundler)

```bash
npm install
```

### 3. Start the development server

#### If using Vite:

```bash
npm run dev
```

#### If using Webpack:

```bash
npx webpack serve
```

## 🧰 Folder Structure

```
.
├── index.html
├── script.js          # Main logic for galaxy creation
├── style.css          # Canvas and body styling
├── screenshot.png     # Optional: galaxy preview image
├── package.json       # Optional: if using bundler
└── README.md
```

## ✨ Customization

Galaxy parameters can be adjusted in `script.js`:

```js
let stars = {
  number: 3000,
  radius: 5,
  branches: 5,
  spin: 2,
  randomness: 0.4,
  depthColor: '#de6c1d',
  faceColor: '#1d3fde'
};
```

These can also be connected to dat.GUI for live tweaking in the browser.


---

Enjoy building galaxies! 🌠  
