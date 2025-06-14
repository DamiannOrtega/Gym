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
  usuario = '';
  nueva = '';
  confirmar = '';
  mensaje = '';

  constructor(private firebase: FirebaseService, private router: Router) {}

  recuperar() {
    if (this.nueva !== this.confirmar) {
      this.mensaje = '❌ Las contraseñas no coinciden.';
      return;
    }

    const patron = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{8,12}$/;
    if (!patron.test(this.nueva)) {
      this.mensaje = '❌ La nueva contraseña debe tener entre 8 y 12 caracteres, incluir mayúsculas, números y el carácter "_".';
      return;
    }

    ['usuarios', 'admins'].forEach(col => {
      this.firebase.getPorCampo(col, 'usuario', this.usuario).subscribe(data => {
        if (data.length > 0) {
          const user = data[0];
          const nuevaHash = CryptoJS.SHA256(this.nueva).toString();
          this.firebase.actualizarDato(col, user.id, {
            contrasena: nuevaHash,
            intentosFallidos: 0,
            bloqueado: false
          }).then(() => {
            this.mensaje = '✅ Contraseña actualizada. Puedes iniciar sesión.';
            setTimeout(() => this.router.navigate(['/login']), 2000);
          });
        }
      });
    });
  }
}
