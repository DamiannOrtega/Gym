import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentAdmin = signal<string | null>(localStorage.getItem('nombreAdmin'));
  usuarioActual = signal<string | null>(localStorage.getItem('nombreUsuario'));

  constructor(private router: Router) {}

  setAdmin(nombre: string): void {
    localStorage.setItem('nombreAdmin', nombre);
    localStorage.setItem('rol', 'admin');
    this.currentAdmin.set(nombre);
  }

  setUsuario(nombre: string): void {
    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('rol', 'usuario');
    this.usuarioActual.set(nombre);
  }

  logout(): void {
    localStorage.removeItem('nombreAdmin');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rol');
    this.currentAdmin.set(null);
    this.usuarioActual.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.currentAdmin() !== null || this.usuarioActual() !== null;
  }

  getNombreMostrado(): string {
    return this.currentAdmin() ?? this.usuarioActual() ?? '';
  }

  getRol(): string {
    return localStorage.getItem('rol') || '';
  }
}
