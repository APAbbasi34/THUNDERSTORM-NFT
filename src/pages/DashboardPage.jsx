import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { Trophy, Gift, TrendingUp, Wallet, Copy, Check, ArrowRight, Star, Zap } from 'lucide-react';
import { useState } from 'react';

const DashboardPage = () => {
  const { userProfile, logout } = useAuth();
  const { account, balance } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    if (userProfile?.referralCode) {
      navigator.clipboard.writeText(userProfile.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Sample data - in production, this would come from the database
  const ownedNFTs = [
    { id: 1, name: 'Golden Thunder', image: '🌟', price: '2500 USD', rarity: 'Legendary' },
    { id: 2, name: 'Purple Storm', image: '⚡', price: '1800 USD', rarity: 'Rare' },
    { id: 3, name: 'Lightning Gem', image: '💎', price: '900 USD', rarity: 'Common' }
  ];

  const achievements = [
    { id: 1, name: 'First Hunt', icon: '🎯', description: 'Complete your first treasure hunt', unlocked: true },
    { id: 2, name: 'Collector', icon: '🏆', description: 'Own 5 NFTs', unlocked: true },
    { id: 3, name: 'Trader', icon: '💱', description: 'Complete 10 trades', unlocked: false },
    { id: 4, name: 'Legend', icon: '👑', description: 'Own a Legendary NFT', unlocked: true }
  ];

  const recentActivity = [
    { id: 1, type: 'purchase', item: 'Golden Thunder', date: '2 hours ago', amount: '2500 USD' },
    { id: 2, type: 'reward', item: 'Daily Login Bonus', date: '1 day ago', amount: '+50 points' },
    { id: 3, type: 'referral', item: 'New user referred', date: '3 days ago', amount: '+100 points' }
  ];

  return (
    <div className="min-h-screen bg-black-900 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-400 mb-2"
              style={{
                textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              }}
          >
            Welcome, Hunter!
          </h1>
          <p className="text-gray-400">Manage your treasures and track your progress</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-black-800 rounded-2xl p-6 border border-gold-500/30"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-gold-400 text-2xl font-bold">{userProfile?.points || 0}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black-800 rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-purple-400 text-2xl font-bold">{ownedNFTs.length}</span>
            </div>
            <p className="text-gray-400 text-sm">NFTs Owned</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black-800 rounded-2xl p-6 border border-gold-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-gold-400 text-2xl font-bold">${balance || '0.00'} USD</span>
            </div>
            <p className="text-gray-400 text-sm">Wallet Balance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black-800 rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-purple-400 text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</span>
            </div>
            <p className="text-gray-400 text-sm">Achievements</p>
          </motion.div>
        </div>

        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-900/30 to-gold-900/30 rounded-2xl p-6 border border-gold-500/30 mb-8"
          style={{
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.2)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                <Gift className="w-7 h-7 text-black-900" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Refer & Earn</h3>
                <p className="text-gray-400 text-sm">Share your code and earn 100 points for each referral!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-black-800 border border-gold-500/50 rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="text-gold-400 font-mono font-bold">{userProfile?.referralCode || 'LOADING...'}</span>
                <button
                  onClick={copyReferralCode}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Owned NFTs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-black-800 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Your Collection</h2>
                <button className="text-gold-400 text-sm hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ownedNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black-700 rounded-xl p-4 border border-purple-500/30 hover:border-gold-500/50 transition-all cursor-pointer"
                  >
                    <div className="h-32 bg-gradient-to-br from-black-800 to-black-900 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-5xl">{nft.image}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{nft.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-400 text-sm">{nft.price}</span>
                      <span className="text-purple-400 text-xs">{nft.rarity}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {ownedNFTs.length === 0 && (
                <div className="text-center py-12">
                  <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No NFTs yet. Start hunting!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-black-800 rounded-2xl p-6 border border-gold-500/30 mb-6">
              <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold-400" />
                Achievements
              </h2>

              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-gold-500/20 to-purple-500/20 border border-gold-500/30' 
                        : 'bg-black-700 border border-gray-700 opacity-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                      achievement.unlocked ? 'bg-black-800' : 'bg-black-800 grayscale'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Check className="w-5 h-5 text-gold-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black-800 rounded-2xl p-6 border border-purple-500/30">
              <h2 className="text-white font-bold text-xl mb-6">Recent Activity</h2>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-purple-500/20 last:border-0"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{activity.item}</p>
                      <p className="text-gray-500 text-xs">{activity.date}</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      activity.type === 'purchase' ? 'text-gold-400' : 'text-purple-400'
                    }`}>
                      {activity.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
