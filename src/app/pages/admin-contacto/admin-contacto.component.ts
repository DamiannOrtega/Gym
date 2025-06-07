import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

import Swal from 'sweetalert2';
import { EmailService } from '../../services/email.service';

@Component({
  standalone: true,
  selector: 'app-admin-contacto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-contacto.component.html',
  styleUrls: ['./admin-contacto.component.css']
})
export class AdminContactoComponent implements OnInit {
  datosArray: any[] = [];
  editIndex: number | null = null;
  respuestaIndex: number | null = null;
  form!: ReturnType<FormBuilder['group']>;

  constructor(
    private firebaseService: FirebaseService, 
    private fb: FormBuilder,
    private emailService: EmailService
  
  ) { }

  ngOnInit(): void {
    // Cargar los mensajes desde Firestore
    this.cargarContactos();

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      urgencia: [''],
      fecha: ['', Validators.required],
      comentarios: [''],
      respuesta: [''] // Campo para la respuesta
    });
  }

  // Eliminar mensaje de la base de datos y de la lista local
 eliminar(index: number): void {
  const id = this.datosArray[index].id;

  this.firebaseService.eliminarDato('contactos', id)
    .then(() => {
      // Recargar desde Firestore (NO usar splice)
      this.cargarContactos();
      Swal.fire('Mensaje eliminado', '', 'success');
    })
    .catch((error) => {
      console.error('Error al eliminar el mensaje:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar el mensaje.', 'error');
    });
}


  // Editar mensaje
  editar(index: number): void {
    this.editIndex = index;
    const dato = this.datosArray[index];

    // Cargar los datos del mensaje seleccionado en el formulario de edición
    this.form.setValue({
      nombre: dato.nombre,
      email: dato.email,
      motivo: dato.motivo,
      fecha: dato.fecha,
      urgencia: dato.urgencia || '',
      comentarios: dato.comentarios || '',
      respuesta: '' // Inicializar el campo de respuesta vacío
    });

    this.respuestaIndex = null; // Desactivar el formulario de respuesta al editar
  }

  // Responder correo
  responderCorreo(index: number): void {
    this.respuestaIndex = index;
    const dato = this.datosArray[index];

    // Cargar los datos en el formulario de respuesta
    this.form.setValue({
      nombre: dato.nombre,
      email: dato.email,
      motivo: dato.motivo,
      fecha: dato.fecha,
      urgencia: dato.urgencia || '',
      comentarios: dato.comentarios || '',
      respuesta: '' // Inicializar el campo de respuesta vacío
    });

    this.editIndex = null; // Desactivar el formulario de edición al responder
  }

  // Guardar cambios en la edición & respuesta de correo
 guardar(): void {
  const formData = this.form.value;

  // Verifica si estás respondiendo
  if (this.respuestaIndex !== null) {
    this.emailService.enviarCorreo(formData).subscribe({
      next: () => {
        Swal.fire('Correo enviado con éxito', '', 'success');
        this.cancelar();
      },
      error: (error) => {
        console.error('Error al enviar el correo:', error);
        Swal.fire('Error', 'No se pudo enviar el correo.', 'error');
      }
    });
  }

  // Si estás editando el mensaje, actualizar en Firestore
  if (this.editIndex !== null) {
    const id = this.datosArray[this.editIndex].id;
    this.firebaseService.actualizarDato('contactos', id, formData)
      .then(() => {
        Swal.fire('Cambios guardados', '', 'success');
        this.cancelar();
      })
      .catch((error) => {
        console.error('Error al actualizar el mensaje:', error);
        Swal.fire('Error', 'Hubo un problema al guardar los cambios.', 'error');
      });
  }
}


  // Cancelar la edición o la respuesta
  cancelar(): void {
    this.editIndex = null;
    this.respuestaIndex = null;
    this.form.reset();
  }

  // Método para mostrar la fecha actual en formato ISO
  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  cargarContactos(): void {
  this.firebaseService.obtenerDatos('contactos').subscribe(data => {
    this.datosArray = data;
  });
}


}
