import express from 'express';
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Posts route' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;