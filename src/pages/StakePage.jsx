import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StakePage = () => {
  const { user } = useAuth();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [stakingPeriod, setStakingPeriod] = useState(30);
  const [isStaking, setIsStaking] = useState(false);

  const mockNFTs = [
    { id: 1, name: 'Golden Dragon #123', image: '🐉', price: 2500, rarity: 'Legendary' },
    { id: 2, name: 'Phoenix Rising #456', image: '🦅', price: 1800, rarity: 'Epic' },
    { id: 3, name: 'Mystic Wolf #789', image: '🐺', price: 1200, rarity: 'Rare' },
    { id: 4, name: 'Crystal Bear #012', image: '🐻', price: 950, rarity: 'Common' },
  ];

  const stakingRewards = {
    30: { apy: '5%', daily: 0.41 },
    90: { apy: '10%', daily: 0.82 },
    180: { apy: '15%', daily: 1.23 },
  };

  const handleStake = () => {
    if (!selectedNFT) return;
    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);
      alert(`Successfully staked ${selectedNFT.name} for ${stakingPeriod} days!`);
      setSelectedNFT(null);
    }, 2000);
  };

  const calculateReward = () => {
    if (!selectedNFT) return 0;
    const reward = stakingRewards[stakingPeriod];
    return (selectedNFT.price * reward.daily * stakingPeriod) / 100;
  };

  return (
    <div className="min-h-screen bg-black-900 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-purple-500 rounded-lg flex items-center justify-center"
                 style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
            >
              <Lock className="w-6 h-6 text-black-900" />
            </div>
            <h1 className="text-3xl font-bold text-gold-400">Stake NFTs</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* NFT Selection */}
            <div className="lg:col-span-2">
              <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                   style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
              >
                <h2 className="text-xl font-bold text-white mb-6">Select NFT to Stake</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockNFTs.map((nft) => (
                    <motion.div
                      key={nft.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedNFT(nft)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedNFT?.id === nft.id
                          ? 'bg-purple-500/30 border-2 border-gold-400'
                          : 'bg-black-700/50 border-2 border-transparent hover:border-purple-500/50'
                      }`}
                    >
                      <div className="text-5xl mb-3">{nft.image}</div>
                      <h3 className="text-white font-semibold mb-1">{nft.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">${nft.price}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          nft.rarity === 'Legendary' ? 'bg-gold-500/20 text-gold-400' :
                          nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                          nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {nft.rarity}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Staking Info */}
            <div className="space-y-6">
              <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                   style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
              >
                <h2 className="text-xl font-bold text-white mb-6">Staking Period</h2>
                <div className="space-y-3">
                  {[
                    { days: 30, apy: '5%' },
                    { days: 90, apy: '10%' },
                    { days: 180, apy: '15%' },
                  ].map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setStakingPeriod(option.days)}
                      className={`w-full p-4 rounded-xl transition-all flex items-center justify-between ${
                        stakingPeriod === option.days
                          ? 'bg-gold-500/20 border-2 border-gold-400'
                          : 'bg-black-700/50 border-2 border-transparent hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <div className="text-left">
                          <div className="text-white font-semibold">{option.days} Days</div>
                          <div className="text-gray-400 text-sm">{option.apy} APY</div>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-gold-400" />
                    </button>
                  ))}
                </div>
              </div>

              {selectedNFT && (
                <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/30"
                     style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
                >
                  <h2 className="text-xl font-bold text-white mb-4">Reward Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <span>NFT Value</span>
                      <span className="text-white">${selectedNFT.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Staking Period</span>
                      <span className="text-white">{stakingPeriod} Days</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>APY</span>
                      <span className="text-white">{stakingRewards[stakingPeriod].apy}</span>
                    </div>
                    <div className="border-t border-purple-500/30 pt-3 flex justify-between">
                      <span className="text-gold-400 font-semibold">Estimated Reward</span>
                      <span className="text-gold-400 font-bold">${calculateReward().toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleStake}
                    disabled={isStaking}
                    className="w-full mt-6 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
                  >
                    {isStaking ? 'Staking...' : (
                      <>
                        Stake NFT
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StakePage;
