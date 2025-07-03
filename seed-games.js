const mongoose = require('mongoose');
const Game = require('./models/Game');
require('dotenv').config();

// Sample NHL games data
const sampleGames = [
  {
    gameId: '1',
    date: new Date('2025-07-10T19:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Boston Bruins',
      abbreviation: 'BOS',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png'
    },
    awayTeam: {
      name: 'Toronto Maple Leafs',
      abbreviation: 'TOR',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png'
    },
    venue: 'TD Garden',
    broadcast: 'ESPN+',
    season: '2024-25'
  },
  {
    gameId: '2',
    date: new Date('2025-07-10T21:30:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Vancouver Canucks',
      abbreviation: 'VAN',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/van.png'
    },
    awayTeam: {
      name: 'Edmonton Oilers',
      abbreviation: 'EDM',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png'
    },
    venue: 'Rogers Arena',
    broadcast: 'SN',
    season: '2024-25'
  },
  {
    gameId: '3',
    date: new Date('2025-07-11T20:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'New York Rangers',
      abbreviation: 'NYR',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png'
    },
    awayTeam: {
      name: 'Winnipeg Jets',
      abbreviation: 'WPG',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/wpg.png'
    },
    venue: 'Madison Square Garden',
    broadcast: 'TNT',
    season: '2024-25'
  },
  {
    gameId: '4',
    date: new Date('2025-07-11T22:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Dallas Stars',
      abbreviation: 'DAL',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/dal.png'
    },
    awayTeam: {
      name: 'Florida Panthers',
      abbreviation: 'FLA',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png'
    },
    venue: 'American Airlines Center',
    broadcast: 'NHL Network',
    season: '2024-25'
  },
  {
    gameId: '5',
    date: new Date('2025-07-12T19:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Colorado Avalanche',
      abbreviation: 'COL',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/col.png'
    },
    awayTeam: {
      name: 'Carolina Hurricanes',
      abbreviation: 'CAR',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/car.png'
    },
    venue: 'Ball Arena',
    broadcast: 'ESPN+',
    season: '2024-25'
  },
  {
    gameId: '6',
    date: new Date('2025-07-13T19:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Montreal Canadiens',
      abbreviation: 'MTL',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png'
    },
    awayTeam: {
      name: 'Ottawa Senators',
      abbreviation: 'OTT',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/ott.png'
    },
    venue: 'Bell Centre',
    broadcast: 'SN',
    season: '2024-25'
  },
  {
    gameId: '7',
    date: new Date('2025-07-13T20:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Chicago Blackhawks',
      abbreviation: 'CHI',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/chi.png'
    },
    awayTeam: {
      name: 'Detroit Red Wings',
      abbreviation: 'DET',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/det.png'
    },
    venue: 'United Center',
    broadcast: 'NHL Network',
    season: '2024-25'
  },
  {
    gameId: '8',
    date: new Date('2025-07-14T19:00:00Z'),
    status: 'Scheduled',
    homeTeam: {
      name: 'Tampa Bay Lightning',
      abbreviation: 'TB',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tb.png'
    },
    awayTeam: {
      name: 'Florida Panthers',
      abbreviation: 'FLA',
      score: 0,
      logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png'
    },
    venue: 'Amalie Arena',
    broadcast: 'ESPN+',
    season: '2024-25'
  }
];

async function seedGames() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collegepool', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing games
    await Game.deleteMany({});
    console.log('Cleared existing games');

    // Insert sample games
    const insertedGames = await Game.insertMany(sampleGames);
    console.log(`Inserted ${insertedGames.length} games`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedGames(); 