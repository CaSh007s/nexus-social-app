import express from 'express';
const router = express.Router();

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    res.json({ message: 'User profile route' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;