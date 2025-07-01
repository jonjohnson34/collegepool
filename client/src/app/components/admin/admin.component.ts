import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AuthService, User } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    
    this.http.get<User[]>('http://localhost:5000/api/users', { headers: this.getHeaders() })
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load users';
          this.loading = false;
          console.error('Error loading users:', err);
        }
      });
  }

  updateUserRole(userId: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    const newRole = target.value;
    
    this.http.patch(`http://localhost:5000/api/users/${userId}/role`, 
      { role: newRole }, 
      { headers: this.getHeaders() }
    ).subscribe({
      next: () => {
        this.loadUsers(); // Reload users to get updated data
      },
      error: (err) => {
        console.error('Error updating user role:', err);
        alert('Failed to update user role');
      }
    });
  }

  updateUserStatus(userId: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const isActive = target.checked;
    
    this.http.patch(`http://localhost:5000/api/users/${userId}/status`, 
      { isActive }, 
      { headers: this.getHeaders() }
    ).subscribe({
      next: () => {
        this.loadUsers(); // Reload users to get updated data
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        alert('Failed to update user status');
      }
    });
  }
}
