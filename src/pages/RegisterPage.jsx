import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Gift, Phone, Smartphone, RefreshCw } from 'lucide-react';
import OTPInput from '../components/OTPInput';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState('email'); // 'email', 'phone', 'email-otp'
  const [otpSent, setOtpSent] = useState(false);
  const { register, loginWithGoogle, sendPhoneOTP, verifyPhoneOTP, sendEmailOTP, verifyEmailOTP } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData.email, formData.password, formData.referralCode || null);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to register with Google.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });

      await sendPhoneOTP(formData.phoneNumber, recaptchaVerifier);
      setOtpSent(true);
    } catch (error) {
      setError('Failed to send OTP. Please check your phone number.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOTP = async (otpCode) => {
    setError('');
    setLoading(true);

    try {
      await verifyPhoneOTP(otpCode);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOTP = async () => {
    setError('');
    setLoading(true);

    try {
      await sendEmailOTP(formData.email);
      setOtpSent(true);
    } catch (error) {
      setError('Failed to send OTP. Please check your email.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOTP = async (otpCode) => {
    setError('');
    setLoading(true);

    try {
      await verifyEmailOTP(otpCode);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (registerMethod === 'phone') {
      await handleSendPhoneOTP();
    } else if (registerMethod === 'email-otp') {
      await handleSendEmailOTP();
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
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
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

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-black-800/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl"
             style={{
               boxShadow: '0 0 40px rgba(255, 215, 0, 0.2)',
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
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-purple-400 to-gold-500 rounded-full flex items-center justify-center"
                   style={{
                     boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
                   }}
              >
                <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-black-900" />
              </div>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gold-400 mt-4 mb-2"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                }}
            >
              Join the Hunt
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Create your account and start discovering treasures</p>
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

          {/* Register Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setRegisterMethod('email')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                registerMethod === 'email'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black-900'
                  : 'bg-black-700 text-gray-400 hover:bg-black-600'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setRegisterMethod('phone')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                registerMethod === 'phone'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black-900'
                  : 'bg-black-700 text-gray-400 hover:bg-black-600'
              }`}
            >
              Phone
            </button>
            <button
              onClick={() => setRegisterMethod('email-otp')}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                registerMethod === 'email-otp'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black-900'
                  : 'bg-black-700 text-gray-400 hover:bg-black-600'
              }`}
            >
              Email OTP
            </button>
          </div>

          {/* Register Form */}
          {registerMethod === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Referral Code (Optional)</label>
              <div className="relative">
                <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all uppercase text-sm sm:text-base"
                  placeholder="Enter referral code"
                />
              </div>
              {formData.referralCode && (
                <p className="text-gold-400 text-xs mt-1">
                  🎉 You'll get 100 bonus points for using a referral code!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          )}

          {registerMethod === 'phone' && (
            <div className="space-y-4 sm:space-y-5">
              {!otpSent ? (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        placeholder="+1 234 567 8900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendPhoneOTP}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    style={{
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    {loading ? 'Sending OTP...' : (
                      <>
                        Send OTP
                        <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div>
                  <label className="block text-gray-300 mb-4 text-sm">Enter OTP sent to {formData.phoneNumber}</label>
                  <OTPInput length={6} onComplete={handleVerifyPhoneOTP} disabled={loading} />
                  <button
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="w-full mt-6 text-gold-400 text-sm hover:underline flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resend OTP
                  </button>
                </div>
              )}
              <div id="recaptcha-container"></div>
            </div>
          )}

          {registerMethod === 'email-otp' && (
            <div className="space-y-4 sm:space-y-5">
              {!otpSent ? (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendEmailOTP}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    style={{
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    {loading ? 'Sending OTP...' : (
                      <>
                        Send OTP
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div>
                  <label className="block text-gray-300 mb-4 text-sm">Enter OTP sent to {formData.email}</label>
                  <OTPInput length={6} onComplete={handleVerifyEmailOTP} disabled={loading} />
                  <button
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="w-full mt-6 text-gold-400 text-sm hover:underline flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resend OTP
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold-500/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Register */}
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-400 hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
