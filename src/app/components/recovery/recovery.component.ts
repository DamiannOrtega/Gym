import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, RouterModule } from '@angular/router';
import CryptoJS from 'crypto-js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  correo = '';
  usuario='';
  codigo = '';
  nueva = '';
  confirmar = '';
  mensaje = '';
  mostrarCodigo = false;
  codigoVerificado = false;

  constructor(private firebase: FirebaseService, private router: Router) {}

  recuperar() {
    if (this.nueva !== this.confirmar) {
      this.mensaje = '❌ Las contraseñas no coinciden.';
      return;
    }
  
    const patron = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{8,12}$/;
    if (!patron.test(this.nueva)) {
      this.mensaje = '❌ La contraseña debe tener entre 8 y 12 caracteres, incluir mayúsculas, números y el carácter "_".';
      return;
    }
  
    ['usuarios', 'admins'].forEach(col => {
      this.firebase.getPorDosCampos(col, 'correo', this.correo, 'usuario', this.usuario).subscribe(data => {
        if (data.length > 0) {
          const user = data[0];
          const nuevaHash = CryptoJS.SHA256(this.nueva).toString();
  
          this.firebase.actualizarDato(col, user.id, {
            contrasena: nuevaHash,
            intentosFallidos: 0,
            bloqueado: false
          }).then(() => {
            this.mensaje = '✅ Contraseña actualizada. Puedes iniciar sesión.';
            
          });
        } else {
          this.mensaje = '❌ No se encontró una cuenta con ese usuario y correo.';
        }
      });
    });
    this.router.navigate(['/login']);
  }
  
  

  enviarCodigo() {
    fetch('http://localhost:3000/api/enviar-codigo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: this.correo, usuario: this.usuario })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          this.mensaje = '📩 Código enviado al correo.';
          this.mostrarCodigo = true;
        } else {
          this.mensaje = `❌ ${data.mensaje || 'Error al enviar el código.'}`;
        }
      })
      .catch(() => this.mensaje = '❌ No se pudo conectar con el servidor.');
  }
    
  verificarCodigo() {
    this.firebase.getPorId('codigos', this.correo).subscribe(doc => {
      if (doc && doc.codigo === this.codigo) {
        this.codigoVerificado = true;
        this.mensaje = '✅ Código correcto. Ingresa tu nueva contraseña.';
      } else {
        this.mensaje = '❌ Código incorrecto.';
      }
    });
  }
  
}
