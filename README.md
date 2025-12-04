# ♟️ Chess Game

A real-time, multiplayer chess application built with React and Socket.IO that brings the classic game of chess to your browser with a modern, responsive interface.

![Chess Game](https://img.shields.io/badge/Game-Chess-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.5-black)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Real-time Multiplayer** - Play against opponents in real-time using WebSocket connections
- **Chess Engine** - Powered by chess.js for accurate move validation and game logic
- **Interactive Board** - Smooth drag-and-drop piece movement with visual feedback
- **Timer System** - Built-in game clocks with countdown timers for each player
- **Move History** - Complete move notation tracking with game replay capability
- **Audio Feedback** - Sound effects for moves, captures, and game events
- **Player Profiles** - Display player information and captured pieces
- **Responsive Design** - Optimized for desktop and mobile devices using Tailwind CSS
- **Game Controls** - Resign, abort, and rematch functionality
- **Waiting Room** - Lobby system for matchmaking and game initialization

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sachinkg-13/chess.com.git
   cd chess.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the game server** (in a separate terminal)
   ```bash
   npm run server
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to start playing!

## 🎮 How to Play

1. **Join a Game** - Click "Start New Game" from the home page
2. **Wait for Opponent** - The first player gets white pieces, second player gets black
3. **Make Your Move** - Drag and drop pieces or click to select and move
4. **Watch the Clock** - Each player has 10 minutes on their clock
5. **Win the Game** - Checkmate your opponent or force them to run out of time!

## 🛠️ Tech Stack

### Frontend
- **React** - UI component library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **react-chessboard** - Interactive chess board component
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web server framework
- **Socket.IO** - Real-time bidirectional communication
- **chess.js** - Chess game logic and move validation

## 📁 Project Structure

```
chess.com/
├── public/              # Static assets
│   ├── audios/         # Game sound effects
│   └── js/             # Additional scripts
├── src/
│   ├── components/     # React components
│   │   ├── Game/      # Game-specific components
│   │   │   ├── Board.jsx
│   │   │   ├── MoveHistory.jsx
│   │   │   └── PlayerProfile.jsx
│   │   ├── UI/        # Reusable UI components
│   │   │   └── Modal.jsx
│   │   ├── GameSidebar.jsx
│   │   ├── HomePage.jsx
│   │   └── WaitingRoom.jsx
│   ├── hooks/         # Custom React hooks
│   │   ├── useChessAudio.js
│   │   └── useChessGame.js
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── server.js          # Socket.IO game server
└── package.json       # Project dependencies
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server` | Start game server |
| `npm run lint` | Run ESLint |

## 🔧 Configuration

### Server Port
The game server runs on port 3000 by default. You can modify this in `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

### Game Time
Default game time is 10 minutes per player. Adjust in `App.jsx`:
```javascript
const [whiteTime, setWhiteTime] = useState(600); // in seconds
const [blackTime, setBlackTime] = useState(600);
```

## 🎨 Customization

The project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      // Add your custom colors, fonts, etc.
    },
  },
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) - Chess game logic
- [react-chessboard](https://github.com/Clariity/react-chessboard) - Chess board component
- [Socket.IO](https://socket.io/) - Real-time communication
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📧 Contact

Sachin KG - [@sachinkg-13](https://github.com/sachinkg-13)

Project Link: [https://github.com/sachinkg-13/chess.com](https://github.com/sachinkg-13/chess.com)

---

<div align="center">
Made with ♟️ and ⚡ by Sachin KG
</div>
