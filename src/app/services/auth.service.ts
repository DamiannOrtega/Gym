import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentAdmin = signal<string | null>(null);
  nombreUsuario = signal<string>('');
  usuarioActual = signal<string | null>(null);

  constructor(private router: Router, private firebase: FirebaseService) {
    const idUsuario = localStorage.getItem('idUsuario');
    const rol = localStorage.getItem('rol');
  
    if (idUsuario && rol) {
      this.nombreUsuario.set(idUsuario);
      if (rol === 'admin') {
        this.currentAdmin.set(idUsuario);
      } else {
        this.usuarioActual.set(idUsuario);
      }
    }
  }
  

  async setUsuario(usuarioId: string): Promise<void> {
    localStorage.setItem('rol', 'usuario');
    localStorage.setItem('idUsuario', usuarioId);
    this.usuarioActual.set(usuarioId);
    this.nombreUsuario.set(usuarioId);
  }
  
  async setAdmin(usuarioId: string): Promise<void> {
    localStorage.setItem('rol', 'admin');
    localStorage.setItem('idUsuario', usuarioId);
    this.currentAdmin.set(usuarioId);
    this.nombreUsuario.set(usuarioId);
  }
  

  logout(): void {
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
    this.currentAdmin.set(null);
    this.usuarioActual.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.getRol() === 'admin' || this.getRol() === 'usuario';
  }

  getRol(): string {
    return localStorage.getItem('rol') || '';
  }

  

}