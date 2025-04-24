import { Injectable, signal } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly key = 'currentAdmin';
  currentAdmin = signal<string | null>(localStorage.getItem(this.key));

  login(username: string, password: string): boolean {
    const found = ADMINS.find(a => a.username === username && a.password === password);
    if (found) {
      localStorage.setItem(this.key, found.nombre);
      this.currentAdmin.set(found.nombre);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.key);
    this.currentAdmin.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentAdmin() !== null;
  }

  getAdminName(): string {
    return this.currentAdmin() ?? '';
  }
}
