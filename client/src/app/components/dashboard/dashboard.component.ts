import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(public authService: AuthService) {}

  get currentUser() {
    return this.authService.currentUserValue;
  }
} 