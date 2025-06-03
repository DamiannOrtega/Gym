import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  logo = 'assets/img/Logo2.png';

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  get estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  get esAdmin(): boolean {
    return this.authService.getRol() === 'admin';
  }

  get nombreUsuario(): string {
    return this.authService.getNombreMostrado();
  }
}
