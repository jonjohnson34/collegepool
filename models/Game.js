const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Live', 'Final', 'Postponed', 'Cancelled'],
    default: 'Scheduled'
  },
  homeTeam: {
    name: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    logo: String
  },
  awayTeam: {
    name: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    logo: String
  },
  venue: String,
  broadcast: String,
  season: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
gameSchema.index({ date: 1 });
gameSchema.index({ status: 1 });
gameSchema.index({ season: 1 });

module.exports = mongoose.model('Game', gameSchema); 