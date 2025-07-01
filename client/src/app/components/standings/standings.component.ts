import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NHLService } from '../../services/nhl.service';
import { NHLStanding, UserStanding } from '../../services/nhl-types';
import { PicksService } from '../../services/picks.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss'
})
export class StandingsComponent implements OnInit {
  standings: NHLStanding[] = [];
  userStandings: UserStanding[] = [];
  loading = false;
  error = '';

  constructor(
    private nhlService: NHLService,
    private picksService: PicksService
  ) {}

  ngOnInit() {
    this.loadStandings();
    this.loadUserStandings();
  }

  loadStandings() {
    this.loading = true;
    this.error = '';

    this.nhlService.getStandings().subscribe({
      next: (standings) => {
        this.standings = standings;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load standings';
        this.loading = false;
        console.error('Error loading standings:', err);
      }
    });
  }

  loadUserStandings() {
    this.picksService.getUserStandings().subscribe({
      next: (userStandings) => {
        this.userStandings = userStandings;
      },
      error: (err) => {
        console.error('Error loading user standings:', err);
      }
    });
  }
}
