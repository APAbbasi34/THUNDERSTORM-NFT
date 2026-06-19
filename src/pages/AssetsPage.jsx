import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Layers, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Bitcoin, DollarSign, ShoppingCart, Plus, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AssetsPage = () => {
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [userBalance, setUserBalance] = useState(5000);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [ownedNFTs, setOwnedNFTs] = useState([
    { id: 1, name: 'Golden Dragon #123', image: '🐉', value: 2500, change: '+12.5%' },
    { id: 2, name: 'Phoenix Rising #456', image: '🦅', value: 1800, change: '+8.3%' },
    { id: 3, name: 'Mystic Wolf #789', image: '🐺', value: 1200, change: '-2.1%' },
  ]);

  const marketplaceNFTs = [
    { id: 4, name: 'Golden Thunder', image: '⚡', price: 2500, rarity: 'Legendary', status: 'listed' },
    { id: 5, name: 'Purple Storm', image: '🌪️', price: 1800, rarity: 'Rare', status: 'listed' },
    { id: 6, name: 'Lightning Gem', image: '💎', price: 900, rarity: 'Common', status: 'listed' },
    { id: 7, name: 'Cosmic Dragon', image: '�', price: 5000, rarity: 'Legendary', status: 'listed' },
  ];

  const assets = [
    { id: 1, name: "Bitcoin", symbol: "BTC", balance: 0.15, value: 6750, change: "+5.2%", icon: Bitcoin, color: "text-orange-400" },
    { id: 2, name: "Ethereum", symbol: "ETH", balance: 2.5, value: 4500, change: "+3.8%", icon: Layers, color: "text-purple-400" },
    { id: 3, name: "USDT", symbol: "USDT", balance: 5000, value: 5000, change: "+0.1%", icon: DollarSign, color: "text-green-400" },
    { id: 4, name: "USDC", symbol: "USDC", balance: 3200, value: 3200, change: "+0.1%", icon: Wallet, color: "text-blue-400" },
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0) + ownedNFTs.reduce((sum, nft) => sum + nft.value, 0);

  const handleBuyNFT = () => {
    if (selectedNFT && userBalance >= selectedNFT.price) {
      setUserBalance(prev => prev - selectedNFT.price);
      setOwnedNFTs([...ownedNFTs, { ...selectedNFT, value: selectedNFT.price, change: "+0%" }]);
      setShowBuyModal(false);
      setSelectedNFT(null);
      alert(`Successfully purchased ${selectedNFT.name} for ${selectedNFT.price}!`);
    } else {
      alert("Insufficient balance!");
    }
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
              <PieChart className="w-6 h-6 text-black-900" />
            </div>
            <h1 className="text-3xl font-bold text-gold-400">My Assets</h1>
          </div>

          {/* Total Portfolio Value */}
          <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-gold-500/30"
               style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-1">Total Portfolio Value</div>
                <div className="text-4xl font-bold text-gold-400">${totalValue.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xl font-bold">+8.5%</span>
                </div>
                <div className="text-gray-400 text-sm">This Month</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Crypto Assets */}
            <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                 style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Crypto Assets</h2>
              <div className="space-y-4">
                {assets.map((asset) => {
                  const Icon = asset.icon;
                  return (
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-black-600 rounded-lg flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${asset.color}`} />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{asset.name}</h3>
                            <div className="text-gray-400 text-sm">{asset.balance} {asset.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">${asset.value.toLocaleString()}</div>
                          <div className={`text-sm flex items-center gap-1 ${
                            asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {asset.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {asset.change}
                          </div>
                        </div>
                      </div>
                    
          {/* NFT Marketplace */}
          <div className="mt-6 bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/30"
               style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">NFT Marketplace</h2>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-gold-400" />
                <span className="text-gold-400 font-semibold">${userBalance.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketplaceNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black-700/50 rounded-xl p-4 border-2 border-transparent hover:border-gold-500/50 transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-3 text-center">{nft.image}</div>
                  <h3 className="text-white font-semibold text-center mb-2">{nft.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      nft.rarity === 'Legendary' ? 'bg-gold-500/20 text-gold-400' :
                      nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                      nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {nft.rarity}
                    </span>
                    <span className="text-gold-400 font-bold">${nft.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => { setSelectedNFT(nft); setShowBuyModal(true); }}
                    className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buy NFT Modal */}
          {showBuyModal && selectedNFT && (
            <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
              <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-gold-500/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Buy NFT</h3>
                  <button onClick={() => setShowBuyModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-black-700/50 rounded-lg">
                    <div className="text-5xl">{selectedNFT.image}</div>
                    <div>
                      <h4 className="text-white font-semibold">{selectedNFT.name}</h4>
                      <p className={`text-sm ${
                        selectedNFT.rarity === 'Legendary' ? 'text-gold-400' :
                        selectedNFT.rarity === 'Rare' ? 'text-blue-400' :
                        selectedNFT.rarity === 'Epic' ? 'text-purple-400' :
                        'text-gray-400'
                      }`}>
                        {selectedNFT.rarity}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black-700/50 rounded-lg">
                    <span className="text-gray-400">Price</span>
                    <span className="text-gold-400 font-bold text-xl">${selectedNFT.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black-700/50 rounded-lg">
                    <span className="text-gray-400">Your Balance</span>
                    <span className="text-white font-bold">${userBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuyNFT}
                      disabled={userBalance < selectedNFT.price}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Purchase
                    </button>
                    <button
                      onClick={() => { setShowBuyModal(false); setSelectedNFT(null); }}
                      className="flex-1 py-3 bg-black-700 text-white font-bold rounded-lg hover:bg-black-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
                  );
                })}
              </div>
            </div>

            {/* NFT Assets */}
            <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
                 style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
            >
              <h2 className="text-xl font-bold text-white mb-6">NFT Collection</h2>
              <div className="space-y-4">
                {ownedNFTs.map((nft) => (
                  <motion.div
                    key={nft.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-black-700/50 border-2 border-transparent hover:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{nft.image}</div>
                        <div>
                          <h3 className="text-white font-semibold">{nft.name}</h3>
                          <div className="text-gray-400 text-sm">1 NFT</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">${nft.value.toLocaleString()}</div>
                        <div className={`text-sm flex items-center gap-1 ${
                          nft.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {nft.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {nft.change}
                        </div>
                      </div>
                    </div>
                  
          {/* NFT Marketplace */}
          <div className="mt-6 bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/30"
               style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">NFT Marketplace</h2>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-gold-400" />
                <span className="text-gold-400 font-semibold">${userBalance.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketplaceNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black-700/50 rounded-xl p-4 border-2 border-transparent hover:border-gold-500/50 transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-3 text-center">{nft.image}</div>
                  <h3 className="text-white font-semibold text-center mb-2">{nft.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      nft.rarity === 'Legendary' ? 'bg-gold-500/20 text-gold-400' :
                      nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                      nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {nft.rarity}
                    </span>
                    <span className="text-gold-400 font-bold">${nft.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => { setSelectedNFT(nft); setShowBuyModal(true); }}
                    className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buy NFT Modal */}
          {showBuyModal && selectedNFT && (
            <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
              <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-gold-500/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Buy NFT</h3>
                  <button onClick={() => setShowBuyModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-black-700/50 rounded-lg">
                    <div className="text-5xl">{selectedNFT.image}</div>
                    <div>
                      <h4 className="text-white font-semibold">{selectedNFT.name}</h4>
                      <p className={`text-sm ${
                        selectedNFT.rarity === 'Legendary' ? 'text-gold-400' :
                        selectedNFT.rarity === 'Rare' ? 'text-blue-400' :
                        selectedNFT.rarity === 'Epic' ? 'text-purple-400' :
                        'text-gray-400'
                      }`}>
                        {selectedNFT.rarity}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black-700/50 rounded-lg">
                    <span className="text-gray-400">Price</span>
                    <span className="text-gold-400 font-bold text-xl">${selectedNFT.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black-700/50 rounded-lg">
                    <span className="text-gray-400">Your Balance</span>
                    <span className="text-white font-bold">${userBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuyNFT}
                      disabled={userBalance < selectedNFT.price}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Purchase
                    </button>
                    <button
                      onClick={() => { setShowBuyModal(false); setSelectedNFT(null); }}
                      className="flex-1 py-3 bg-black-700 text-white font-bold rounded-lg hover:bg-black-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="mt-6 bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30"
               style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Asset Allocation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Crypto', value: 19450, percentage: 78, color: 'from-purple-500 to-purple-600' },
                { name: 'NFTs', value: 5500, percentage: 22, color: 'from-gold-500 to-gold-600' },
                { name: 'Staked', value: 3200, percentage: 13, color: 'from-green-500 to-green-600' },
                { name: 'Reserved', value: 1800, percentage: 7, color: 'from-blue-500 to-blue-600' },
              ].map((item) => (
                <div key={item.name} className="bg-black-700/50 p-4 rounded-xl">
                  <div className="text-gray-400 text-sm mb-2">{item.name}</div>
                  <div className="text-white font-bold text-lg mb-2">${item.value.toLocaleString()}</div>
                  <div className="w-full bg-black-600 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-gray-400 text-xs">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        
          {/* NFT Marketplace */}
          <div className="mt-6 bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gold-500/30"
               style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">NFT Marketplace</h2>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-gold-400" />
                <span className="text-gold-400 font-semibold">${userBalance.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketplaceNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black-700/50 rounded-xl p-4 border-2 border-transparent hover:border-gold-500/50 transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-3 text-center">{nft.image}</div>
                  <h3 className="text-white font-semibold text-center mb-2">{nft.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      nft.rarity === 'Legendary' ? 'bg-gold-500/20 text-gold-400' :
                      nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                      nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {nft.rarity}
                    </span>
                    <span className="text-gold-400 font-bold">${nft.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => { setSelectedNFT(nft); setShowBuyModal(true); }}
                    className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buy NFT Modal */}
          {showBuyModal && selectedNFT && (
            <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
              <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-gold-500/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Buy NFT</h3>
                  <button onClick={() => setShowBuyModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-black-700/50 rounded-lg">
                    <div className="text-5xl">{selectedNFT.image}</div>
                    <div>
                      <h4 className="text-white font-semibold">{selectedNFT.name}</h4>
                      <p className={`text-sm ${
                        selectedNFT.rarity === 'Legendary' ? 'text-gold-400' :
                        selectedNFT.rarity === 'Rare' ? 'text-blue-400' :
                        selectedNFT.rarity === 'Epic' ? 'text-purple-400' :
                        'text-gray-400'
                      }`}>
                        {selectedNFT.rarity}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black-700/50 rounded-lg">
                    <span className="text-gray-400">Price</span>
                    <span className="text-gold-400 font-bold text-xl">${selectedNFT.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black-700/50 rounded-lg">
                    <span className="text-gray-400">Your Balance</span>
                    <span className="text-white font-bold">${userBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuyNFT}
                      disabled={userBalance < selectedNFT.price}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Purchase
                    </button>
                    <button
                      onClick={() => { setShowBuyModal(false); setSelectedNFT(null); }}
                      className="flex-1 py-3 bg-black-700 text-white font-bold rounded-lg hover:bg-black-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AssetsPage;



