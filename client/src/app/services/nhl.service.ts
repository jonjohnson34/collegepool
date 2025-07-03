import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NHLGame } from './nhl-types';
import { MOCK_NHL_GAMES } from './mock-nhl-data';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NHLService {
  constructor(private apiService: ApiService) {}

  // Get today's games
  getTodayGames(): Observable<NHLGame[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.getGamesByDate(today);
  }

  // Get games for a simulated date (for testing/demo purposes)
  getSimulatedDateGames(simulatedDate: string): Observable<NHLGame[]> {
    return this.getGamesByDate(simulatedDate);
  }

  // Get games for a specific date
  getGamesByDate(date: string): Observable<NHLGame[]> {
    return this.apiService.getGames(date);
  }

  // Get upcoming games (next 7 days)
  getUpcomingGames(): Observable<NHLGame[]> {
    return this.apiService.getUpcomingGames(10);
  }

  // Get recent games (last 7 days)
  getRecentGames(): Observable<NHLGame[]> {
    return this.apiService.getRecentGames(10);
  }

  // Get game by ID
  getGameById(gameId: string): Observable<NHLGame> {
    return this.apiService.getGameById(gameId);
  }

  // Get team abbreviation mapping for your existing teams
  getTeamAbbreviation(teamName: string): string {
    const teamMap: { [key: string]: string } = {
      'Anaheim Ducks': 'ANA',
      'Boston Bruins': 'BOS',
      'Buffalo Sabres': 'BUF',
      'Calgary Flames': 'CGY',
      'Carolina Hurricanes': 'CAR',
      'Chicago Blackhawks': 'CHI',
      'Colorado Avalanche': 'COL',
      'Columbus Blue Jackets': 'CBJ',
      'Dallas Stars': 'DAL',
      'Detroit Red Wings': 'DET',
      'Edmonton Oilers': 'EDM',
      'Florida Panthers': 'FLA',
      'Los Angeles Kings': 'LA',
      'Minnesota Wild': 'MIN',
      'Montreal Canadians': 'MTL',
      'Nashville Predators': 'NSH',
      'New Jersey Devils': 'NJ',
      'New York Islanders': 'NYI',
      'New York Rangers': 'NYR',
      'Ottawa Senators': 'OTT',
      'Philadelphia Flyers': 'PHI',
      'Pittsburgh Penguins': 'PIT',
      'San Jose Sharks': 'SJ',
      'Seattle Kraken': 'SEA',
      'St. Louis Blues': 'STL',
      'Tampa Bay Lightning': 'TB',
      'Toronto Maple Leafs': 'TOR',
      'Utah Hockey Club': 'UTAH',
      'Vancouver Canucks': 'VAN',
      'Vegas Golden Knights': 'VGK',
      'Washington Capitals': 'WSH',
      'Winnipeg Jets': 'WPG'
    };
    return teamMap[teamName] || teamName;
  }
} 