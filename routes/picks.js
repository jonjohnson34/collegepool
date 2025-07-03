const express = require('express');
const jwt = require('jsonwebtoken');
const Pick = require('../models/Pick');
const Game = require('../models/Game');
const User = require('../models/User');

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

// Get picks for current user
router.get('/my-picks', authenticateToken, async (req, res) => {
  try {
    const { season } = req.query;
    const filter = { userId: req.user.userId };

    if (season) {
      filter.season = season;
    }

    const picks = await Pick.find(filter)
      .sort({ gameDate: -1 });

    res.json(picks);
  } catch (error) {
    console.error('Get user picks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get picks for a specific user (admin only)
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { season } = req.query;
    const filter = { userId: req.params.userId };

    if (season) {
      filter.season = season;
    }

    const picks = await Pick.find(filter)
      .sort({ gameDate: -1 });

    res.json(picks);
  } catch (error) {
    console.error('Get user picks by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get picks for a specific game
router.get('/game/:gameId', authenticateToken, async (req, res) => {
  try {
    const picks = await Pick.find({ gameId: req.params.gameId })
      .populate('userId', 'username firstName lastName')
      .sort({ createdAt: 1 });

    res.json(picks);
  } catch (error) {
    console.error('Get game picks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's pick for a specific game
router.get('/game/:gameId/my-pick', authenticateToken, async (req, res) => {
  try {
    const pick = await Pick.findOne({
      gameId: req.params.gameId,
      userId: req.user.userId
    });

    res.json(pick);
  } catch (error) {
    console.error('Get user pick for game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update a pick
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { gameId, pickedTeam, gameDate, season } = req.body;

    // Validate required fields
    if (!gameId || !pickedTeam || !gameDate || !season) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if game exists and is not finished
    const game = await Game.findOne({ gameId });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.status === 'Final') {
      return res.status(400).json({ message: 'Cannot pick for finished games' });
    }

    // Check if game date is in the future
    const gameDateTime = new Date(gameDate);
    const now = new Date();
    
    if (gameDateTime <= now) {
      return res.status(400).json({ message: 'Cannot pick for games that have already started' });
    }

    // Check if user already has a pick for this game
    const existingPick = await Pick.findOne({
      gameId,
      userId: req.user.userId
    });

    if (existingPick) {
      // Update existing pick
      existingPick.pickedTeam = pickedTeam;
      existingPick.gameDate = gameDateTime;
      existingPick.season = season;
      await existingPick.save();
      res.json(existingPick);
    } else {
      // Create new pick
      const newPick = new Pick({
        userId: req.user.userId,
        gameId,
        pickedTeam,
        gameDate: gameDateTime,
        season
      });
      await newPick.save();
      res.status(201).json(newPick);
    }
  } catch (error) {
    console.error('Create/update pick error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a pick
router.delete('/:pickId', authenticateToken, async (req, res) => {
  try {
    const pick = await Pick.findById(req.params.pickId);
    
    if (!pick) {
      return res.status(404).json({ message: 'Pick not found' });
    }

    // Check if user owns the pick or is admin
    if (pick.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if game has started
    const game = await Game.findOne({ gameId: pick.gameId });
    if (game && game.status !== 'Scheduled') {
      return res.status(400).json({ message: 'Cannot delete pick for games that have started' });
    }

    await Pick.findByIdAndDelete(req.params.pickId);
    res.json({ message: 'Pick deleted successfully' });
  } catch (error) {
    console.error('Delete pick error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user standings
router.get('/standings', authenticateToken, async (req, res) => {
  try {
    const { season } = req.query;
    const filter = {};

    if (season) {
      filter.season = season;
    }

    // Get all picks for the season
    const picks = await Pick.find(filter).populate('userId', 'username');

    // Calculate standings
    const userStats = {};
    
    picks.forEach(pick => {
      const userId = pick.userId._id.toString();
      const username = pick.userId.username;
      
      if (!userStats[userId]) {
        userStats[userId] = {
          userId,
          username,
          correctPicks: 0,
          totalPicks: 0,
          winPercentage: 0
        };
      }

      userStats[userId].totalPicks++;
      
      if (pick.isCorrect === true) {
        userStats[userId].correctPicks++;
      }
    });

    // Calculate win percentages and sort by correct picks
    const standings = Object.values(userStats)
      .map(user => ({
        ...user,
        winPercentage: user.totalPicks > 0 ? (user.correctPicks / user.totalPicks) * 100 : 0
      }))
      .sort((a, b) => {
        // Sort by correct picks first, then by win percentage
        if (b.correctPicks !== a.correctPicks) {
          return b.correctPicks - a.correctPicks;
        }
        return b.winPercentage - a.winPercentage;
      })
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }));

    res.json(standings);
  } catch (error) {
    console.error('Get standings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update pick correctness (admin only - for when games finish)
router.patch('/update-correctness/:gameId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const game = await Game.findOne({ gameId: req.params.gameId });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.status !== 'Final') {
      return res.status(400).json({ message: 'Game is not finished yet' });
    }

    // Determine winner
    let winner = null;
    if (game.homeTeam.score > game.awayTeam.score) {
      winner = 'home';
    } else if (game.awayTeam.score > game.homeTeam.score) {
      winner = 'away';
    }

    if (winner) {
      // Update all picks for this game
      const picks = await Pick.find({ gameId: req.params.gameId });
      
      for (const pick of picks) {
        pick.isCorrect = pick.pickedTeam === winner;
        await pick.save();
      }

      res.json({ message: 'Pick correctness updated successfully', updatedPicks: picks.length });
    } else {
      res.json({ message: 'Game was a tie, no picks marked as correct' });
    }
  } catch (error) {
    console.error('Update pick correctness error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 