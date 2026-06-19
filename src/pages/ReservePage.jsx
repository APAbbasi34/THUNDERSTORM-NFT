import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, Clock, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReservePage = () => {
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [reserveAmount, setReserveAmount] = useState('');
  const [duration, setDuration] = useState(30);
  const [isReserving, setIsReserving] = useState(false);

  const assets = [
    { id: 1, name: 'USDT', symbol: '₮', balance: 5000, apy: '8%', icon: '💵' },
    { id: 2, name: 'USDC', symbol: '$', balance: 3200, apy: '7.5%', icon: '💰' },
    { id: 3, name: 'ETH', symbol: 'Ξ', balance: 2.5, apy: '12%', icon: '💎' },
    { id: 4, name: 'BTC', symbol: '₿', balance: 0.15, apy: '10%', icon: '🪙' },
  ];

  const durationOptions = [
    { days: 30, bonus: '0%' },
    { days: 90, bonus: '2%' },
    { days: 180, bonus: '5%' },
    { days: 365, bonus: '10%' },
  ];

  const handleReserve = () => {
    if (!selectedAsset || !reserveAmount) return;
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      alert(`Successfully reserved ${reserveAmount} ${selectedAsset.name} for ${duration} days!`);
      setReserveAmount('');
      setSelectedAsset(null);
    }, 2000);
  };

  const calculateInterest = () => {
    if (!selectedAsset || !reserveAmount) return 0;
    const baseAPY = parseFloat(selectedAsset.apy) / 100;
    const bonus = parseFloat(durationOptions.find(d => d.days === duration).bonus) / 100;
    const totalAPY = baseAPY + bonus;
    return (parseFloat(reserveAmount) * totalAPY * (duration / 365)).toFixed(2);
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
              <Wallet className="w-6 h-6 text-black-900" />
            </div>
            <h1 className="text-3xl font-bold text-gold-400">Reserve Assets</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Asset Selection */}
            <div className="lg:col-span-2">
              <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                   style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
              >
                <h2 className="text-xl font-bold text-white mb-6">Select Asset to Reserve</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {assets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAsset(asset)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedAsset?.id === asset.id
                          ? 'bg-purple-500/30 border-2 border-gold-400'
                          : 'bg-black-700/50 border-2 border-transparent hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">{asset.icon}</div>
                        <div>
                          <h3 className="text-white font-semibold">{asset.name}</h3>
                          <div className="text-gold-400 text-sm font-bold">{asset.apy} APY</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Balance: {asset.balance}</span>
                        <Shield className="w-4 h-4 text-green-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reserve Info */}
            <div className="space-y-6">
              <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                   style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
              >
                <h2 className="text-xl font-bold text-white mb-6">Reserve Duration</h2>
                <div className="space-y-3">
                  {durationOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setDuration(option.days)}
                      className={`w-full p-4 rounded-xl transition-all flex items-center justify-between ${
                        duration === option.days
                          ? 'bg-gold-500/20 border-2 border-gold-400'
                          : 'bg-black-700/50 border-2 border-transparent hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <div className="text-left">
                          <div className="text-white font-semibold">{option.days} Days</div>
                          <div className="text-gray-400 text-sm">+{option.bonus} Bonus</div>
                        </div>
                      </div>
                      <CheckCircle className={`w-5 h-5 ${duration === option.days ? 'text-gold-400' : 'text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {selectedAsset && (
                <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/30"
                     style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
                >
                  <h2 className="text-xl font-bold text-white mb-4">Reserve Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Amount</label>
                      <input
                        type="number"
                        value={reserveAmount}
                        onChange={(e) => setReserveAmount(e.target.value)}
                        max={selectedAsset.balance}
                        placeholder={`Max ${selectedAsset.balance}`}
                        className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>Base APY</span>
                        <span className="text-white">{selectedAsset.apy}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>Duration Bonus</span>
                        <span className="text-white">{durationOptions.find(d => d.days === duration).bonus}</span>
                      </div>
                      <div className="border-t border-purple-500/30 pt-2 flex justify-between">
                        <span className="text-gold-400 font-semibold">Expected Interest</span>
                        <span className="text-gold-400 font-bold">${calculateInterest()}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleReserve}
                      disabled={isReserving || !reserveAmount || reserveAmount > selectedAsset.balance}
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
                    >
                      {isReserving ? 'Reserving...' : (
                        <>
                          Reserve Asset
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

export default ReservePage;
