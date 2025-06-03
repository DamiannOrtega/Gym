import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule,MatIconModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  nombre = '';
  esAdmin = false;
  
  logo = 'assets/img/Logo2.png';
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.nombre = localStorage.getItem('nombreUsuario') || '';
    this.esAdmin = localStorage.getItem('rol') === 'admin';
  }

  logout() {
    this.authService.logout();
  }
}
