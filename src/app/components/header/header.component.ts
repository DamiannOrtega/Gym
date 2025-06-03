import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  nombre = '';
  esAdmin = false;
  logo = 'assets/img/Logo2.png';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.nombre = this.authService.getNombreMostrado();
    this.esAdmin = this.authService.getRol() === 'admin';
  }

  logout() {
    this.authService.logout();
  }
}