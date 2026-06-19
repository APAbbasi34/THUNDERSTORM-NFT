const express = require('express');
const router = express.Router();

// Get all NFTs
router.get('/', (req, res) => {
  res.json({
    nfts: [
      { id: 1, name: 'Golden Thunder', price: '2.5 ETH', rarity: 'Legendary', creator: '0x1234...5678' },
      { id: 2, name: 'Purple Storm', price: '1.8 ETH', rarity: 'Rare', creator: '0x8765...4321' },
      { id: 3, name: 'Lightning Gem', price: '0.9 ETH', rarity: 'Common', creator: '0x9876...5432' }
    ]
  });
});

// Get NFT by ID
router.get('/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Golden Thunder',
    price: '2.5 ETH',
    rarity: 'Legendary',
    creator: '0x1234...5678',
    description: 'A legendary artifact imbued with the power of thunderstorms.',
    properties: [
      { trait: 'Power', value: 'Thunder' },
      { trait: 'Element', value: 'Electric' }
    ]
  });
});

// Create new NFT
router.post('/', (req, res) => {
  res.json({ message: 'NFT created successfully', nft: req.body });
});

// Update NFT
router.put('/:id', (req, res) => {
  res.json({ message: 'NFT updated successfully' });
});

// Delete NFT
router.delete('/:id', (req, res) => {
  res.json({ message: 'NFT deleted successfully' });
});

module.exports = router;
