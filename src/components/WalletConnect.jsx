import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const WalletConnect = () => {
  const { account, balance, isConnected, loading, connectWallet, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <motion.button
        onClick={connectWallet}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wallet className="w-5 h-5" />
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3"
    >
      <div className="bg-black-800 border border-gold-500/50 rounded-lg px-4 py-2 flex items-center gap-3"
           style={{
             boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
           }}
      >
        <div className="flex flex-col">
          <span className="text-gold-400 text-xs font-semibold">Connected</span>
          <span className="text-white text-sm font-medium">{balance} ETH</span>
        </div>
        <div className="h-8 w-px bg-gold-500/30" />
        <button
          onClick={copyAddress}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span className="text-sm font-mono">{formatAddress(account)}</span>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <motion.button
        onClick={disconnectWallet}
        className="p-2 bg-black-800 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LogOut className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default WalletConnect;
