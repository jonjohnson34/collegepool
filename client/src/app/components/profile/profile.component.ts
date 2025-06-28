import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  nhlTeams = [
    'Anaheim Ducks',
    'Boston Bruins',
    'Buffalo Sabres',
    'Calgary Flames',
    'Carolina Hurricanes',
    'Chicago Blackhawks',
    'Colorado Avalanche',
    'Columbus Blue Jackets',
    'Dallas Stars',
    'Detroit Red Wings',
    'Edmonton Oilers',
    'Florida Panthers',
    'Los Angeles Kings',
    'Minnesota Wild',
    'Montreal Canadiens',
    'Nashville Predators',
    'New Jersey Devils',
    'New York Islanders',
    'New York Rangers',
    'Ottawa Senators',
    'Philadelphia Flyers',
    'Pittsburgh Penguins',
    'San Jose Sharks',
    'Seattle Kraken',
    'St. Louis Blues',
    'Tampa Bay Lightning',
    'Toronto Maple Leafs',
    'Utah Hockey Club',
    'Vancouver Canucks',
    'Vegas Golden Knights',
    'Washington Capitals',
    'Winnipeg Jets'
  ];

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      favoriteNHLTeam: ['', Validators.required],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.profileForm.patchValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        favoriteNHLTeam: currentUser.favoriteNHLTeam
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      // Here you would typically call an API to update the profile
      // For now, we'll just simulate success
      setTimeout(() => {
        this.loading = false;
        this.success = 'Profile updated successfully!';
      }, 1000);
    }
  }
} 