import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface AdminUser {
  username: string;
  password: string;
  nombre: string;
}

const ADMINS: AdminUser[] = [
  { username: 'admin1', password: '1234', nombre: 'Carlos Enrique' },
  { username: 'admin2', password: 'abcd', nombre: 'Juan Damián' },
  { username: 'admin3', password: 'pass', nombre: 'Alan Gael' }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'currentAdmin';
  currentAdmin = signal<string | null>(localStorage.getItem(this.key));
  usuarioActual = signal<string | null>(localStorage.getItem('nombreUsuario'));

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const found = ADMINS.find(a => a.username === username && a.password === password);
    if (found) {
      localStorage.setItem(this.key, found.nombre);
      localStorage.setItem('rol', 'admin');
      this.currentAdmin.set(found.nombre);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentAdmin');
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

  setUsuario(nombre: string): void {
    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('rol', 'usuario');
    this.usuarioActual.set(nombre);
  }
}