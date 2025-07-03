const mongoose = require('mongoose');

const pickSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  pickedTeam: {
    type: String,
    enum: ['home', 'away'],
    required: true
  },
  gameDate: {
    type: Date,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: null
  },
  season: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure one pick per user per game
pickSchema.index({ userId: 1, gameId: 1 }, { unique: true });
pickSchema.index({ userId: 1, season: 1 });
pickSchema.index({ gameId: 1 });
pickSchema.index({ gameDate: 1 });

module.exports = mongoose.model('Pick', pickSchema); 