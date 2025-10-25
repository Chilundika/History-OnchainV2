# History-Onchain 🏛️

<div align="center">

**Discover historical monuments through camera recognition and earn blockchain rewards**

Built with **Coinbase OnchainKit** | Powered by **Base** | Styled with **Post Theme**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![OnchainKit](https://img.shields.io/badge/OnchainKit-Latest-0052FF)](https://onchainkit.xyz/)
[![Base](https://img.shields.io/badge/Base-Mainnet-blue)](https://base.org/)

</div>

---

## 🌟 Overview

History-Onchain is a Web3-enabled mobile-first application that gamifies cultural discovery. Users capture monuments with their camera, learn historical facts, and earn points and rewards on the Base blockchain.

### Key Features

- 📱 **Camera-Based Monument Recognition** - Point and learn
- 🎮 **Gamification System** - Earn points, level up, unlock achievements  
- 🔐 **Web3 Authentication** - Connect wallet with OnchainKit
- 🎨 **Post Theme Design** - Beautiful, minimalist UI with soft shadows
- 💾 **Local Progress Tracking** - No backend required
- 🌙 **Dark Mode Support** - Automatic theme switching

---

## 📸 Screenshots

### Main Interface
- Rewards display with progress tracking
- Camera interface for monument discovery
- Post Theme styling with soft shadows

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Coinbase OnchainKit API key

### Installation

```bash
# Clone the repository
cd History

# Install dependencies
npm install

# Create environment file
cp env.example .env.local
```

### Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=History-Onchain
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 🏗️ Architecture

```
History/
├── app/
│   ├── api/
│   │   └── recognize/          # Monument recognition API
│   │       └── route.ts
│   ├── components/
│   │   ├── DemoComponents.tsx   # Shared UI components
│   │   ├── MonumentCamera.tsx   # Camera & recognition
│   │   └── RewardsDisplay.tsx   # Progress display
│   ├── lib/
│   │   └── types.ts             # TypeScript interfaces
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── theme.css                # Post Theme styles
├── lib/
│   ├── notification.ts          # Notification service
│   └── redis.ts                 # Redis client
└── package.json
```

---

## 🎨 Design System

### Post Theme Color Palette

#### Light Mode
- **Background**: `#F5F1E8` (Warm beige)
- **Foreground**: `#2C2C2C` (Dark grey)
- **Accent**: `#4A90E2` (Soft blue)
- **Card**: `#FAFAFA` (Off-white)

#### Dark Mode
- **Background**: `#1A1A1A` (Dark grey)
- **Foreground**: `#E8E8E8` (Light grey)
- **Accent**: `#5BA3F5` (Brighter blue)
- **Card**: `#242424` (Dark card)

### Shadow System
- **Standard**: Subtle depth for cards
- **Long**: Enhanced emphasis
- **Hover**: Smooth transitions

---

## 🔑 Features

### 1. Monument Recognition

Currently uses mock data with 6 historical monuments:

1. Great Pyramid of Giza (Egypt)
2. The Colosseum (Italy)
3. Stonehenge (England)
4. Machu Picchu (Peru)
5. Great Wall of China
6. Taj Mahal (India)

**To implement real AI**:
- Integrate Google Vision API or AWS Rekognition
- Replace mock logic in `app/api/recognize/route.ts`

### 2. Rewards System

- **+25 points** per discovery
- **Level calculation**: `floor(totalPoints / 100)`
- **Visual progress bar** to next level
- **LocalStorage** persistence
- **Achievement badges** unlocked

### 3. Camera Integration

- Uses `MediaDevices.getUserMedia()` API
- Mobile-friendly camera access
- Canvas-based image capture
- Automatic stream cleanup

### 4. Wallet Connection

- **OnchainKit Connect Wallet** as primary authentication
- Smart wallet creation on Base
- Session persistence
- Address and balance display

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.5** (App Router)
- **React 19.1.0** with TypeScript
- **Tailwind CSS 4** for styling
- **Lucide React** for icons

### Web3
- **Coinbase OnchainKit** - Wallet & UI components
- **Wagmi** - React Hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **Base** - L2 blockchain network

### Development
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly UI elements
- Native camera API support
- Optimized performance
- PWA-ready (optional)

---

## 🔒 Security & Privacy

- ✅ Non-custodial wallet connection
- ✅ Local storage only (no external tracking)
- ✅ Secure OnchainKit integration
- ✅ No personal data collection
- ✅ HTTPS-only in production

---

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Testing

```bash
# Run tests (when implemented)
npm test
```

---

## 📦 Dependencies

### Core
```json
{
  "next": "^15.3.3",
  "react": "^18",
  "react-dom": "^18",
  "@coinbase/onchainkit": "latest",
  "wagmi": "^2.16.0",
  "viem": "^2.27.2"
}
```

### Development
```json
{
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "eslint": "^8",
  "prettier": "^3.5.3"
}
```

---

## 🚧 Future Roadmap

- [ ] Real AI monument recognition (Google Vision/AWS Rekognition)
- [ ] Cloud sync for cross-device progress
- [ ] NFT achievement system
- [ ] Social sharing features
- [ ] Expanded monument database (100+ monuments)
- [ ] AR features with location-based discovery
- [ ] Multi-language support (i18n)
- [ ] User profiles and leaderboards
- [ ] Decentralized storage (IPFS)
- [ ] Community challenges and events

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Coinbase** for OnchainKit and Base
- **Base Team** for the amazing L2 infrastructure
- **Next.js Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework

---

## 📞 Contact & Support

- **Documentation**: See `HISTORY-ONCHAIN-README.md`
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions

---

## 🌍 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Set these in your hosting platform:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME`

---

<div align="center">

**Built with ❤️ on Base**

Made with [OnchainKit](https://onchainkit.xyz) • Powered by [Base](https://base.org)

[Report Bug](https://github.com/your-repo/issues) • [Request Feature](https://github.com/your-repo/issues) • [Documentation](https://github.com/your-repo/wiki)

</div>