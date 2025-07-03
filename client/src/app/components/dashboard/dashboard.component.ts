import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { PicksService } from '../../services/picks.service';
import { NHLService } from '../../services/nhl.service';
import { GamePick, NHLGame, UserStanding } from '../../services/nhl-types';
import { MOCK_NHL_GAMES } from '../../services/mock-nhl-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, HeaderComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userPicks: GamePick[] = [];
  games: { [gameId: string]: NHLGame } = {};
  userStandings: UserStanding[] = [];
  currentUserStanding: UserStanding | null = null;
  loading = false;
  error = '';

  constructor(
    public authService: AuthService,
    private picksService: PicksService,
    private nhlService: NHLService
  ) {}

  ngOnInit() {
    this.loadUserPicks();
    this.loadUserStandings();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  loadUserPicks() {
    this.loading = true;
    this.error = '';

    // Get current user ID from auth service
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser._id) {
      this.error = 'No authenticated user found';
      this.loading = false;
      return;
    }
    
    this.picksService.getUserPicks(currentUser._id).subscribe({
      next: (picks) => {
        this.userPicks = picks.slice(0, 10); // Show last 10 picks
        this.loadGamesForPicks(picks);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load your picks';
        this.loading = false;
        console.error('Error loading user picks:', err);
      }
    });
  }

  loadUserStandings() {
    this.picksService.getUserStandings().subscribe({
      next: (standings) => {
        this.userStandings = standings;
        // Find current user's standing
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser._id) {
          this.currentUserStanding = standings.find(s => s.userId === currentUser._id) || null;
        }
      },
      error: (err) => {
        console.error('Error loading user standings:', err);
      }
    });
  }

  loadGamesForPicks(picks: GamePick[]) {
    // Get unique game IDs from picks
    const gameIds = [...new Set(picks.map(pick => pick.gameId))];
    
    // Load games from API
    gameIds.forEach(gameId => {
      this.nhlService.getGameById(gameId).subscribe({
        next: (game: NHLGame) => {
          this.games[gameId] = game;
        },
        error: (err: any) => {
          console.error(`Error loading game ${gameId}:`, err);
        }
      });
    });
  }

  getGameDisplay(pick: GamePick): string {
    const game = this.games[pick.gameId];
    if (game) {
      return `${game.awayTeam.abbreviation} @ ${game.homeTeam.abbreviation}`;
    }
    return `Game ${pick.gameId}`;
  }

  getPickDisplay(pick: GamePick): string {
    const game = this.games[pick.gameId];
    if (game) {
      return pick.pickedTeam === 'home' ? game.homeTeam.abbreviation : game.awayTeam.abbreviation;
    }
    return pick.pickedTeam === 'home' ? 'Home' : 'Away';
  }

  getPickStatusClass(pick: GamePick): string {
    if (pick.isCorrect === true) return 'text-success';
    if (pick.isCorrect === false) return 'text-danger';
    return 'text-muted';
  }

  getPickStatusIcon(pick: GamePick): string {
    if (pick.isCorrect === true) return 'bi-check-circle-fill';
    if (pick.isCorrect === false) return 'bi-x-circle-fill';
    return 'bi-question-circle';
  }

  formatGameDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getCurrentUserRank(): number {
    return this.currentUserStanding?.rank || 0;
  }

  getCurrentUserWinPercentage(): number {
    return this.currentUserStanding?.winPercentage || 0;
  }
} 