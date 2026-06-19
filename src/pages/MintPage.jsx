import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { Upload, Sparkles, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const MintPage = () => {
  const { isConnected, account } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rarity: 'Common',
    category: 'treasure'
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMint = async () => {
    if (!isConnected) {
      setMintStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    setIsMinting(true);
    setMintStatus(null);

    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setMintStatus({ 
        type: 'success', 
        message: 'NFT minted successfully! Your treasure is now on the blockchain.' 
      });
      
      // Reset form
      setFormData({ name: '', description: '', price: '', rarity: 'Common', category: 'treasure' });
      setImage(null);
      setPreview('');
    }, 3000);
  };

  const rarityOptions = [
    { value: 'Common', color: 'from-gray-500 to-gray-600' },
    { value: 'Rare', color: 'from-blue-500 to-blue-600' },
    { value: 'Epic', color: 'from-purple-500 to-purple-600' },
    { value: 'Legendary', color: 'from-gold-400 to-gold-500' }
  ];

  const categoryOptions = [
    { value: 'treasure', icon: '📦', label: 'Treasure' },
    { value: 'power', icon: '⚡', label: 'Power Item' },
    { value: 'gem', icon: '💎', label: 'Gem' },
    { value: 'magic', icon: '🔮', label: 'Magic Item' }
  ];

  return (
    <div className="min-h-screen bg-black-900 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-400 mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              }}
          >
            Mint Your NFT
          </h1>
          <p className="text-gray-400 text-lg">Create your unique digital treasure and add it to the blockchain</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black-800 rounded-3xl p-8 border border-purple-500/30 h-full"
                 style={{
                   boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
                 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-gold-400" />
                Upload Artwork
              </h2>

              {/* Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`block border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                    preview 
                      ? 'border-gold-500/50 bg-gold-500/10' 
                      : 'border-purple-500/50 hover:border-gold-500/50 hover:bg-purple-500/10'
                  }`}
                >
                  {preview ? (
                    <div>
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg mb-4"
                      />
                      <p className="text-gray-400 text-sm">Click to change image</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-white font-semibold mb-2">Drop your artwork here</p>
                      <p className="text-gray-400 text-sm">or click to browse</p>
                      <p className="text-gray-500 text-xs mt-4">PNG, JPG, GIF up to 50MB</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Preview Stats */}
              {preview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-black-700 rounded-xl border border-gold-500/30"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-white font-medium">Image Ready</p>
                      <p className="text-gray-400 text-sm">{image?.name}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black-800 rounded-3xl p-8 border border-gold-500/30"
                 style={{
                   boxShadow: '0 0 40px rgba(255, 215, 0, 0.2)',
                 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-400" />
                NFT Details
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black-700 border border-purple-500/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    placeholder="Enter NFT name"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-black-700 border border-purple-500/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all resize-none"
                    placeholder="Describe your NFT"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Price (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-black-700 border border-purple-500/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    placeholder="500"
                    required
                  />
                </div>

                {/* Rarity */}
                <div>
                  <label className="block text-gray-300 mb-3 text-sm font-medium">Rarity</label>
                  <div className="grid grid-cols-2 gap-3">
                    {rarityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, rarity: option.value })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.rarity === option.value
                            ? `border-gold-400 bg-gradient-to-r ${option.color}`
                            : 'border-purple-500/30 bg-black-700 hover:border-purple-500/60'
                        }`}
                      >
                        <span className="text-white font-medium text-sm">{option.value}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-300 mb-3 text-sm font-medium">Category</label>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, category: option.value })}
                        className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                          formData.category === option.value
                            ? 'border-gold-400 bg-gold-500/20'
                            : 'border-purple-500/30 bg-black-700 hover:border-purple-500/60'
                        }`}
                      >
                        <span className="text-xl">{option.icon}</span>
                        <span className="text-white font-medium text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mint Status */}
                {mintStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      mintStatus.type === 'success' 
                        ? 'bg-green-500/20 border border-green-500' 
                        : 'bg-red-500/20 border border-red-500'
                    }`}
                  >
                    {mintStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <p className={`text-sm ${
                      mintStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {mintStatus.message}
                    </p>
                  </motion.div>
                )}

                {/* Mint Button */}
                <button
                  onClick={handleMint}
                  disabled={isMinting || !isConnected}
                  className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  {isMinting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black-900 border-t-transparent rounded-full animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {isConnected ? 'Mint NFT' : 'Connect Wallet to Mint'}
                    </>
                  )}
                </button>

                {/* Minting Info */}
                <div className="text-center">
                  <p className="text-gray-500 text-xs">
                    Minting fee: $1 USD • Transaction fees may apply
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MintPage;
