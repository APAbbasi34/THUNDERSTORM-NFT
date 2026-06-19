import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Download, Clock, TrendingUp, ArrowDownRight, ArrowUpRight, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample transaction data
  const transactions = [
    {
      id: '0x1234...5678',
      type: 'purchase',
      item: 'Golden Thunder',
      amount: '2500 USD',
      date: '2024-06-18 14:30',
      status: 'completed',
      from: '0x8765...4321',
      to: '0x1234...5678'
    },
    {
      id: '0x8765...4321',
      type: 'sale',
      item: 'Purple Storm',
      amount: '1800 USD',
      date: '2024-06-17 09:15',
      status: 'completed',
      from: '0x1234...5678',
      to: '0x9876...5432'
    },
    {
      id: '0x9876...5432',
      type: 'mint',
      item: 'Lightning Gem',
      amount: '1 USD',
      date: '2024-06-16 16:45',
      status: 'completed',
      from: 'Contract',
      to: '0x1234...5678'
    },
    {
      id: '0x5432...9876',
      type: 'bid',
      item: 'Storm Crown',
      amount: '4000 USD',
      date: '2024-06-15 11:20',
      status: 'pending',
      from: '0x1234...5678',
      to: '0x2468...1357'
    },
    {
      id: '0x2468...1357',
      type: 'purchase',
      item: 'Ancient Key',
      amount: '3200 USD',
      date: '2024-06-14 08:00',
      status: 'failed',
      from: '0x7890...1234',
      to: '0x1234...5678'
    },
    {
      id: '0x7890...1234',
      type: 'reward',
      item: 'Daily Login Bonus',
      amount: '+50 points',
      date: '2024-06-13 00:00',
      status: 'completed',
      from: 'System',
      to: '0x1234...5678'
    },
    {
      id: '0x1357...2468',
      type: 'referral',
      item: 'New user referred',
      amount: '+100 points',
      date: '2024-06-12 15:30',
      status: 'completed',
      from: 'System',
      to: '0x1234...5678'
    }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'all' || tx.type === filter;
    const matchesSearch = tx.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const typeColors = {
    'purchase': 'from-green-500 to-green-600',
    'sale': 'from-blue-500 to-blue-600',
    'mint': 'from-purple-500 to-purple-600',
    'bid': 'from-yellow-500 to-yellow-600',
    'reward': 'from-gold-400 to-gold-500',
    'referral': 'from-pink-500 to-pink-600'
  };

  const statusIcons = {
    'completed': <CheckCircle className="w-5 h-5 text-green-400" />,
    'pending': <Clock className="w-5 h-5 text-yellow-400" />,
    'failed': <XCircle className="w-5 h-5 text-red-400" />
  };

  const typeIcons = {
    'purchase': <ArrowDownRight className="w-5 h-5" />,
    'sale': <ArrowUpRight className="w-5 h-5" />,
    'mint': <TrendingUp className="w-5 h-5" />,
    'bid': <Clock className="w-5 h-5" />,
    'reward': <CheckCircle className="w-5 h-5" />,
    'referral': <CheckCircle className="w-5 h-5" />
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-400 mb-2"
              style={{
                textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              }}
          >
            Transaction History
          </h1>
          <p className="text-gray-400">Track all your NFT transactions and activities</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-black-800 rounded-2xl p-6 border border-gold-500/30"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-green-400 text-2xl font-bold">$12,500 USD</span>
            </div>
            <p className="text-gray-400 text-sm">Total Spent</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black-800 rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-blue-400 text-2xl font-bold">$8,200 USD</span>
            </div>
            <p className="text-gray-400 text-sm">Total Earned</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black-800 rounded-2xl p-6 border border-gold-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-black-900" />
              </div>
              <span className="text-gold-400 text-2xl font-bold">{transactions.length}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Transactions</p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black-800 border border-purple-500/50 rounded-xl py-3 pl-4 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-black-800 border border-gold-500/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="purchase">Purchases</option>
              <option value="sale">Sales</option>
              <option value="mint">Mints</option>
              <option value="bid">Bids</option>
              <option value="reward">Rewards</option>
              <option value="referral">Referrals</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all">
            <Download className="w-5 h-5" />
            Export
          </button>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black-800 rounded-2xl border border-purple-500/30 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Transaction</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="border-b border-purple-500/20 hover:bg-black-700/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-medium">{tx.item}</p>
                        <p className="text-gray-500 text-sm">{tx.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[tx.type]} w-fit`}>
                        {typeIcons[tx.type]}
                        <span className="text-white text-xs font-medium capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${tx.type === 'reward' || tx.type === 'referral' ? 'text-green-400' : 'text-gold-400'}`}>
                        {tx.amount}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-400">{tx.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {statusIcons[tx.status]}
                        <span className={`text-sm font-medium capitalize ${
                          tx.status === 'completed' ? 'text-green-400' :
                          tx.status === 'pending' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No transactions found</p>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-between mt-6"
          >
            <p className="text-gray-400 text-sm">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-black-800 border border-purple-500/30 rounded-lg text-gray-400 hover:text-white transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
                1
              </button>
              <button className="px-4 py-2 bg-black-800 border border-purple-500/30 rounded-lg text-gray-400 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
