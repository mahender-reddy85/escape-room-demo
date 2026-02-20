<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 3D Escape Room Challenge

An interactive 3D escape room game built with React, Three.js, and TypeScript. Solve puzzles, find clues, and escape from challenging rooms using your problem-solving skills.

## Features

- **3D Environment**: Immersive 3D rooms built with Three.js and React Three Fiber
- **Interactive Puzzles**: Multiple levels with unique challenges and puzzles to solve
- **Point & Click Gameplay**: Intuitive controls for exploring and interacting with objects
- **Dynamic Lighting**: Realistic lighting effects that enhance the atmosphere
- **Progressive Difficulty**: Levels increase in complexity as you advance

## Tech Stack

- **React 19** - Modern React with hooks and functional components
- **Three.js** - 3D graphics library for creating immersive environments
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers and abstractions for React Three Fiber
- **GSAP** - Animation library for smooth transitions
- **TypeScript** - Type-safe development
- **Vite** - Fast development server and build tool

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd escape-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## How to Play

1. **Start the Game**: Click "Start Game" on the main menu
2. **Explore**: Use your mouse to look around the 3D environment
3. **Interact**: Click on objects to interact with them
4. **Solve Puzzles**: Find clues and solve puzzles to progress through levels
5. **Escape**: Complete all challenges to escape the room

## Game Controls

- **Mouse Movement**: Look around the 3D environment
- **Left Click**: Interact with objects and select items
- **Mouse Wheel**: Zoom in/out (where supported)

## Project Structure

```
escape-demo/
├── components/          # React components
│   ├── GameScene.tsx   # Main 3D game scene
│   ├── UIOverlay.tsx   # Game UI and HUD
│   └── StartScreen.tsx # Main menu and start screen
├── constants.ts        # Game constants and level data
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
└── public/            # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
