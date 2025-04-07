import express from 'express';
const router = express.Router();

// Get messages
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Messages route' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;