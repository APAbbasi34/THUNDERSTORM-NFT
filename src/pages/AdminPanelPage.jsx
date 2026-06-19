import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, ShoppingBag, TrendingUp, Settings, Shield, Ban, Check, X, Search, Filter, Download, DollarSign, AlertTriangle, FileText, Bell, Lock, TreePine, Edit, Wallet, Eye, Calendar, Plus, Trash2, UserPlus, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanelPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTreeModal, setShowTreeModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showAddNFTModal, setShowAddNFTModal] = useState(false);
  const [showEditNFTModal, setShowEditNFTModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [newUser, setNewUser] = useState({ email: '', wallet: '', referralId: '', balance: 0 });
  const [newTask, setNewTask] = useState({ title: '', reward: '', expiry: '' });
  const [editTaskReward, setEditTaskReward] = useState('');
  const [newNFT, setNewNFT] = useState({ name: '', price: '', rarity: 'Common' });
  const [editNFTPrice, setEditNFTPrice] = useState('');

  // Sample data
  const dashboardStats = {
    totalActiveUsers: 1250,
    totalPoolLiquidity: '5,234,500 USD',
    pendingWithdrawals: 45,
    dailyPayouts: '125,600 USD',
    recentReferralAlerts: 12,
  };

  const users = [
    { id: 1, email: 'user1@example.com', wallet: '0x1234...5678', referralId: 'REF001', balance: 5000, status: 'active', joined: '2024-06-01', referrals: 15, level: 3 },
    { id: 2, email: 'user2@example.com', wallet: '0x8765...4321', referralId: 'REF002', balance: 12000, status: 'active', joined: '2024-05-15', referrals: 28, level: 5 },
    { id: 3, email: 'user3@example.com', wallet: '0x9876...5432', referralId: 'REF003', balance: 2000, status: 'suspended', joined: '2024-06-10', referrals: 5, level: 2 },
    { id: 4, email: 'user4@example.com', wallet: '0x5432...9876', referralId: 'REF004', balance: 8000, status: 'active', joined: '2024-04-20', referrals: 42, level: 6 },
  ];

  const nfts = [
    { id: 1, name: 'Golden Thunder', price: 2500, rarity: 'Legendary', status: 'listed', minted: '2024-06-15' },
    { id: 2, name: 'Purple Storm', price: 1800, rarity: 'Rare', status: 'sold', minted: '2024-06-14' },
    { id: 3, name: 'Lightning Gem', price: 900, rarity: 'Common', status: 'listed', minted: '2024-06-13' },
    { id: 4, name: 'Cosmic Dragon', price: 5000, rarity: 'Legendary', status: 'listed', minted: '2024-06-12' },
  ];

  const withdrawalQueue = [
    { id: 1, user: 'user1@example.com', wallet: '0x1234...5678', amount: 500, date: '2024-06-19', status: 'pending' },
    { id: 2, user: 'user2@example.com', wallet: '0x8765...4321', amount: 1200, date: '2024-06-19', status: 'pending' },
    { id: 3, user: 'user3@example.com', wallet: '0x9876...5432', amount: 300, date: '2024-06-18', status: 'approved' },
  ];

  const globalSettings = {
    referralCommission: {
      level1: 10,
      level2: 5,
      level3: 3,
      level4: 2,
      level5: 1,
    },
    dailyProfitROI: 1.5,
    minimumWithdrawal: 100,
    adminWalletAddress: '0xAdminWallet...TRC20',
    supportedNetworks: ['TRC20', 'BEP20'],
  };

  const tasks = [
    { id: 1, title: 'Daily Login Bonus', reward: 10, expiry: '2024-06-20', status: 'active' },
    { id: 2, title: 'Share on Social Media', reward: 25, expiry: '2024-06-21', status: 'active' },
    { id: 3, title: 'Refer 3 Friends', reward: 100, expiry: '2024-06-25', status: 'expired' },
  ];

  const announcements = [
    { id: 1, title: 'New Feature Launch', startDate: '2024-06-20', endDate: '2024-06-30', status: 'active', type: 'popup' },
    { id: 2, title: 'Maintenance Notice', startDate: '2024-06-25', endDate: '2024-06-26', status: 'scheduled', type: 'banner' },
  ];

  const fraudAlerts = [
    { id: 1, user: 'user5@example.com', wallet: '0xabcd...efgh', type: 'Duplicate IP', date: '2024-06-19', severity: 'high' },
    { id: 2, user: 'user6@example.com', wallet: '0xijkl...mnop', type: 'Rapid Deposits', date: '2024-06-19', severity: 'medium' },
    { id: 3, user: 'user7@example.com', wallet: '0qrst...uvwx', type: 'Multiple Accounts', date: '2024-06-18', severity: 'high' },
  ];

  const systemLogs = [
    { id: 1, action: 'User Login', user: 'user1@example.com', timestamp: '2024-06-19 14:30:22', ip: '192.168.1.1' },
    { id: 2, action: 'Withdrawal Request', user: 'user2@example.com', timestamp: '2024-06-19 14:25:15', ip: '192.168.1.2' },
    { id: 3, action: 'Referral Bonus', user: 'user3@example.com', timestamp: '2024-06-19 14:20:10', ip: '192.168.1.3' },
    { id: 4, action: 'Password Reset', user: 'user4@example.com', timestamp: '2024-06-19 14:15:05', ip: '192.168.1.4' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Users & Referrals', icon: Users },
    { id: 'nfts', label: 'NFT Management', icon: ShoppingBag },
    { id: 'withdrawals', label: 'Withdrawals', icon: DollarSign },
    { id: 'settings', label: 'Global Settings', icon: Settings },
    { id: 'tasks', label: 'Task Manager', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'fraud', label: 'Fraud Alerts', icon: AlertTriangle },
    { id: 'logs', label: 'System Logs', icon: Shield },
  ];

  const handleApproveWithdrawal = (id) => {
    alert(`Withdrawal ${id} approved`);
  };

  const handleRejectWithdrawal = (id) => {
    alert(`Withdrawal ${id} rejected`);
  };

  const handleSuspendUser = (userId) => {
    alert(`User ${userId} suspended`);
  };

  const handleResetPassword = (userId) => {
    alert(`Password reset sent for user ${userId}`);
  };

  const handleAdjustBalance = () => {
    alert(`Balance adjusted for user ${selectedUser?.id}: ${balanceAmount}`);
    setShowBalanceModal(false);
    setBalanceAmount('');
    setSelectedUser(null);
  };

  const handleSaveSettings = () => {
    alert('Global settings saved');
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      alert(`User ${userId} deleted`);
    }
  };

  const handleAddUser = () => {
    alert(`New user added: ${newUser.email}`);
    setShowAddUserModal(false);
    setNewUser({ email: '', wallet: '', referralId: '', balance: 0 });
  };

  const handleAdjustLevel = (direction) => {
    if (selectedUser) {
      const newLevel = direction === 'up' ? selectedUser.level + 1 : selectedUser.level - 1;
      alert(`User ${selectedUser.id} level changed from ${selectedUser.level} to ${newLevel}`);
      setShowLevelModal(false);
      setSelectedUser(null);
    }
  };

  const handleAddTask = () => {
    alert(`New task added: ${newTask.title} with reward $${newTask.reward}`);
    setShowTaskModal(false);
    setNewTask({ title: '', reward: '', expiry: '' });
  };

  const handleEditTaskReward = () => {
    if (selectedTask) {
      alert(`Task ${selectedTask.id} reward changed from $${selectedTask.reward} to $${editTaskReward}`);
      setShowEditTaskModal(false);
      setSelectedTask(null);
      setEditTaskReward('');
    }
  };

  const handleAddNFT = () => {
    alert(`New NFT added: ${newNFT.name} with price $${newNFT.price}`);
    setShowAddNFTModal(false);
    setNewNFT({ name: '', price: '', rarity: 'Common', creator: '' });
  };

  const handleEditNFTPrice = () => {
    if (selectedNFT) {
      alert(`NFT ${selectedNFT.id} price changed from $${selectedNFT.price} to $${editNFTPrice}`);
      setShowEditNFTModal(false);
      setSelectedNFT(null);
      setEditNFTPrice('');
    }
  };

  const handleDeleteNFT = (nftId) => {
    if (confirm('Are you sure you want to delete this NFT?')) {
      alert(`NFT ${nftId} deleted`);
    }
  };

  return (
    <div className="min-h-screen bg-black-900 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-gold-400" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-400"
                style={{
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                }}
            >
              Admin Panel
            </h1>
          </div>
          <p className="text-gray-400">Manage platform users, finances, settings, and security</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black-800 rounded-2xl border border-purple-500/30 overflow-hidden mb-6"
        >
          <div className="flex flex-wrap border-b border-purple-500/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 transition-colors text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 text-gold-400 border-b-2 border-gold-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black-800 rounded-2xl border border-purple-500/30 overflow-hidden"
        >
          <div className="p-6">
            {/* Users & Referrals Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Search by wallet address or referral ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-black-700 border border-purple-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all"
                  >
                    <UserPlus className="w-5 h-5" />
                    Add User
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all">
                    <Download className="w-5 h-5" />
                    Export
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Wallet</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Referral ID</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Balance</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Referrals</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Level</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-purple-500/20 hover:bg-black-700/50 transition-colors">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-white font-medium">{user.email}</p>
                              <p className="text-gray-500 text-xs">Joined {user.joined}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-purple-400 font-mono text-sm">{user.wallet}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gold-400 font-semibold">{user.referralId}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white">${user.balance.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white">{user.referrals}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-purple-400">L{user.level}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2 flex-wrap">
                              <button 
                                onClick={() => { setSelectedUser(user); setShowTreeModal(true); }}
                                className="p-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors"
                                title="View Tree"
                              >
                                <TreePine className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => { setSelectedUser(user); setShowLevelModal(true); }}
                                className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
                                title="Adjust Level"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleSuspendUser(user.id)}
                                className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                                title="Suspend Account"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleResetPassword(user.id)}
                                className="p-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                                title="Reset Password"
                              >
                                <Lock className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => { setSelectedUser(user); setShowBalanceModal(true); }}
                                className="p-2 bg-gold-500/20 rounded-lg text-gold-400 hover:bg-gold-500/30 transition-colors"
                                title="Adjust Balance"
                              >
                                <Wallet className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 bg-red-600/20 rounded-lg text-red-500 hover:bg-red-600/30 transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tree Modal */}
                {showTreeModal && selectedUser && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-2xl w-full border border-purple-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Referral Tree - {selectedUser.email}</h3>
                        <button onClick={() => setShowTreeModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="bg-black-700 rounded-xl p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="bg-purple-500/20 border-2 border-gold-400 rounded-lg p-4 text-center">
                            <p className="text-white font-semibold">{selectedUser.email}</p>
                            <p className="text-gold-400 text-sm">{selectedUser.referralId}</p>
                            <p className="text-gray-400 text-xs">Level {selectedUser.level}</p>
                          </div>
                          <div className="flex gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-px h-8 bg-purple-500"></div>
                              <div className="bg-black-600 border border-purple-500/50 rounded-lg p-3 text-center">
                                <p className="text-white text-sm">ref1@example.com</p>
                                <p className="text-gray-400 text-xs">REF005</p>
                              </div>
                              <div className="flex gap-4">
                                <div className="w-px h-6 bg-purple-500/50"></div>
                                <div className="w-px h-6 bg-purple-500/50"></div>
                              </div>
                              <div className="flex gap-4">
                                <div className="bg-black-600 border border-purple-500/50 rounded-lg p-2 text-center">
                                  <p className="text-white text-xs">ref2@example.com</p>
                                </div>
                                <div className="bg-black-600 border border-purple-500/50 rounded-lg p-2 text-center">
                                  <p className="text-white text-xs">ref3@example.com</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-px h-8 bg-purple-500"></div>
                              <div className="bg-black-600 border border-purple-500/50 rounded-lg p-3 text-center">
                                <p className="text-white text-sm">ref4@example.com</p>
                                <p className="text-gray-400 text-xs">REF006</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Balance Modal */}
                {showBalanceModal && selectedUser && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-gold-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Adjust Balance - {selectedUser.email}</h3>
                        <button onClick={() => setShowBalanceModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Current Balance</label>
                          <div className="bg-black-700 rounded-lg p-3 text-white font-semibold">
                            ${selectedUser.balance.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Adjustment Amount (USD)</label>
                          <input
                            type="number"
                            value={balanceAmount}
                            onChange={(e) => setBalanceAmount(e.target.value)}
                            placeholder="Enter amount (positive to add, negative to subtract)"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAdjustBalance}
                            className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all"
                          >
                            Confirm Adjustment
                          </button>
                          <button
                            onClick={() => { setShowBalanceModal(false); setBalanceAmount(''); setSelectedUser(null); }}
                            className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add User Modal */}
                {showAddUserModal && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-green-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Add New User</h3>
                        <button onClick={() => setShowAddUserModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Email</label>
                          <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Enter email address"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Wallet Address</label>
                          <input
                            type="text"
                            value={newUser.wallet}
                            onChange={(e) => setNewUser({ ...newUser, wallet: e.target.value })}
                            placeholder="Enter wallet address"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Referral ID</label>
                          <input
                            type="text"
                            value={newUser.referralId}
                            onChange={(e) => setNewUser({ ...newUser, referralId: e.target.value })}
                            placeholder="Enter referral ID"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Initial Balance (USD)</label>
                          <input
                            type="number"
                            value={newUser.balance}
                            onChange={(e) => setNewUser({ ...newUser, balance: parseInt(e.target.value) || 0 })}
                            placeholder="Enter initial balance"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddUser}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold py-3 rounded-lg hover:from-green-400 hover:to-green-500 transition-all"
                          >
                            Add User
                          </button>
                          <button
                            onClick={() => { setShowAddUserModal(false); setNewUser({ email: '', wallet: '', referralId: '', balance: 0 }); }}
                            className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Level Adjustment Modal */}
                {showLevelModal && selectedUser && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-blue-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Adjust Level - {selectedUser.email}</h3>
                        <button onClick={() => setShowLevelModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Current Level</label>
                          <div className="bg-black-700 rounded-lg p-3 text-white font-semibold text-center text-2xl">
                            L{selectedUser.level}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAdjustLevel('up')}
                            disabled={selectedUser.level >= 10}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold py-3 rounded-lg hover:from-green-400 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <ChevronUp className="w-5 h-5" />
                            Increase Level
                          </button>
                          <button
                            onClick={() => handleAdjustLevel('down')}
                            disabled={selectedUser.level <= 1}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-lg hover:from-red-400 hover:to-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <ChevronDown className="w-5 h-5" />
                            Decrease Level
                          </button>
                        </div>
                        <button
                          onClick={() => { setShowLevelModal(false); setSelectedUser(null); }}
                          className="w-full bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* NFT Management Tab */}
            {activeTab === 'nfts' && (
              <div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Search NFTs by name or creator..."
                      className="w-full bg-black-700 border border-purple-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddNFTModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add NFT
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all">
                    <Download className="w-5 h-5" />
                    Export
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">NFT Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Admin Wallet</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Price (USD)</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Rarity</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Minted Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nfts.map((nft) => (
                        <tr key={nft.id} className="border-b border-purple-500/20 hover:bg-black-700/50 transition-colors">
                          <td className="py-3 px-4">
                            <p className="text-white font-semibold">{nft.name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-purple-400 font-mono text-sm">{globalSettings.adminWalletAddress}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gold-400 font-semibold">${nft.price.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              nft.rarity === 'Legendary' ? 'bg-gold-500/20 text-gold-400' :
                              nft.rarity === 'Rare' ? 'bg-blue-500/20 text-blue-400' :
                              nft.rarity === 'Epic' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {nft.rarity}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              nft.status === 'listed' ? 'bg-green-500/20 text-green-400' :
                              nft.status === 'sold' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {nft.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gray-400">{nft.minted}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2 flex-wrap">
                              <button 
                                onClick={() => { setSelectedNFT(nft); setEditNFTPrice(nft.price.toString()); setShowEditNFTModal(true); }}
                                className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
                                title="Edit Price"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteNFT(nft.id)}
                                className="p-2 bg-red-600/20 rounded-lg text-red-500 hover:bg-red-600/30 transition-colors"
                                title="Delete NFT"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add NFT Modal */}
                {showAddNFTModal && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-green-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Add New NFT</h3>
                        <button onClick={() => setShowAddNFTModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">NFT Name</label>
                          <input
                            type="text"
                            value={newNFT.name}
                            onChange={(e) => setNewNFT({ ...newNFT, name: e.target.value })}
                            placeholder="Enter NFT name"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Price (USD)</label>
                          <input
                            type="number"
                            value={newNFT.price}
                            onChange={(e) => setNewNFT({ ...newNFT, price: e.target.value })}
                            placeholder="Enter price in USD"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Rarity</label>
                          <select
                            value={newNFT.rarity}
                            onChange={(e) => setNewNFT({ ...newNFT, rarity: e.target.value })}
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          >
                            <option value="Common">Common</option>
                            <option value="Rare">Rare</option>
                            <option value="Epic">Epic</option>
                            <option value="Legendary">Legendary</option>
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddNFT}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-black-900 font-bold py-3 rounded-lg hover:from-green-400 hover:to-green-500 transition-all"
                          >
                            Add NFT
                          </button>
                          <button
                            onClick={() => { setShowAddNFTModal(false); setNewNFT({ name: '', price: '', rarity: 'Common' }); }}
                            className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit NFT Price Modal */}
                {showEditNFTModal && selectedNFT && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-blue-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Edit NFT Price</h3>
                        <button onClick={() => setShowEditNFTModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">NFT Name</label>
                          <div className="bg-black-700 rounded-lg p-3 text-white font-semibold">
                            {selectedNFT.name}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Current Price</label>
                          <div className="bg-black-700 rounded-lg p-3 text-gold-400 font-semibold text-center text-2xl">
                            ${selectedNFT.price.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">New Price (USD)</label>
                          <input
                            type="number"
                            value={editNFTPrice}
                            onChange={(e) => setEditNFTPrice(e.target.value)}
                            placeholder="Enter new price"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleEditNFTPrice}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all"
                          >
                            Update Price
                          </button>
                          <button
                            onClick={() => { setShowEditNFTModal(false); setSelectedNFT(null); setEditNFTPrice(''); }}
                            className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Withdrawals Tab */}
            {activeTab === 'withdrawals' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Withdrawal Queue</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Wallet</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawalQueue.map((withdrawal) => (
                        <tr key={withdrawal.id} className="border-b border-purple-500/20 hover:bg-black-700/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="text-white">{withdrawal.user}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-purple-400 font-mono text-sm">{withdrawal.wallet}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gold-400 font-semibold">${withdrawal.amount}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gray-400">{withdrawal.date}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              withdrawal.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              withdrawal.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {withdrawal.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {withdrawal.status === 'pending' && (
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleApproveWithdrawal(withdrawal.id)}
                                  className="p-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleRejectWithdrawal(withdrawal.id)}
                                  className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Global Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Global Settings</h2>
                <div className="space-y-6">
                  <div className="bg-black-700 rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-white mb-4">Referral Commission % per Level</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {Object.entries(globalSettings.referralCommission).map(([level, value]) => (
                        <div key={level}>
                          <label className="block text-gray-300 mb-2 text-sm">Level {level.replace('level', '')}</label>
                          <input
                            type="number"
                            defaultValue={value}
                            className="w-full bg-black-800 border border-purple-500/50 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black-700 rounded-xl p-6 border border-gold-500/30">
                    <h3 className="text-lg font-bold text-white mb-4">Financial Settings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Daily Profit ROI %</label>
                        <input
                          type="number"
                          step="0.1"
                          defaultValue={globalSettings.dailyProfitROI}
                          className="w-full bg-black-800 border border-gold-500/50 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Minimum Withdrawal (USD)</label>
                        <input
                          type="number"
                          defaultValue={globalSettings.minimumWithdrawal}
                          className="w-full bg-black-800 border border-gold-500/50 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-black-700 rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-white mb-4">Wallet & Network Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Admin Wallet Address (TRC20/BEP20)</label>
                        <input
                          type="text"
                          defaultValue={globalSettings.adminWalletAddress}
                          className="w-full bg-black-800 border border-purple-500/50 rounded-lg py-2 px-3 text-white font-mono text-sm focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Supported Networks</label>
                        <div className="flex gap-3">
                          {globalSettings.supportedNetworks.map((network) => (
                            <span key={network} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                              {network}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black-700 rounded-xl p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-white mb-4">Platform Controls</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">Maintenance Mode</p>
                          <p className="text-gray-400 text-sm">Temporarily disable the platform</p>
                        </div>
                        <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">New User Registration</p>
                          <p className="text-gray-400 text-sm">Allow new users to sign up</p>
                        </div>
                        <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 font-bold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all"
                  >
                    Save Global Settings
                  </button>
                </div>
              </div>
            )}

            {/* Task Manager Tab */}
            {activeTab === 'tasks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Task Manager</h2>
                  <button 
                    onClick={() => setShowTaskModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </div>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-black-700 rounded-xl p-4 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{task.title}</p>
                          <p className="text-gray-400 text-sm">Reward: ${task.reward} | Expires: {task.expiry}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {task.status}
                        </span>
                        <button 
                          onClick={() => { setSelectedTask(task); setEditTaskReward(task.reward.toString()); setShowEditTaskModal(true); }}
                          className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
                          title="Modify Reward"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Task Modal */}
                {showTaskModal && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-purple-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Add New Task</h3>
                        <button onClick={() => setShowTaskModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Task Title</label>
                          <input
                            type="text"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            placeholder="Enter task title"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Reward Amount (USD)</label>
                          <input
                            type="number"
                            value={newTask.reward}
                            onChange={(e) => setNewTask({ ...newTask, reward: e.target.value })}
                            placeholder="Enter reward amount"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Expiry Date</label>
                          <input
                            type="date"
                            value={newTask.expiry}
                            onChange={(e) => setNewTask({ ...newTask, expiry: e.target.value })}
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleAddTask}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all"
                          >
                            Add Task
                          </button>
                          <button
                            onClick={() => { setShowTaskModal(false); setNewTask({ title: '', reward: '', expiry: '' }); }}
                            className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Task Reward Modal */}
                {showEditTaskModal && selectedTask && (
                  <div className="fixed inset-0 bg-black-900/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-black-800 rounded-2xl p-6 max-w-md w-full border border-blue-500/30">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Modify Task Reward</h3>
                        <button onClick={() => setShowEditTaskModal(false)} className="text-gray-400 hover:text-white">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Task Title</label>
                          <div className="bg-black-700 rounded-lg p-3 text-white font-semibold">
                            {selectedTask.title}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">Current Reward</label>
                          <div className="bg-black-700 rounded-lg p-3 text-gold-400 font-semibold text-center text-2xl">
                            ${selectedTask.reward}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-sm">New Reward Amount (USD)</label>
                          <input
                            type="number"
                            value={editTaskReward}
                            onChange={(e) => setEditTaskReward(e.target.value)}
                            placeholder="Enter new reward amount"
                            className="w-full bg-black-700 border border-purple-500/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleEditTaskReward}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all"
                          >
                            Update Reward
                          </button>
                          <button
                            onClick={() => { setShowEditTaskModal(false); setSelectedTask(null); setEditTaskReward(''); }}
                            className="flex-1 bg-black-700 text-white py-3 rounded-lg hover:bg-black-600 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Announcement Manager</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all">
                    <Plus className="w-4 h-4" />
                    New Announcement
                  </button>
                </div>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="bg-black-700 rounded-xl p-4 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{announcement.title}</p>
                          <p className="text-gray-400 text-sm">
                            {announcement.type === 'popup' ? 'Popup' : 'Banner'} | {announcement.startDate} - {announcement.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {announcement.status}
                        </span>
                        <button className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fraud Alerts Tab */}
            {activeTab === 'fraud' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Fraud Alerts</h2>
                <div className="space-y-4">
                  {fraudAlerts.map((alert) => (
                    <div key={alert.id} className={`bg-black-700 rounded-xl p-4 border ${
                      alert.severity === 'high' ? 'border-red-500/50' : 'border-yellow-500/50'
                    } flex items-center justify-between`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          alert.severity === 'high' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            alert.severity === 'high' ? 'text-red-400' : 'text-yellow-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{alert.user}</p>
                          <p className="text-gray-400 text-sm">{alert.type} | {alert.wallet} | {alert.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {alert.severity}
                        </span>
                        <button className="p-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Logs Tab */}
            {activeTab === 'logs' && (
              <div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="w-full bg-black-700 border border-purple-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all">
                    <Download className="w-5 h-5" />
                    Export Logs
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Timestamp</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemLogs.map((log) => (
                        <tr key={log.id} className="border-b border-purple-500/20 hover:bg-black-700/50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="text-white">{log.action}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-purple-400">{log.user}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gray-400 font-mono text-sm">{log.timestamp}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gold-400 font-mono text-sm">{log.ip}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
