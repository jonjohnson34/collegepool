import { NHLGame, NHLStanding } from './nhl-types';

export const MOCK_NHL_STANDINGS: NHLStanding[] = [
  { team: { name: 'Boston Bruins', abbreviation: 'BOS', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png' }, wins: 25, losses: 8, overtimeLosses: 3, points: 53, gamesPlayed: 36, goalsFor: 125, goalsAgainst: 89, goalDifferential: 36, winPercentage: 0.736, conference: 'Eastern', division: 'Atlantic' },
  { team: { name: 'New York Rangers', abbreviation: 'NYR', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png' }, wins: 24, losses: 9, overtimeLosses: 2, points: 50, gamesPlayed: 35, goalsFor: 118, goalsAgainst: 92, goalDifferential: 26, winPercentage: 0.714, conference: 'Eastern', division: 'Metropolitan' },
  { team: { name: 'Vancouver Canucks', abbreviation: 'VAN', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/van.png' }, wins: 23, losses: 10, overtimeLosses: 3, points: 49, gamesPlayed: 36, goalsFor: 130, goalsAgainst: 95, goalDifferential: 35, winPercentage: 0.681, conference: 'Western', division: 'Pacific' },
  { team: { name: 'Winnipeg Jets', abbreviation: 'WPG', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/wpg.png' }, wins: 22, losses: 9, overtimeLosses: 4, points: 48, gamesPlayed: 35, goalsFor: 115, goalsAgainst: 88, goalDifferential: 27, winPercentage: 0.686, conference: 'Western', division: 'Central' },
  { team: { name: 'Florida Panthers', abbreviation: 'FLA', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png' }, wins: 22, losses: 12, overtimeLosses: 2, points: 46, gamesPlayed: 36, goalsFor: 120, goalsAgainst: 98, goalDifferential: 22, winPercentage: 0.639, conference: 'Eastern', division: 'Atlantic' },
  { team: { name: 'Colorado Avalanche', abbreviation: 'COL', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/col.png' }, wins: 21, losses: 11, overtimeLosses: 3, points: 45, gamesPlayed: 35, goalsFor: 125, goalsAgainst: 102, goalDifferential: 23, winPercentage: 0.643, conference: 'Western', division: 'Central' },
  { team: { name: 'Dallas Stars', abbreviation: 'DAL', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/dal.png' }, wins: 20, losses: 12, overtimeLosses: 4, points: 44, gamesPlayed: 36, goalsFor: 118, goalsAgainst: 105, goalDifferential: 13, winPercentage: 0.611, conference: 'Western', division: 'Central' },
  { team: { name: 'Toronto Maple Leafs', abbreviation: 'TOR', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png' }, wins: 19, losses: 12, overtimeLosses: 4, points: 42, gamesPlayed: 35, goalsFor: 125, goalsAgainst: 108, goalDifferential: 17, winPercentage: 0.600, conference: 'Eastern', division: 'Atlantic' },
  { team: { name: 'Carolina Hurricanes', abbreviation: 'CAR', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/car.png' }, wins: 19, losses: 13, overtimeLosses: 3, points: 41, gamesPlayed: 35, goalsFor: 115, goalsAgainst: 102, goalDifferential: 13, winPercentage: 0.586, conference: 'Eastern', division: 'Metropolitan' },
  { team: { name: 'Vegas Golden Knights', abbreviation: 'VGK', logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/vgk.png' }, wins: 18, losses: 14, overtimeLosses: 3, points: 39, gamesPlayed: 35, goalsFor: 110, goalsAgainst: 105, goalDifferential: 5, winPercentage: 0.557, conference: 'Western', division: 'Pacific' }
];

// Generate a small set of mock games for a few dates
export const MOCK_NHL_GAMES: NHLGame[] = [
  {
    id: '1',
    date: '2025-07-04T19:00:00Z',
    status: 'Final',
    homeTeam: { name: 'Boston Bruins', abbreviation: 'BOS', score: 4, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png' },
    awayTeam: { name: 'Toronto Maple Leafs', abbreviation: 'TOR', score: 2, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png' },
    venue: 'TD Garden',
    broadcast: 'ESPN+'
  },
  {
    id: '2',
    date: '2025-07-04T21:30:00Z',
    status: 'Scheduled',
    homeTeam: { name: 'Vancouver Canucks', abbreviation: 'VAN', score: 0, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/van.png' },
    awayTeam: { name: 'Edmonton Oilers', abbreviation: 'EDM', score: 0, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png' },
    venue: 'Rogers Arena',
    broadcast: 'SN'
  },
  {
    id: '3',
    date: '2025-06-25T20:00:00Z',
    status: 'Final',
    homeTeam: { name: 'New York Rangers', abbreviation: 'NYR', score: 3, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png' },
    awayTeam: { name: 'Winnipeg Jets', abbreviation: 'WPG', score: 1, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/wpg.png' },
    venue: 'Madison Square Garden',
    broadcast: 'TNT'
  },
  {
    id: '4',
    date: '2025-06-25T22:00:00Z',
    status: 'Scheduled',
    homeTeam: { name: 'Dallas Stars', abbreviation: 'DAL', score: 0, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/dal.png' },
    awayTeam: { name: 'Florida Panthers', abbreviation: 'FLA', score: 0, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png' },
    venue: 'American Airlines Center',
    broadcast: 'NHL Network'
  }
]; 