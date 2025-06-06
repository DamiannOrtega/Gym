import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentAdmin = signal<string | null>(null);
  nombreUsuario = signal<string>('');
  usuarioActual = signal<string | null>(null);

  constructor(private router: Router, private firebase: FirebaseService) {}

  async setUsuario(usuarioId: string): Promise<void> {
    localStorage.setItem('rol', 'usuario');
    localStorage.setItem('idUsuario', usuarioId);
    this.usuarioActual.set(usuarioId);
    const nombre = await this.getNombreDesdeFirestore();
    this.nombreUsuario.set(nombre);
  }
  
  async setAdmin(usuarioId: string): Promise<void> {
    localStorage.setItem('rol', 'admin');
    localStorage.setItem('idUsuario', usuarioId);
    this.currentAdmin.set(usuarioId);
    const nombre = await this.getNombreDesdeFirestore();
    this.nombreUsuario.set(nombre);
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

  // 🔎 Carga el nombre desde Firebase según el usuario actual (usuarioId guardado en localStorage)
  async getNombreDesdeFirestore(): Promise<string> {
    const id = localStorage.getItem('idUsuario');
    const rol = localStorage.getItem('rol');
    if (!id || !rol) return '';

    const coleccion = rol === 'admin' ? 'admins' : 'usuarios';
    const usuarios = await firstValueFrom(this.firebase.getPorCampo(coleccion, 'usuario', id));
    return usuarios[0]?.nombre ?? '';

  }
}