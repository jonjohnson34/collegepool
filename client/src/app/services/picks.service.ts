import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GamePick, UserStanding } from './nhl-types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PicksService {
  constructor(private apiService: ApiService) {}

  // Get picks for a specific user
  getUserPicks(userId: string): Observable<GamePick[]> {
    return this.apiService.getUserPicks();
  }

  // Get picks for a specific game
  getGamePicks(gameId: string): Observable<GamePick[]> {
    return this.apiService.getGamePicks(gameId);
  }

  // Save a new pick
  savePick(pick: GamePick): Observable<GamePick> {
    return this.apiService.savePick(pick);
  }

  // Update an existing pick
  updatePick(pickId: string, updatedPick: Partial<GamePick>): Observable<GamePick> {
    // For now, we'll use savePick which handles both create and update
    return this.apiService.savePick(updatedPick);
  }

  // Delete a pick
  deletePick(pickId: string): Observable<boolean> {
    return this.apiService.deletePick(pickId);
  }

  // Get user standings
  getUserStandings(): Observable<UserStanding[]> {
    return this.apiService.getUserStandings();
  }

  // Calculate pick correctness based on game results
  calculatePickCorrectness(gameId: string, homeScore: number, awayScore: number): void {
    // This will be handled by the backend when game scores are updated
    console.log('Pick correctness calculation moved to backend');
  }

  // Get pick for a specific user and game
  getUserPickForGame(userId: string, gameId: string): Observable<GamePick | null> {
    return this.apiService.getUserPickForGame(gameId);
  }
} 