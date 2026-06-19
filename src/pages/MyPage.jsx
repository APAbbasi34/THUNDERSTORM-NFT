import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, LogOut, Edit3, Camera, Mail, Phone, Lock as LockIcon, Globe, ChevronRight, Wallet, DollarSign, Plus, Copy, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
  const [copied, setCopied] = useState(false);
  const [userBalance, setUserBalance] = useState(5000);
  const [formData, setFormData] = useState({
    name: user?.displayName || 'User',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    bio: 'NFT enthusiast and crypto investor',
  });

  const adminWalletAddress = '0xAdminWallet...TRC20';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(adminWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setUserBalance(prev => prev + amount);
      setShowDepositModal(false);
      setDepositAmount('');
      alert(`Successfully deposited $${amount} via ${selectedNetwork}`);
    }
  };

  const menuItems = [
    { icon: Settings, label: 'Settings', description: 'Manage your account settings' },
    { icon: Bell, label: 'Notifications', description: 'Configure notification preferences' },
    { icon: Shield, label: 'Security', description: 'Password and 2FA settings' },
    { icon: Globe, label: 'Language', description: 'Change app language' },
    { icon: LockIcon, label: 'Privacy', description: 'Manage your privacy settings' },
  ];

  return (
    <div className="min-h-screen bg-black-900 pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-purple-500 rounded-lg flex items-center justify-center"
                 style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
            >
              <User className="w-6 h-6 text-black-900" />
            </div>
            <h1 className="text-3xl font-bold text-gold-400">My Profile</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-purple-500/30"
               style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
          >
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-purple-500 rounded-full flex items-center justify-center"
                     style={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}
                >
                  <User className="w-12 h-12 text-black-900" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-black-800 hover:bg-purple-400 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-gold-400"
                    />
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-gold-400 resize-none"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold py-2 px-4 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-black-700 text-white py-2 px-4 rounded-lg hover:bg-black-600 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{formData.name}</h2>
                    <p className="text-gray-400 mb-3">{formData.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {formData.email || 'Not set'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {formData.phone || 'Not set'}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-3 text-gold-400 text-sm flex items-center gap-1 hover:underline"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total NFTs', value: '12', icon: '🎨' },
              { label: 'Total Value', value: '$24,950', icon: '💰' },
              { label: 'Member Since', value: '2024', icon: '📅' },
            ].map((stat) => (
              <div key={stat.label} className="bg-black-800/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <div className="text-white font-bold text-lg">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Balance & Deposit Section */}
          <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-gold-500/30"
               style={{ boxShadow: '0 0 40px rgba(255, 215, 0, 0.1)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your Balance</h2>
              <button 
                onClick={() => setShowDepositModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                Deposit
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-purple-500 rounded-lg flex items-center justify-center"
                   style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
              >
                <Wallet className="w-6 h-6 text-black-900" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Available Balance</p>
                <p className="text-3xl font-bold text-gold-400">${userBalance.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-black-700/50 rounded-lg border border-purple-500/30">
              <p className="text-gray-400 text-sm mb-2">Deposit Address (TRC20/BEP20 only)</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black-800 rounded-lg p-3 text-purple-400 font-mono text-sm break-all">
                  {adminWalletAddress}
                </code>
                <button 
                  onClick={handleCopyAddress}
                  className="p-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Deposit Modal */}
          {showDepositModal && (
            <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
              <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-green-500/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Deposit Funds</h3>
                  <button onClick={() => setShowDepositModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Select Network</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedNetwork('TRC20')}
                        className={`flex-1 p-3 rounded-lg border transition-all ${
                          selectedNetwork === 'TRC20'
                            ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                            : 'bg-black-700 border-gray-600 text-gray-400'
                        }`}
                      >
                        TRC20
                      </button>
                      <button
                        onClick={() => setSelectedNetwork('BEP20')}
                        className={`flex-1 p-3 rounded-lg border transition-all ${
                          selectedNetwork === 'BEP20'
                            ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                            : 'bg-black-700 border-gray-600 text-gray-400'
                        }`}
                      >
                        BEP20
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Deposit Amount (USD)</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <div className="p-4 bg-black-700/50 rounded-lg border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-2">Send to this address:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-black-800 rounded-lg p-3 text-purple-400 font-mono text-sm break-all">
                        {adminWalletAddress}
                      </code>
                      <button 
                        onClick={handleCopyAddress}
                        className="p-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeposit}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold py-3 rounded-lg hover:from-green-400 hover:to-green-500 transition-all"
                    >
                      Confirm Deposit
                    </button>
                    <button
                      onClick={() => { setShowDepositModal(false); setDepositAmount(''); }}
                      className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="bg-black-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6"
               style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)' }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between p-4 bg-black-700/50 rounded-lg hover:bg-black-700 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold">{item.label}</div>
                        <div className="text-gray-400 text-sm">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/30"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">Logout</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MyPage;
