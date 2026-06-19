# Thunderstorm NFT - Treasure Hunt Platform

A modern NFT Treasure Hunt website with dark futuristic design, featuring animated treasure chest hero section, wallet integration, NFT marketplace, and comprehensive user management.

## Features

- **Dark Futuristic Design**: Black, gold, and purple neon color scheme with professional animations
- **Animated Treasure Chest Hero Section**: Interactive hero with floating animations
- **User Authentication**: Firebase-based registration and login with Google OAuth
- **Wallet Integration**: MetaMask and Trust Wallet support
- **NFT Marketplace**: Browse, search, and filter NFTs with grid layout
- **NFT Detail Page**: View NFT metadata, properties, and transaction history
- **Mint NFT Functionality**: Create and mint new NFTs to the blockchain
- **User Dashboard**: Track owned NFTs, points, achievements, and activity
- **Rewards System**: Points-based rewards and achievement system
- **Referral System**: Unique referral codes with bonus points
- **Transaction History**: Complete transaction tracking and filtering
- **Admin Panel**: Platform management with user and NFT administration
- **Responsive Design**: Mobile-optimized interface
- **Node.js Backend**: Express API server for backend operations

## Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** with custom theme
- **Framer Motion** for animations
- **React Router** for navigation
- **Firebase** for authentication and database
- **Lucide React** for icons
- **Web3** for wallet integration

### Backend
- **Node.js** with Express
- **Firebase Admin SDK**
- **CORS** for cross-origin requests

## Project Structure

```
thunderstorm-nft/
├── src/
│   ├── components/          # Reusable components
│   │   ├── LoadingScreen.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navigation.jsx
│   │   └── WalletConnect.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── MarketplacePage.jsx
│   │   ├── NFTDetailPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── MintPage.jsx
│   │   ├── TransactionHistoryPage.jsx
│   │   └── AdminPanelPage.jsx
│   ├── context/            # React contexts
│   │   ├── AuthContext.jsx
│   │   └── WalletContext.jsx
│   ├── utils/              # Utility functions
│   │   └── firebase.js
│   ├── hooks/              # Custom hooks
│   ├── App.jsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── style.css           # Global styles
├── backend/                # Express backend
│   ├── routes/             # API routes
│   │   ├── users.js
│   │   ├── nfts.js
│   │   └── transactions.js
│   ├── server.js           # Express server
│   ├── package.json
│   └── .env                # Environment variables
├── public/                 # Static assets
├── index.html
├── tailwind.config.js      # Tailwind configuration
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MetaMask or compatible wallet (optional)

### Frontend Setup

1. **Navigate to the project directory**
```bash
cd thunderstorm-nft
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase credentials
   - Update `src/utils/firebase.js` with your credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. **Start the development server**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to the backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
   - Copy `.env` file and update with your credentials:
```env
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
JWT_SECRET=your-jwt-secret-key
```

4. **Start the backend server**
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

## Usage

### User Registration
1. Click "Sign up" on the navigation
2. Fill in email, password, and optional referral code
3. Or sign up with Google OAuth
4. Receive 100 bonus points for using a referral code

### Wallet Connection
1. Click "Connect Wallet" in the navigation
2. Select MetaMask or Trust Wallet
3. Approve the connection in your wallet
4. Your wallet address and balance will be displayed

### NFT Marketplace
1. Browse NFTs on the marketplace page
2. Use search and filters to find specific NFTs
3. Click on an NFT to view details
4. Purchase NFTs using your connected wallet

### Minting NFTs
1. Navigate to the Mint page
2. Upload your artwork
3. Fill in NFT details (name, description, price, rarity, category)
4. Connect your wallet if not already connected
5. Click "Mint NFT" to create your NFT

### Dashboard
- View your owned NFTs
- Track your points and achievements
- Access your referral code
- View recent activity

### Admin Panel
- Manage users (view, suspend, ban)
- Manage NFTs (approve, remove)
- View platform analytics
- Configure platform settings

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### NFTs
- `GET /api/nfts` - Get all NFTs
- `GET /api/nfts/:id` - Get NFT by ID
- `POST /api/nfts` - Create new NFT
- `PUT /api/nfts/:id` - Update NFT
- `DELETE /api/nfts/:id` - Delete NFT

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  black: {
    900: '#0a0a0a',
    800: '#121212',
    700: '#1a1a1a',
  },
  gold: {
    400: '#ffd700',
    500: '#ffb700',
    600: '#e6a500',
  },
  purple: {
    400: '#a855f7',
    500: '#9333ea',
    600: '#7c3aed',
  }
}
```

### Animations
Custom animations are defined in `tailwind.config.js`:
```javascript
animation: {
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  'float': 'float 3s ease-in-out infinite',
  'chest-open': 'chest-open 0.8s ease-out forwards',
}
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables for Firebase credentials

### Backend (Heroku/Railway)
1. Deploy the backend folder
2. Set environment variables
3. Ensure the backend URL is configured in the frontend

## Troubleshooting

### Wallet Connection Issues
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network (Ethereum Mainnet or Goerli Testnet)
- Clear browser cache and try again

### Firebase Authentication Errors
- Verify Firebase credentials in `firebase.js`
- Check that Authentication is enabled in Firebase Console
- Ensure Email/Password and Google providers are enabled

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 18 or higher

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the NFT community**
