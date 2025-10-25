# History-Onchain 🏛️

A Web3-enabled mobile-first application that allows users to discover historical monuments through camera recognition and earn blockchain-based rewards. Built with **Coinbase OnchainKit** and **Post Theme** design aesthetic.

## 🌟 Features

### Primary Authentication
- **Connect Wallet (OnchainKit)** - Main authentication method using Coinbase's OnchainKit Connect Wallet
- Smart wallet creation on Base network
- Wallet address and network info display
- Persistent session management

### Monument Discovery
- Camera interface for capturing images
- AI-powered monument recognition (currently mocked)
- Returns monument details: name, location, year, description, and fun facts
- Points-based reward system

### Gamification
- **Points System**: Earn +25 points per monument discovery
- **Leveling System**: Level = totalPoints / 100
- **Progress Tracking**: Visual progress bar to next level
- **Achievements**: Badges and milestones
- **Local Storage**: All progress saved locally on device

### Post Theme Design
- **Soft shadows** for depth and modern look
- **Muted color palette**: Warm beiges, light greys
- **Light & Dark Mode** support
- **Minimalistic UI** with clean typography
- **Smooth animations** and transitions

## 📁 Project Structure

```
History/
├── app/
│   ├── api/
│   │   └── recognize/
│   │       └── route.ts          # Monument recognition API
│   ├── components/
│   │   ├── DemoComponents.tsx    # Shared UI components
│   │   ├── MonumentCamera.tsx    # Camera & recognition
│   │   └── RewardsDisplay.tsx    # Progress & points display
│   ├── lib/
│   │   └── types.ts              # TypeScript interfaces
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main app page
│   └── theme.css                 # Post Theme styles
└── lib/
```

## 🎨 Design System

### Color Palette (Post Theme)

#### Light Mode
- Background: `#F5F1E8` (Warm beige)
- Foreground: `#2C2C2C` (Dark grey)
- Accent: `#4A90E2` (Soft blue)
- Card BG: `#FAFAFA` (Off-white)

#### Dark Mode
- Background: `#1A1A1A` (Dark grey)
- Foreground: `#E8E8E8` (Light grey)
- Accent: `#5BA3F5` (Brighter blue)
- Card BG: `#242424` (Dark card)

### Shadow System
- **Standard Shadow**: Subtle depth for cards
- **Long Shadow**: Enhanced depth for emphasis
- **Hover Effects**: Smooth shadow transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd History
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=History-Onchain
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔑 Features Implementation

### Monument Recognition

The app currently uses mock monument data. To implement real AI recognition:

1. Replace the mock API in `app/api/recognize/route.ts`
2. Integrate with Google Vision API, AWS Rekognition, or similar
3. Process the uploaded image and return monument details

### Rewards System

- Points are stored in `localStorage`
- Each discovery awards 25 points
- Level calculation: `Math.floor(totalPoints / 100)`
- Progress bar shows progress to next level

### Camera Access

- Requests camera permissions from browser
- Uses MediaDevices API for video stream
- Captures image to canvas for processing
- Handles mobile and desktop devices

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly UI elements
- Native camera support
- Optimized for mobile performance

## 🔒 Security & Privacy

- Non-custodial wallet connection
- Local storage only (no external tracking)
- Secure OnchainKit integration
- No personal data collection

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **UI**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Web3**: Coinbase OnchainKit, Wagmi, Viem
- **Blockchain**: Base Mainnet/Sepolia
- **Language**: TypeScript

## 📋 Mock Monuments

The app includes 6 historical monuments:
1. The Great Pyramid of Giza (Egypt)
2. The Colosseum (Rome, Italy)
3. Stonehenge (England)
4. Machu Picchu (Peru)
5. The Great Wall of China
6. Taj Mahal (India)

## 🚧 Future Enhancements

- [ ] Real AI monument recognition
- [ ] Cloud sync for progress
- [ ] NFT achievement system
- [ ] Social sharing features
- [ ] More monuments database
- [ ] AR features
- [ ] Multi-language support

## 📄 License

This project is part of the History-Onchain application.

## 🤝 Contributing

This is a template application. Feel free to fork and extend with additional features!

---

**Built on Base with MiniKit & Post Theme** 🎨
