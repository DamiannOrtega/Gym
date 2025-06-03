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

  mostrarFormularioAdmin = false;

  private inputOculto = '';
  private timeout: any;

  constructor(
    private authService: AuthService,
    private firebase: FirebaseService,
    private router: Router
  ) {}

  login(): void {
    // const token = grecaptcha.getResponse();

    // if (!token) {
    //   this.errorMessage = '❌ Completa el reCAPTCHA para continuar.';
    //   return;
    // }

    if (!this.authService.login(this.username, this.password)) {
      this.errorMessage = '❌ Credenciales incorrectas. Intenta de nuevo.';
      // grecaptcha.reset();
    } else {
      localStorage.setItem('nombreUsuario', this.username);
      localStorage.setItem('rol', 'admin');
      this.errorMessage = '';
      this.router.navigate(['/']);
    }
  }

  registrarUsuario(): void {
    const { nombre, correo, contrasena, confirmar } = this.registro;

    const patron = /^(?=.*[A-Z])(?=.*\d)(?=.*_)[A-Za-z\d_]{8,}$/;
    if (!patron.test(contrasena)) {
      this.registroError = '❌ La contraseña debe tener al menos una mayúscula, un número y el carácter "_". Mínimo 8 caracteres.';
      return;
    }

    if (contrasena !== confirmar) {
      this.registroError = '❌ Las contraseñas no coinciden.';
      return;
    }

    const contrasenaHash = CryptoJS.SHA256(contrasena).toString();

    this.firebase.agregarDato('usuarios', {
      nombre,
      correo,
      contrasena: contrasenaHash
    }).then(() => {
      this.authService.setUsuario(nombre);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: `Usuario registrado correctamente`,
        timer: 2000,
        showConfirmButton: false
      });
      this.registro = { nombre: '', correo: '', contrasena: '', confirmar: '' };
      this.registroError = '';
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: '❌ No se pudo registrar el usuario'
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

  iniciarSesionConGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const nombreGoogle = user.displayName || 'Usuario';

        this.authService.setUsuario(nombreGoogle);

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
}
