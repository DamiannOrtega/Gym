import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

// Interfaz que define la estructura de un usuario administrador
interface AdminUser {
  username: string; // Nombre de usuario
  password: string; // Contraseña
  nombre: string;   // Nombre completo del administrador
}

// Lista de usuarios administradores predefinidos
const ADMINS: AdminUser[] = [
  { username: 'admin1', password: '1234', nombre: 'Carlos Enrique' },
  { username: 'admin2', password: 'abcd', nombre: 'Juan Damián' },
  { username: 'admin3', password: 'pass', nombre: 'Alan Gael' }
];

// Decorador que marca esta clase como un servicio inyectable en Angular
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class AuthService {
  private readonly key = 'currentAdmin'; // Clave usada para almacenar el nombre del admin en localStorage
  currentAdmin = signal<string | null>(localStorage.getItem(this.key)); // Signal que almacena el estado del admin actual

  constructor(private router: Router) {} // Inyecta el servicio Router para manejar la navegación

  // Método para iniciar sesión
  login(username: string, password: string): boolean {
    // Busca un usuario en la lista de administradores que coincida con el username y password
    const found = ADMINS.find(a => a.username === username && a.password === password);
    if (found) {
      // Si se encuentra, guarda el nombre del admin en localStorage y actualiza el signal
      localStorage.setItem(this.key, found.nombre);
      this.currentAdmin.set(found.nombre);
      return true; // Retorna true indicando que el login fue exitoso
    }
    return false; // Retorna false si las credenciales no coinciden
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.key); // Elimina el nombre del admin de localStorage
    this.currentAdmin.set(null); // Resetea el signal a null
    this.router.navigate(['/']); // Redirige al usuario a la página de inicio
  }

  // Método para verificar si hay un usuario logueado
  isLoggedIn(): boolean {
    return this.currentAdmin() !== null; // Retorna true si hay un admin en el signal, false si no
  }

  // Método para obtener el nombre del administrador actual
  getAdminName(): string {
    return this.currentAdmin() ?? ''; // Retorna el nombre del admin o una cadena vacía si no hay ninguno
  }
}