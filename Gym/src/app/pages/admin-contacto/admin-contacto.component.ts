import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

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
  motivos = ['Consultas generales', 'Soporte técnico', 'Clases y horarios'];
  urgencias = ['Normal', 'Urgente', 'Muy urgente'];

  form!: ReturnType<FormBuilder['group']>; 

  constructor(private storage: StorageService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.datosArray = this.storage.get<any>('formularioContacto');

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      urgencia: [''],  
      fecha: ['', Validators.required],
      comentarios: ['']
    });
  }

  eliminar(index: number): void {
    this.datosArray.splice(index, 1);
    this.storage.set('formularioContacto', this.datosArray);
    this.cancelar();
  }

  editar(index: number): void {
    this.editIndex = index;
    const dato = this.datosArray[index];
    this.form.setValue({
      nombre: dato.nombre,
      email: dato.email,
      motivo: dato.motivo, 
      fecha: dato.fecha,
      urgencia: dato.urgencia || '', 
      comentarios: dato.comentarios || ''  
    });
  }

  guardar(): void {
    if (this.editIndex !== null) {
      this.datosArray[this.editIndex] = this.form.value;
      this.storage.set('formularioContacto', this.datosArray);
      this.cancelar();
    }
  }

  cancelar(): void {
    this.editIndex = null;
    this.form.reset();
  }
  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }
}