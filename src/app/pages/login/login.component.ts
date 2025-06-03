import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import CryptoJS from 'crypto-js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';

declare var grecaptcha: any;

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

  registro = {
    nombre: '',
    correo: '',
    contrasena: '',
    confirmar: ''
  };
  registroError = '';

  modoRegistro = true;
  mostrarFormularioAdmin = false;

  private inputOculto = '';
  private timeout: any;

  constructor(
    private authService: AuthService,
    private firebase: FirebaseService,
    private router: Router
  ) {}

  get icono(): string {
    if (this.modoRegistro) return 'fa-user-plus';
    return this.mostrarFormularioAdmin ? 'fa-user-shield' : 'fa-user';
  }

  get titulo(): string {
    if (this.modoRegistro) return this.mostrarFormularioAdmin ? 'Registro de Administrador' : 'Registro de Usuario';
    return this.mostrarFormularioAdmin ? 'Inicio de Sesión de Administrador' : 'Inicio de Sesión de Usuario';
  }

  login(): void {
    const coleccion = this.mostrarFormularioAdmin ? 'admins' : 'usuarios';
    const passwordHash = CryptoJS.SHA256(this.password).toString();
  
    this.firebase.obtenerDatos(coleccion).subscribe(usuarios => {
      const usuario = usuarios.find(u =>
        u.correo === this.username && u.contrasena === passwordHash
      );
  
      if (usuario) {
        if (this.mostrarFormularioAdmin) {
          this.authService.setAdmin(usuario.nombre);
        } else {
          this.authService.setUsuario(usuario.nombre);
        }
  
        this.errorMessage = '';
        this.router.navigate(['/']);
      } else {
        this.errorMessage = '❌ Credenciales incorrectas.';
      }
    });
  }
  

  registrarUsuario(): void {
    const { nombre, correo, contrasena, confirmar } = this.registro;

    const patron = /^(?=.*[A-Z])(?=.*\d)(?=.*_)[A-Za-z\d_]{8,}$/;
    if (!patron.test(contrasena)) {
      this.registroError = '❌ La contraseña debe tener al menos una mayúscula, un número y el carácter "_".';
      return;
    }

    if (contrasena !== confirmar) {
      this.registroError = '❌ Las contraseñas no coinciden.';
      return;
    }

    const contrasenaHash = CryptoJS.SHA256(contrasena).toString();
    const coleccion = this.mostrarFormularioAdmin ? 'admins' : 'usuarios';

    this.firebase.agregarDato(coleccion, {
      nombre,
      correo,
      contrasena: contrasenaHash
    }).then(() => {
      if (this.mostrarFormularioAdmin) {
        this.authService.setAdmin(nombre);
      } else {
        this.authService.setUsuario(nombre);
      }

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: `${this.mostrarFormularioAdmin ? 'Administrador' : 'Usuario'} registrado correctamente`,
        timer: 2000,
        showConfirmButton: false
      });

      this.registro = { nombre: '', correo: '', contrasena: '', confirmar: '' };
      this.registroError = '';
      this.router.navigate(['/']);
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: '❌ No se pudo registrar'
      });
    });
  }

  iniciarSesionConGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const nombreGoogle = user.displayName || 'Usuario';

        if (this.mostrarFormularioAdmin) {
          this.authService.setAdmin(nombreGoogle);
        } else {
          this.authService.setUsuario(nombreGoogle);
        }
        

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión correcto',
          text: `Bienvenido, ${nombreGoogle}`,
          timer: 2000,
          showConfirmButton: false
        });

        this.router.navigate(['/']);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: '❌ No se pudo iniciar sesión con Google'
        });
      });
  }

  @HostListener('document:keydown', ['$event'])
  detectarComando(event: KeyboardEvent) {
    clearTimeout(this.timeout);
    this.inputOculto += event.key.toLowerCase();
  
    if (this.inputOculto.includes('useradmin')) {
      this.mostrarFormularioAdmin = true;
      this.inputOculto = '';
    }
  
    if (this.inputOculto.includes('useruser')) {
      this.mostrarFormularioAdmin = false;
      this.inputOculto = '';
    }
  
    this.timeout = setTimeout(() => this.inputOculto = '', 1500);
  }
      toggleModoRegistro(): void {
        this.modoRegistro = !this.modoRegistro;
      }
    
}
