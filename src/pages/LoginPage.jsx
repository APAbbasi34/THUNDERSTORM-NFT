import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('mobile'); // 'mobile' or 'email'
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use phone number as email for mobile login (Firebase needs email format)
      const loginEmail = loginMethod === 'mobile' ? phoneNumber : email;
      await login(loginEmail, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black-900 via-black-800 to-purple-900/20" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              y: [null, '-20%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-black-800/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl"
             style={{
               boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
             }}
        >
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-gold-400 to-purple-500 rounded-full flex items-center justify-center"
                   style={{
                     boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                   }}
              >
                <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-black-900" />
              </div>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gold-400 mt-4 mb-2"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                }}
            >
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Sign in to continue your treasure hunt</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Login Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('mobile')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                loginMethod === 'mobile'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black-900'
                  : 'bg-black-700 text-gray-400 hover:bg-black-600'
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black-900'
                  : 'bg-black-700 text-gray-400 hover:bg-black-600'
              }`}
            >
              Email
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {loginMethod === 'mobile' ? (
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all text-sm sm:text-base"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all text-sm sm:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-2 text-right">
                <Link to="/forgot-password" className="text-gold-400 text-xs sm:text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
              }}
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-400 hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
