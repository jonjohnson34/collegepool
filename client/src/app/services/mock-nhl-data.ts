import { NHLGame } from './nhl-types';

// Generate a small set of mock games for a few dates
export const MOCK_NHL_GAMES: NHLGame[] = [
  {
    id: '1',
    date: '2025-01-04T19:00:00Z',
    status: 'Final',
    homeTeam: { name: 'Boston Bruins', abbreviation: 'BOS', score: 4, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/bos.png' },
    awayTeam: { name: 'Toronto Maple Leafs', abbreviation: 'TOR', score: 2, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png' },
    venue: 'TD Garden',
    broadcast: 'ESPN+'
  },
  {
    id: '2',
    date: '2025-01-04T21:30:00Z',
    status: 'Scheduled',
    homeTeam: { name: 'Vancouver Canucks', abbreviation: 'VAN', score: 0, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/van.png' },
    awayTeam: { name: 'Edmonton Oilers', abbreviation: 'EDM', score: 0, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/edm.png' },
    venue: 'Rogers Arena',
    broadcast: 'SN'
  },
  {
    id: '3',
    date: '2024-12-25T20:00:00Z',
    status: 'Final',
    homeTeam: { name: 'New York Rangers', abbreviation: 'NYR', score: 3, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png' },
    awayTeam: { name: 'Winnipeg Jets', abbreviation: 'WPG', score: 1, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/wpg.png' },
    venue: 'Madison Square Garden',
    broadcast: 'TNT'
  },
  {
    id: '4',
    date: '2024-12-25T22:00:00Z',
    status: 'Final',
    homeTeam: { name: 'Dallas Stars', abbreviation: 'DAL', score: 2, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/dal.png' },
    awayTeam: { name: 'Florida Panthers', abbreviation: 'FLA', score: 3, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/fla.png' },
    venue: 'American Airlines Center',
    broadcast: 'NHL Network'
  },
  {
    id: '5',
    date: '2024-11-28T19:00:00Z',
    status: 'Final',
    homeTeam: { name: 'Colorado Avalanche', abbreviation: 'COL', score: 4, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/col.png' },
    awayTeam: { name: 'Carolina Hurricanes', abbreviation: 'CAR', score: 2, logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/car.png' },
    venue: 'Ball Arena',
    broadcast: 'ESPN+'
  }
]; 