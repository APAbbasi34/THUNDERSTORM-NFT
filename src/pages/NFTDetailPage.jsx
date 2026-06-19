import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Clock, TrendingUp, Gem, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

const NFTDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  // Sample NFT data - in production, this would come from an API
  const nft = {
    id: id,
    name: 'Golden Thunder',
    description: 'A legendary artifact imbued with the power of thunderstorms. This rare NFT grants its owner exclusive access to treasure hunts and special events within the Thunderstorm NFT ecosystem.',
    price: '2500',
    image: '🌟',
    creator: '0x1234...5678',
    owner: '0x8765...4321',
    rarity: 'Legendary',
    likes: 234,
    category: 'treasure',
    createdAt: '2024-01-15',
    tokenId: '12345',
    contractAddress: '0xabc123...def456',
    properties: [
      { trait: 'Power', value: 'Thunder' },
      { trait: 'Element', value: 'Electric' },
      { trait: 'Generation', value: 'Gen 1' },
      { trait: 'Background', value: 'Stormy' }
    ],
    history: [
      { event: 'Minted', from: 'Null', to: '0x1234...5678', date: '2024-01-15', price: '500 USD' },
      { event: 'Sale', from: '0x1234...5678', to: '0x8765...4321', date: '2024-02-20', price: '2500 USD' }
    ]
  };

  const rarityColors = {
    'Common': 'from-gray-500 to-gray-600',
    'Rare': 'from-blue-500 to-blue-600',
    'Epic': 'from-purple-500 to-purple-600',
    'Legendary': 'from-gold-400 to-gold-500'
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: nft.name,
        text: `Check out this amazing NFT: ${nft.name}`,
        url: window.location.href
      });
    }
  };

  const handlePlaceBid = () => {
    // Implement bid placement logic
    console.log('Placing bid:', bidAmount);
  };

  const handleBuyNow = () => {
    // Implement buy now logic
    console.log('Buying NFT for:', nft.price, 'ETH');
  };

  return (
    <div className="min-h-screen bg-black-900 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* NFT Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black-800 rounded-3xl p-8 border border-purple-500/30 relative overflow-hidden"
                 style={{
                   boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
                 }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-gold-900/20" />
              
              {/* NFT Image */}
              <div className="relative h-96 flex items-center justify-center">
                <motion.span
                  className="text-9xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                >
                  {nft.image}
                </motion.span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleLike}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                    liked ? 'bg-red-500/20 text-red-400' : 'bg-black-700 text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black-700 text-gray-400 hover:text-gold-400 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

          {/* NFT Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${rarityColors[nft.rarity]} text-white text-sm font-bold mb-4`}>
                {nft.rarity}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2"
                  style={{
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                  }}
              >
                {nft.name}
              </h1>
              <p className="text-gray-400">Token ID: {nft.tokenId}</p>
            </div>

            {/* Creator & Owner */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black-800 rounded-xl p-4 border border-purple-500/30">
                <p className="text-gray-400 text-sm mb-1">Creator</p>
                <p className="text-gold-400 font-semibold">{nft.creator}</p>
              </div>
              <div className="bg-black-800 rounded-xl p-4 border border-purple-500/30">
                <p className="text-gray-400 text-sm mb-1">Owner</p>
                <p className="text-purple-400 font-semibold">{nft.owner}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-black-800 rounded-xl p-6 border border-purple-500/30 mb-6">
              <h3 className="text-white font-semibold mb-3">Description</h3>
              <p className="text-gray-400 leading-relaxed">{nft.description}</p>
            </div>

            {/* Properties */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Properties</h3>
              <div className="grid grid-cols-2 gap-3">
                {nft.properties.map((prop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black-800 rounded-xl p-4 border border-gold-500/30 hover:border-gold-500/60 transition-all"
                  >
                    <p className="text-gray-400 text-xs mb-1">{prop.trait}</p>
                    <p className="text-gold-400 font-semibold">{prop.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="bg-black-800 rounded-xl p-6 border border-gold-500/30 mb-6"
                 style={{
                   boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
                 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Price</p>
                  <p className="text-gold-400 font-bold text-3xl">${nft.price} USD</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Total Likes</p>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-white font-semibold">{nft.likes}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  Buy Now
                </button>

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1 bg-black-700 border border-purple-500/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                  />
                  <button
                    onClick={handlePlaceBid}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-black-800 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-400" />
                Transaction History
              </h3>
              <div className="space-y-3">
                {nft.history.map((event, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-purple-500/20 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{event.event}</p>
                        <p className="text-gray-400 text-xs">{event.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gold-400 font-semibold">{event.price}</p>
                      <p className="text-gray-400 text-xs">{event.to}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailPage;
