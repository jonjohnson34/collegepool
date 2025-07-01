import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GamePick, UserStanding } from './nhl-types';

@Injectable({
  providedIn: 'root'
})
export class PicksService {
  private mockPicks: GamePick[] = [];
  private mockUserStandings: UserStanding[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock user standings
    this.mockUserStandings = [
      { userId: '1', username: 'JohnDoe', correctPicks: 45, totalPicks: 60, winPercentage: 75.0, rank: 1 },
      { userId: '2', username: 'JaneSmith', correctPicks: 42, totalPicks: 58, winPercentage: 72.4, rank: 2 },
      { userId: '3', username: 'MikeJohnson', correctPicks: 40, totalPicks: 62, winPercentage: 64.5, rank: 3 },
      { userId: '4', username: 'SarahWilson', correctPicks: 38, totalPicks: 55, winPercentage: 69.1, rank: 4 },
      { userId: '5', username: 'TomBrown', correctPicks: 35, totalPicks: 59, winPercentage: 59.3, rank: 5 }
    ];

    // Mock picks data
    this.mockPicks = [
      {
        id: '1',
        userId: '1',
        gameId: '1',
        pickedTeam: 'home',
        gameDate: '2025-01-04T19:00:00Z',
        createdAt: new Date('2025-01-03T10:00:00Z'),
        isCorrect: true
      },
      {
        id: '2',
        userId: '1',
        gameId: '2',
        pickedTeam: 'away',
        gameDate: '2025-01-04T21:30:00Z',
        createdAt: new Date('2025-01-03T11:00:00Z'),
        isCorrect: undefined
      },
      {
        id: '3',
        userId: '1',
        gameId: '3',
        pickedTeam: 'home',
        gameDate: '2024-12-25T20:00:00Z',
        createdAt: new Date('2024-12-24T15:00:00Z'),
        isCorrect: true
      },
      {
        id: '4',
        userId: '1',
        gameId: '4',
        pickedTeam: 'away',
        gameDate: '2024-12-25T22:00:00Z',
        createdAt: new Date('2024-12-24T16:00:00Z'),
        isCorrect: false
      },
      {
        id: '5',
        userId: '1',
        gameId: '5',
        pickedTeam: 'home',
        gameDate: '2024-11-28T19:00:00Z',
        createdAt: new Date('2024-11-27T12:00:00Z'),
        isCorrect: true
      }
    ];
  }

  // Get picks for a specific user
  getUserPicks(userId: string): Observable<GamePick[]> {
    const userPicks = this.mockPicks.filter(pick => pick.userId === userId);
    return of(userPicks);
  }

  // Get picks for a specific game
  getGamePicks(gameId: string): Observable<GamePick[]> {
    const gamePicks = this.mockPicks.filter(pick => pick.gameId === gameId);
    return of(gamePicks);
  }

  // Save a new pick
  savePick(pick: GamePick): Observable<GamePick> {
    const newPick = {
      ...pick,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.mockPicks.push(newPick);
    return of(newPick);
  }

  // Update an existing pick
  updatePick(pickId: string, updatedPick: Partial<GamePick>): Observable<GamePick> {
    const index = this.mockPicks.findIndex(pick => pick.id === pickId);
    if (index !== -1) {
      this.mockPicks[index] = { ...this.mockPicks[index], ...updatedPick };
      return of(this.mockPicks[index]);
    }
    throw new Error('Pick not found');
  }

  // Delete a pick
  deletePick(pickId: string): Observable<boolean> {
    const index = this.mockPicks.findIndex(pick => pick.id === pickId);
    if (index !== -1) {
      this.mockPicks.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Get user standings
  getUserStandings(): Observable<UserStanding[]> {
    return of(this.mockUserStandings);
  }

  // Calculate pick correctness based on game results
  calculatePickCorrectness(gameId: string, homeScore: number, awayScore: number): void {
    const gamePicks = this.mockPicks.filter(pick => pick.gameId === gameId);
    const winner = homeScore > awayScore ? 'home' : awayScore > homeScore ? 'away' : 'tie';
    
    gamePicks.forEach(pick => {
      if (winner !== 'tie') {
        pick.isCorrect = pick.pickedTeam === winner;
      }
    });
  }

  // Get pick for a specific user and game
  getUserPickForGame(userId: string, gameId: string): Observable<GamePick | null> {
    const pick = this.mockPicks.find(p => p.userId === userId && p.gameId === gameId);
    return of(pick || null);
  }
} 