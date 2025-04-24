import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-admin-form-template',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-form-template.component.html',
})
export class AdminFormTemplateComponent implements OnInit {
  datosArray: any[] = [];
  editIndex: number | null = null;
  clases = ['Zumba', 'Spinning', 'Yoga', 'Pilates', 'CrossFit'];


  // Formulario de edición
  editForm = {
    nombre: '',
    email: '',
    clase: ''
  };

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.datosArray = this.storage.get<any>('formularioTemplate');
  }

  eliminar(index: number) {
    this.datosArray.splice(index, 1);
    this.storage.set('formularioTemplate', this.datosArray);
    this.cancelarEdicion();
  }

  editar(index: number) {
    const dato = this.datosArray[index];
    this.editForm = { ...dato };
    this.editIndex = index;
  }

  guardarEdicion() {
    if (this.editIndex !== null) {
      this.datosArray[this.editIndex] = { ...this.editForm };
      this.storage.set('formularioTemplate', this.datosArray);
      this.cancelarEdicion();
    }
  }

  cancelarEdicion() {
    this.editIndex = null;
    this.editForm = { nombre: '', email: '', clase: '' };
  }
}
