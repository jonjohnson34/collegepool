import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
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
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      favoriteNHLTeam: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      this.authService.register({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        favoriteNHLTeam: this.registerForm.value.favoriteNHLTeam
      }).subscribe({
        next: (response) => {
          this.loading = false;
          this.success = 'Account created successfully! Redirecting to dashboard...';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
} 