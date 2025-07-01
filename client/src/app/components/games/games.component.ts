import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NHLService } from '../../services/nhl.service';
import { NHLGame, GamePick } from '../../services/nhl-types';
import { PicksService } from '../../services/picks.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, DatePipe],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  upcomingGames: NHLGame[] = [];
  recentGames: NHLGame[] = [];
  todayGames: NHLGame[] = [];
  loading = false;
  error = '';
  simulatedDate: string = '';
  isSimulating = false;
  userPicks: { [gameId: string]: GamePick } = {};
  currentUserId = '1'; // Mock user ID - in real app this would come from auth service

  constructor(
    private nhlService: NHLService,
    private picksService: PicksService
  ) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.loading = true;
    this.error = '';

    // Load today's games
    this.nhlService.getTodayGames().subscribe({
      next: (games) => {
        this.todayGames = games;
        this.loadUserPicks(games);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load today\'s games';
        this.loading = false;
        console.error('Error loading today\'s games:', err);
      }
    });

    // Load upcoming games
    this.nhlService.getUpcomingGames().subscribe({
      next: (games) => {
        this.upcomingGames = games.slice(0, 10); // Show next 10 games
        this.loadUserPicks(games);
      },
      error: (err) => {
        console.error('Error loading upcoming games:', err);
      }
    });

    // Load recent games
    this.nhlService.getRecentGames().subscribe({
      next: (games) => {
        this.recentGames = games.slice(0, 10); // Show last 10 games
        this.loadUserPicks(games);
      },
      error: (err) => {
        console.error('Error loading recent games:', err);
      }
    });
  }

  // Load user picks for games
  private loadUserPicks(games: NHLGame[]) {
    games.forEach(game => {
      this.picksService.getUserPickForGame(this.currentUserId, game.id).subscribe({
        next: (pick) => {
          if (pick) {
            this.userPicks[game.id] = pick;
          }
        }
      });
    });
  }

  // Make a pick for a game
  makePick(gameId: string, pickedTeam: 'home' | 'away') {
    const game = [...this.todayGames, ...this.upcomingGames, ...this.recentGames]
      .find(g => g.id === gameId);
    
    if (!game) return;

    const pick: GamePick = {
      userId: this.currentUserId,
      gameId: gameId,
      pickedTeam: pickedTeam,
      gameDate: game.date
    };

    this.picksService.savePick(pick).subscribe({
      next: (savedPick) => {
        this.userPicks[gameId] = savedPick;
        console.log('Pick saved successfully:', savedPick);
      },
      error: (err) => {
        console.error('Error saving pick:', err);
      }
    });
  }

  // Get user's pick for a specific game
  getUserPick(gameId: string): GamePick | null {
    return this.userPicks[gameId] || null;
  }

  // Check if user has picked a game
  hasUserPicked(gameId: string): boolean {
    return !!this.userPicks[gameId];
  }

  // Get pick status for display
  getPickStatus(game: NHLGame): string {
    const pick = this.userPicks[game.id];
    if (!pick) return '';

    if (game.status === 'Final') {
      if (pick.isCorrect === true) return 'correct';
      if (pick.isCorrect === false) return 'incorrect';
      return 'pending';
    }
    
    return 'picked';
  }

  // Simulate a specific date
  simulateDate(date: string) {
    this.isSimulating = true;
    this.simulatedDate = date;
    this.loading = true;
    this.error = '';

    // Load games for the simulated date
    this.nhlService.getSimulatedDateGames(date).subscribe({
      next: (games) => {
        this.todayGames = games;
        this.loadUserPicks(games);
        this.loading = false;
      },
      error: (err) => {
        this.error = `Failed to load games for ${date}`;
        this.loading = false;
        console.error('Error loading simulated date games:', err);
      }
    });

    // Load upcoming games from the simulated date
    this.loadSimulatedUpcomingGames(date);
    this.loadSimulatedRecentGames(date);
  }

  // Load upcoming games from a simulated date
  private loadSimulatedUpcomingGames(simulatedDate: string) {
    const baseDate = new Date(simulatedDate);
    const promises = Array.from({length: 7}, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      return this.nhlService.getGamesByDate(dateStr).toPromise();
    });

    Promise.all(promises).then(results => {
      const allGames = results.flat().filter((game): game is NHLGame => game !== undefined);
      this.upcomingGames = allGames.slice(0, 10);
      this.loadUserPicks(allGames);
    }).catch(error => {
      console.error('Error loading simulated upcoming games:', error);
    });
  }

  // Load recent games from a simulated date
  private loadSimulatedRecentGames(simulatedDate: string) {
    const baseDate = new Date(simulatedDate);
    const promises = Array.from({length: 7}, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      return this.nhlService.getGamesByDate(dateStr).toPromise();
    });

    Promise.all(promises).then(results => {
      const allGames = results.flat().filter((game): game is NHLGame => game !== undefined);
      this.recentGames = allGames.slice(0, 10);
      this.loadUserPicks(allGames);
    }).catch(error => {
      console.error('Error loading simulated recent games:', error);
    });
  }

  // Set a preset date in the input
  setPresetDate(date: string) {
    this.simulatedDate = date;
    this.simulateDate(date);
  }

  // Reset to current date
  resetToCurrentDate() {
    this.isSimulating = false;
    this.simulatedDate = '';
    this.loadGames();
  }

  getGameStatusClass(status: string): string {
    if (status.includes('Final')) return 'text-success';
    if (status.includes('Live')) return 'text-danger';
    if (status.includes('Scheduled')) return 'text-primary';
    return 'text-muted';
  }

  formatGameTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  }

  formatGameDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}