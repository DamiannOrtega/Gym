import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import CryptoJS from 'crypto-js';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, UserCredential } from 'firebase/auth';
import Swal from 'sweetalert2';
import { RecaptchaModule } from 'ng-recaptcha'; // Import RecaptchaModule
declare var grecaptcha: any;

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RecaptchaModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  confirmationResult: any;
  password = '';
  errorMessage = '';
  captchaResponse: string = '';  // Almacena la respuesta del reCaptcha
  captchaCompleted = false;      // Bandera para saber si el reCaptcha ha sido completado
  contrasenaValida: boolean = true;
  contrasenaCoinciden: boolean = true;
  modoTelefono: boolean = false; 
  telefono: string = ''; 
  registro = {
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: '',
    confirmar: '',
    
  };

  
  registrotel = {
    nombre: '',
    usuario: '',
    codigo: '',
    telefono:''
  };


  registroError = '';

  modoRegistro = true;
  mostrarFormularioAdmin = false;

  private inputOculto = '';
  private timeout: any;
  telefonoValido!: boolean;

  constructor(
    private authService: AuthService,
    private firebase: FirebaseService,
    private router: Router
  ) { }

  get icono(): string {
    if (this.modoRegistro) return 'fa-user-plus';
    return this.mostrarFormularioAdmin ? 'fa-user-shield' : 'fa-user';
  }

  get titulo(): string {
    if (this.modoRegistro) return this.mostrarFormularioAdmin ? 'Registro de Administrador' : 'Registro de Usuario';
    return this.mostrarFormularioAdmin ? 'Inicio de Sesión de Administrador' : 'Inicio de Sesión de Usuario';
  }

  resolved(captchaResponse: string | null): void {
    this.captchaResponse = captchaResponse ?? '';  // Si es null, lo asignamos como cadena vacía
    this.captchaCompleted = true;
  }



  registrarUsuario(): void {
    const { nombre, usuario, correo, contrasena, confirmar } = this.registro;

    this.validarContrasenas();

    if (!this.contrasenaValida) {
      this.registroError = '❌ La contraseña debe tener entre 8 y 12 caracteres, al menos una mayúscula, un número y solo letras, números y el carácter "_".';
      return;
    }

    if (!this.contrasenaCoinciden) {
      this.registroError = '❌ Las contraseñas no coinciden.';
      return;
    }

    // Verifica si el reCaptcha ha sido completado
    if (!this.captchaCompleted) {
      this.registroError = '❌ Debes completar el reCaptcha.';
      return;
    }

    const coleccion = this.mostrarFormularioAdmin ? 'admins' : 'usuarios';

    // Primero obtenemos los datos para validar que el usuario sea único
    this.firebase.obtenerDatos(coleccion).subscribe(usuarios => {
      const existeUsuario = usuarios.some(u => u.usuario === usuario);
      if (existeUsuario) {
        this.registroError = '❌ El nombre de usuario ya está en uso. Elige otro.';
        return;
      }

      // Si es único, proceder a agregar
      const contrasenaHash = CryptoJS.SHA256(contrasena).toString();
      this.firebase.agregarDato(coleccion, {
        nombre,
        usuario,
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
          text: `${this.mostrarFormularioAdmin ? 'Administrador' : 'Usuario'} registrado correctamente `,
          timer: 2000,
          showConfirmButton: false
        });

        this.registro = { nombre: '', usuario: '', correo: '', contrasena: '', confirmar: '' };
        this.registroError = '';
        this.router.navigate(['/']);
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: '❌ No se pudo registrar'
        });
      });
    });
  }

    // Método para validar contraseña
    validarContrasenas() {
      const patron = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{8,12}$/;
      this.contrasenaValida = patron.test(this.registro.contrasena);
      this.contrasenaCoinciden = this.registro.contrasena === this.registro.confirmar;
    }


  login(): void {
    const coleccion = this.mostrarFormularioAdmin ? 'admins' : 'usuarios';
    const passwordHash = CryptoJS.SHA256(this.password).toString();

    if (!this.captchaCompleted) {
      this.errorMessage = '❌ Debes completar el reCaptcha.';
      return;
    }

    this.firebase.obtenerDatos(coleccion).subscribe(usuarios => {
      const usuario = usuarios.find(u =>
        u.usuario === this.username && u.contrasena === passwordHash
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
          text: `Bienvenido, ${nombreGoogle} `,
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

  toggleModoTelefono() {
    this.modoTelefono = !this.modoTelefono;
    this.modoRegistro = false; 
  }

  // Función para manejar el inicio de sesión con teléfono
// Esta función es para enviar el código de verificación
// Enviar el código de verificación
enviarCodigo() {
  const auth = getAuth();
  this.validarTelefono();
  if (!this.telefonoValido) {
    this.registroError = '❌ Número de teléfono inválido';
    return;
  }

  signInWithPhoneNumber(auth, this.registrotel.telefono)
    .then((confirmationResult) => {
      this.confirmationResult = confirmationResult; // Almacena el resultado de confirmación
      this.registroError = 'Código enviado. Por favor, verifica tu teléfono.';
    })
    .catch((error) => {
      console.error('Error al enviar el código de verificación:', error);
      this.registroError = '❌ Error al enviar el código de verificación';
    });
}

// Confirmar el código de verificación
// Confirmar el código de verificación
confirmarCodigo() {
  if (!this.confirmationResult) {
    this.registroError = '❌ Debes enviar el código primero.';
    return;
  }
  this.confirmationResult.confirm(this.registrotel.codigo)
    .then((result: UserCredential) => {
      this.registroError = '';
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido ${result.user?.phoneNumber}`,
        timer: 2000,
        showConfirmButton: false
      });
      this.router.navigate(['/']);
    })
    .catch((error: any) => {
      console.error('Error al confirmar el código:', error);
      this.registroError = '❌ El código es incorrecto o ha expirado';
    });
}

  validarTelefono() {
    // Validar con una expresión regular que permita lada internacional
    this.telefonoValido = /^\+?[1-9]\d{1,14}$/.test(this.registrotel.telefono);
  }
}