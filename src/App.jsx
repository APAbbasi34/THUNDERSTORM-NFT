import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import NFTDetailPage from './pages/NFTDetailPage';
import DashboardPage from './pages/DashboardPage';
import MintPage from './pages/MintPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import AdminPanelPage from './pages/AdminPanelPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import StakePage from './pages/StakePage';
import EarnPage from './pages/EarnPage';
import ReservePage from './pages/ReservePage';
import AssetsPage from './pages/AssetsPage';
import MyPage from './pages/MyPage';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-black-900">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/nft/:id" element={<NFTDetailPage />} />
              <Route path="/stake" element={<StakePage />} />
              <Route path="/earn" element={<EarnPage />} />
              <Route path="/reserve" element={<ReservePage />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/my" element={<MyPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mint" element={<MintPage />} />
              <Route path="/transactions" element={<TransactionHistoryPage />} />
              <Route path="/admin" element={<AdminPanelPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;
