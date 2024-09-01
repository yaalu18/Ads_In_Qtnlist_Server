import express from 'express';
import Ad from '../models/Ad.js';

const router = express.Router();

// Get all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
