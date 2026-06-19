import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Zap, Crown } from 'lucide-react';

const HeroSection = () => {
  const [isChestOpen, setIsChestOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-black-900 overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black-900 via-black-800 to-purple-900/20" />
        
        {/* Lightning Effects */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              y: [null, '-20%'],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-purple-400 to-gold-400 mb-4"
              style={{
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite',
                textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              }}
          >
            THUNDERSTORM NFT
          </h1>
          <p className="text-xl md:text-2xl text-purple-400 font-light">
            Ultimate Treasure Hunt Adventure
          </p>
        </motion.div>

        {/* Animated Treasure Chest */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
          className="mb-12 relative"
          onHoverStart={() => setIsChestOpen(true)}
          onHoverEnd={() => setIsChestOpen(false)}
        >
          <div className="relative w-64 h-64 mx-auto cursor-pointer">
            {/* Chest Base */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-2xl border-4 border-amber-600"
              animate={{ scale: isChestOpen ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
              }}
            >
              {/* Chest Details */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-16 bg-amber-600 rounded border-2 border-amber-500" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-gold-400 rounded-full" />
            </motion.div>

            {/* Chest Lid */}
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-56 h-20 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-2xl border-4 border-amber-500 origin-bottom"
              animate={{
                rotateX: isChestOpen ? -110 : 0,
                y: isChestOpen ? -10 : 0,
              }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
              }}
            >
              {/* Lid Details */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-amber-500 rounded" />
            </motion.div>

            {/* Glowing Effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                opacity: isChestOpen ? 1 : 0,
                scale: isChestOpen ? 1.5 : 1,
              }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
              }}
            />

            {/* Treasure Items (visible when open) */}
            {isChestOpen && (
              <>
                <motion.div
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2"
                >
                  <Sparkles className="w-8 h-8 text-gold-400" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }} />
                </motion.div>
                <motion.div
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="absolute top-8 left-16"
                >
                  <Crown className="w-6 h-6 text-purple-400" style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))' }} />
                </motion.div>
                <motion.div
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute top-8 right-16"
                >
                  <Zap className="w-6 h-6 text-gold-400" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }} />
                </motion.div>
              </>
            )}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold-500/50"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                  }}
          >
            Start Hunting
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-bold rounded-lg hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
                  style={{
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                  }}
          >
            Explore NFTs
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-400">10K+</p>
            <p className="text-gray-400 text-sm">NFTs Minted</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">5K+</p>
            <p className="text-gray-400 text-sm">Hunters</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-400">$1M+</p>
            <p className="text-gray-400 text-sm">Rewards</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-purple-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
