import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Key, ArrowLeft, Phone, Smartphone, RefreshCw } from 'lucide-react';
import OTPInput from '../components/OTPInput';

const ForgotPasswordPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const { sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });

      await sendPhoneOTP(phoneNumber, recaptchaVerifier);
      setOtpSent(true);
    } catch (error) {
      setError('Failed to send OTP. Please check your phone number.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otpCode) => {
    setError('');
    setLoading(true);

    try {
      await verifyPhoneOTP(otpCode);
      setPasswordReset(true);
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    await handleSendOTP();
  };

  const handleBackToLogin = () => {
    navigate('/login');
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

      {/* Forgot Password Card */}
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
          {/* Back Button */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Login</span>
          </button>

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
                <Key className="w-7 h-7 sm:w-8 sm:h-8 text-black-900" />
              </div>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gold-400 mt-4 mb-2"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                }}
            >
              Reset Password
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Verify your phone number to reset password</p>
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

          {/* Success Message */}
          {passwordReset && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6"
            >
              Password reset successful! You can now login with your new password.
            </motion.div>
          )}

          {!passwordReset ? (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={otpSent}
                    className="w-full bg-black-700 border border-gold-500/50 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold py-2.5 sm:py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  {loading ? 'Sending OTP...' : (
                    <>
                      Send OTP
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              ) : (
                <div>
                  <label className="block text-gray-300 mb-4 text-sm">Enter OTP sent to {phoneNumber}</label>
                  <OTPInput length={6} onComplete={handleVerifyOTP} disabled={loading} />
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
          ) : (
            <button
              onClick={handleBackToLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
              }}
            >
              Go to Login
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
