import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Clock, TrendingUp, Gem } from 'lucide-react';

const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Sample NFT data
  const nfts = [
    {
      id: 1,
      name: 'Golden Thunder',
      price: '2500',
      image: '🌟',
      creator: '0x1234...5678',
      rarity: 'Legendary',
      likes: 234,
      category: 'treasure'
    },
    {
      id: 2,
      name: 'Purple Storm',
      price: '1800',
      image: '⚡',
      creator: '0x8765...4321',
      rarity: 'Rare',
      likes: 189,
      category: 'power'
    },
    {
      id: 3,
      name: 'Chest of Secrets',
      price: '3200',
      image: '📦',
      creator: '0x2468...1357',
      rarity: 'Epic',
      likes: 312,
      category: 'treasure'
    },
    {
      id: 4,
      name: 'Lightning Gem',
      price: '900',
      image: '💎',
      creator: '0x9876...5432',
      rarity: 'Common',
      likes: 156,
      category: 'gem'
    },
    {
      id: 5,
      name: 'Storm Crown',
      price: '4500',
      image: '👑',
      creator: '0x1357...2468',
      rarity: 'Legendary',
      likes: 445,
      category: 'treasure'
    },
    {
      id: 6,
      name: 'Thunder Shield',
      price: '2100',
      image: '🛡️',
      creator: '0x5432...9876',
      rarity: 'Rare',
      likes: 201,
      category: 'power'
    },
    {
      id: 7,
      name: 'Mystic Orb',
      price: '1500',
      image: '🔮',
      creator: '0x7890...1234',
      rarity: 'Epic',
      likes: 278,
      category: 'magic'
    },
    {
      id: 8,
      name: 'Ancient Key',
      price: '3800',
      image: '🗝️',
      creator: '0x3456...7890',
      rarity: 'Legendary',
      likes: 389,
      category: 'treasure'
    }
  ];

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || nft.category === filter;
    return matchesSearch && matchesFilter;
  });

  const rarityColors = {
    'Common': 'from-gray-500 to-gray-600',
    'Rare': 'from-blue-500 to-blue-600',
    'Epic': 'from-purple-500 to-purple-600',
    'Legendary': 'from-gold-400 to-gold-500'
  };

  return (
    <div className="min-h-screen bg-black-900 pt-20 px-4 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-400 mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              }}
          >
            NFT Marketplace
          </h1>
          <p className="text-gray-400 text-lg">Discover and collect unique digital treasures</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8"
        >
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black-800 border border-purple-500/50 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all text-sm sm:text-base"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-black-800 border border-gold-500/50 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="all">All Categories</option>
              <option value="treasure">Treasures</option>
              <option value="power">Power Items</option>
              <option value="gem">Gems</option>
              <option value="magic">Magic Items</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <TrendingUp className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black-800 border border-purple-500/50 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="recent">Recently Listed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 mb-8 text-sm"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <Gem className="w-4 h-4 text-gold-400" />
            <span>{filteredNFTs.length} NFTs</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Heart className="w-4 h-4 text-purple-400" />
            <span>{nfts.reduce((acc, nft) => acc + nft.likes, 0)} Total Likes</span>
          </div>
        </motion.div>
      </div>

      {/* NFT Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-black-800 rounded-2xl overflow-hidden border border-purple-500/30 hover:border-gold-500/50 transition-all duration-300"
                   style={{
                     boxShadow: '0 0 30px rgba(168, 85, 247, 0.1)',
                   }}
              >
                {/* NFT Image */}
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-black-700 to-black-800 flex items-center justify-center">
                  <motion.span
                    className="text-6xl sm:text-7xl md:text-8xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring' }}
                  >
                    {nft.image}
                  </motion.span>

                  {/* Rarity Badge */}
                  <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${rarityColors[nft.rarity]} text-white text-xs font-bold`}>
                    {nft.rarity}
                  </div>

                  {/* Like Button */}
                  <button className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2 bg-black-900/80 rounded-full hover:bg-red-500/20 transition-colors">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-400" />
                  </button>

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-6 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold rounded-lg transform scale-90 group-hover:scale-100 transition-transform">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* NFT Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {nft.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full" />
                      <span className="text-gray-400 text-xs sm:text-sm">{nft.creator}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{nft.likes}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-purple-500/30">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Current Price</p>
                      <p className="text-gold-400 font-bold text-base sm:text-lg">${nft.price} USD</p>
                    </div>
                    <button className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all text-sm sm:text-base">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNFTs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Gem className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">No NFTs found matching your search</p>
          </motion.div>
        )}
      </div>

      {/* Load More Button */}
      {filteredNFTs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                  }}
          >
            Load More NFTs
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MarketplacePage;
