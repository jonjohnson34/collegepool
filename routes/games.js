const express = require('express');
const jwt = require('jsonwebtoken');
const Game = require('../models/Game');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Get all games (with optional filters)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { date, status, season, limit = 50 } = req.query;
    const filter = {};

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    if (status) {
      filter.status = status;
    }

    if (season) {
      filter.season = season;
    }

    const games = await Game.find(filter)
      .sort({ date: 1 })
      .limit(parseInt(limit));

    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get games by date range
router.get('/date-range', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, season } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const filter = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    if (season) {
      filter.season = season;
    }

    const games = await Game.find(filter).sort({ date: 1 });
    res.json(games);
  } catch (error) {
    console.error('Get games by date range error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming games (next 7 days)
router.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const games = await Game.find({
      date: { $gte: today },
      status: { $in: ['Scheduled', 'Live'] }
    })
    .sort({ date: 1 })
    .limit(parseInt(limit));

    res.json(games);
  } catch (error) {
    console.error('Get upcoming games error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent games (last 7 days)
router.get('/recent', authenticateToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const games = await Game.find({
      date: { $gte: lastWeek, $lte: today },
      status: 'Final'
    })
    .sort({ date: -1 })
    .limit(parseInt(limit));

    res.json(games);
  } catch (error) {
    console.error('Get recent games error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get game by ID
router.get('/:gameId', authenticateToken, async (req, res) => {
  try {
    const game = await Game.findOne({ gameId: req.params.gameId });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error('Get game by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update game (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const gameData = req.body;
    const existingGame = await Game.findOne({ gameId: gameData.gameId });

    if (existingGame) {
      // Update existing game
      const updatedGame = await Game.findOneAndUpdate(
        { gameId: gameData.gameId },
        gameData,
        { new: true, runValidators: true }
      );
      res.json(updatedGame);
    } else {
      // Create new game
      const newGame = new Game(gameData);
      await newGame.save();
      res.status(201).json(newGame);
    }
  } catch (error) {
    console.error('Create/update game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update game scores (admin only)
router.patch('/:gameId/scores', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { homeScore, awayScore, status } = req.body;
    const updateData = {};

    if (homeScore !== undefined) updateData['homeTeam.score'] = homeScore;
    if (awayScore !== undefined) updateData['awayTeam.score'] = awayScore;
    if (status) updateData.status = status;

    const game = await Game.findOneAndUpdate(
      { gameId: req.params.gameId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Update game scores error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 