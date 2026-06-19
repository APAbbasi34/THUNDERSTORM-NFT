import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Coins, Gift, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EarnPage = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const earningOptions = [
    {
      id: 1,
      name: 'Yield Farming',
      icon: Coins,
      apy: '12%',
      minDeposit: 100,
      description: 'Earn passive income by providing liquidity',
      risk: 'Medium',
    },
    {
      id: 2,
      name: 'Referral Rewards',
      icon: Gift,
      apy: 'Unlimited',
      minDeposit: 0,
      description: 'Earn 5% commission on every referral',
      risk: 'None',
    },
    {
      id: 3,
      name: 'Staking Rewards',
      icon: Zap,
      apy: '15%',
      minDeposit: 500,
      description: 'Stake tokens and earn high rewards',
      risk: 'Low',
    },
  ];

  const handleStartEarning = () => {
    if (!selectedOption || !amount) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Successfully started earning with ${selectedOption.name}!`);
      setAmount('');
      setSelectedOption(null);
    }, 2000);
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
              <TrendingUp className="w-6 h-6 text-black-900" />
            </div>
            <h1 className="text-3xl font-bold text-gold-400">Earn Rewards</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Earning Options */}
            <div className="lg:col-span-2">
              <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                   style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
              >
                <h2 className="text-xl font-bold text-white mb-6">Choose Earning Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {earningOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedOption(option)}
                        className={`p-6 rounded-xl cursor-pointer transition-all ${
                          selectedOption?.id === option.id
                            ? 'bg-purple-500/30 border-2 border-gold-400'
                            : 'bg-black-700/50 border-2 border-transparent hover:border-purple-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-black-900" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{option.name}</h3>
                            <div className="text-gold-400 text-sm font-bold">{option.apy} APY</div>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs">Min: ${option.minDeposit}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            option.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                            option.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {option.risk} Risk
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Earning Info */}
            <div className="space-y-6">
              <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                   style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
              >
                <h2 className="text-xl font-bold text-white mb-6">Your Earnings</h2>
                <div className="space-y-4">
                  <div className="bg-black-700/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">Total Earned</div>
                    <div className="text-2xl font-bold text-gold-400">$1,234.56</div>
                  </div>
                  <div className="bg-black-700/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">This Month</div>
                    <div className="text-2xl font-bold text-purple-400">$234.12</div>
                  </div>
                  <div className="bg-black-700/50 p-4 rounded-xl">
                    <div className="text-gray-400 text-sm mb-1">Active Positions</div>
                    <div className="text-2xl font-bold text-white">3</div>
                  </div>
                </div>
              </div>

              {selectedOption && (
                <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/30"
                     style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
                >
                  <h2 className="text-xl font-bold text-white mb-4">Start Earning</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Amount (USD)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={selectedOption.minDeposit}
                        placeholder={`Min $${selectedOption.minDeposit}`}
                        className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      />
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Expected APY</span>
                      <span className="text-gold-400">{selectedOption.apy}</span>
                    </div>
                    <button
                      onClick={handleStartEarning}
                      disabled={isProcessing || !amount || amount < selectedOption.minDeposit}
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
                    >
                      {isProcessing ? 'Processing...' : (
                        <>
                          Start Earning
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EarnPage;
