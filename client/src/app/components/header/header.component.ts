import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
} 