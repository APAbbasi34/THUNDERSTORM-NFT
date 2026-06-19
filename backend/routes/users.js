const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // In production, this would fetch from Firebase
  res.json({
    users: [
      { id: 1, email: 'user1@example.com', wallet: '0x1234...5678', points: 500, nfts: 3, status: 'active' },
      { id: 2, email: 'user2@example.com', wallet: '0x8765...4321', points: 1200, nfts: 7, status: 'active' }
    ]
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  res.json({
    id: req.params.id,
    email: 'user@example.com',
    wallet: '0x1234...5678',
    points: 500,
    nfts: 3,
    status: 'active'
  });
});

// Update user
router.put('/:id', (req, res) => {
  res.json({ message: 'User updated successfully' });
});

// Delete user
router.delete('/:id', (req, res) => {
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
