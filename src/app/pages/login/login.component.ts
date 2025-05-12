import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.authService.login(this.username, this.password)) {
      this.errorMessage = '❌ Credenciales incorrectas. Intenta de nuevo.';
    } else {
      this.errorMessage = '';
      this.router.navigate(['/']);
    }
  }
}
