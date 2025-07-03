import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NHLGame, GamePick, UserStanding } from './nhl-types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Games API calls
  getGames(date?: string, status?: string, season?: string, limit?: number): Observable<NHLGame[]> {
    let params: any = {};
    if (date) params.date = date;
    if (status) params.status = status;
    if (season) params.season = season;
    if (limit) params.limit = limit.toString();

    return this.http.get<NHLGame[]>(`${this.baseUrl}/games`, {
      headers: this.getHeaders(),
      params
    });
  }

  getGamesByDateRange(startDate: string, endDate: string, season?: string): Observable<NHLGame[]> {
    let params: any = { startDate, endDate };
    if (season) params.season = season;

    return this.http.get<NHLGame[]>(`${this.baseUrl}/games/date-range`, {
      headers: this.getHeaders(),
      params
    });
  }

  getUpcomingGames(limit: number = 10): Observable<NHLGame[]> {
    return this.http.get<NHLGame[]>(`${this.baseUrl}/games/upcoming`, {
      headers: this.getHeaders(),
      params: { limit: limit.toString() }
    });
  }

  getRecentGames(limit: number = 10): Observable<NHLGame[]> {
    return this.http.get<NHLGame[]>(`${this.baseUrl}/games/recent`, {
      headers: this.getHeaders(),
      params: { limit: limit.toString() }
    });
  }

  getGameById(gameId: string): Observable<NHLGame> {
    return this.http.get<NHLGame>(`${this.baseUrl}/games/${gameId}`, {
      headers: this.getHeaders()
    });
  }

  // Picks API calls
  getUserPicks(season?: string): Observable<GamePick[]> {
    let params: any = {};
    if (season) params.season = season;

    return this.http.get<GamePick[]>(`${this.baseUrl}/picks/my-picks`, {
      headers: this.getHeaders(),
      params
    });
  }

  getGamePicks(gameId: string): Observable<GamePick[]> {
    return this.http.get<GamePick[]>(`${this.baseUrl}/picks/game/${gameId}`, {
      headers: this.getHeaders()
    });
  }

  getUserPickForGame(gameId: string): Observable<GamePick | null> {
    return this.http.get<GamePick | null>(`${this.baseUrl}/picks/game/${gameId}/my-pick`, {
      headers: this.getHeaders()
    });
  }

  savePick(pick: Partial<GamePick>): Observable<GamePick> {
    return this.http.post<GamePick>(`${this.baseUrl}/picks`, pick, {
      headers: this.getHeaders()
    });
  }

  deletePick(pickId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/picks/${pickId}`, {
      headers: this.getHeaders()
    });
  }

  getUserStandings(season?: string): Observable<UserStanding[]> {
    let params: any = {};
    if (season) params.season = season;

    return this.http.get<UserStanding[]>(`${this.baseUrl}/picks/standings`, {
      headers: this.getHeaders(),
      params
    });
  }

  // Admin API calls
  createOrUpdateGame(gameData: any): Observable<NHLGame> {
    return this.http.post<NHLGame>(`${this.baseUrl}/games`, gameData, {
      headers: this.getHeaders()
    });
  }

  updateGameScores(gameId: string, homeScore: number, awayScore: number, status?: string): Observable<NHLGame> {
    const updateData: any = { homeScore, awayScore };
    if (status) updateData.status = status;

    return this.http.patch<NHLGame>(`${this.baseUrl}/games/${gameId}/scores`, updateData, {
      headers: this.getHeaders()
    });
  }

  updatePickCorrectness(gameId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/picks/update-correctness/${gameId}`, {}, {
      headers: this.getHeaders()
    });
  }
} 