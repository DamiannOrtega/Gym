import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-inscripcion',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripcion.component.html',
})
export class InscripcionComponent {
  clases = ['Zumba', 'Spinning', 'Yoga', 'Pilates', 'CrossFit'];
  diasDisponibles = ['Lunes', 'Miércoles', 'Viernes'];
  turnosDisponibles = ['Mañana', 'Tarde'];

  inscripcion = {
    nombre: '',
    email: '',
    clase: '',
    fecha: '',
    dias: [] as string[],
    turno: ''
  };

  constructor(private storage: StorageService) {}

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  guardar(form: NgForm) {
    const datos = this.storage.get<any>('formularioTemplate');
    datos.push(this.inscripcion);
    this.storage.set('formularioTemplate', datos);
    Swal.fire('¡Registro exitoso!', 'Tu inscripción ha sido guardada.', 'success');
    form.resetForm();
  }
}
