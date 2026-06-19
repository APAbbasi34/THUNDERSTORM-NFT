const express = require('express');
const router = express.Router();

// Get all transactions
router.get('/', (req, res) => {
  res.json({
    transactions: [
      { id: '0x1234...5678', type: 'purchase', item: 'Golden Thunder', amount: '2.5 ETH', status: 'completed' },
      { id: '0x8765...4321', type: 'sale', item: 'Purple Storm', amount: '1.8 ETH', status: 'completed' },
      { id: '0x9876...5432', type: 'mint', item: 'Lightning Gem', amount: '0.001 ETH', status: 'completed' }
    ]
  });
});

// Get transaction by ID
router.get('/:id', (req, res) => {
  res.json({
    id: req.params.id,
    type: 'purchase',
    item: 'Golden Thunder',
    amount: '2.5 ETH',
    status: 'completed',
    date: '2024-06-18 14:30'
  });
});

// Create new transaction
router.post('/', (req, res) => {
  res.json({ message: 'Transaction created successfully', transaction: req.body });
});

// Update transaction
router.put('/:id', (req, res) => {
  res.json({ message: 'Transaction updated successfully' });
});

module.exports = router;
