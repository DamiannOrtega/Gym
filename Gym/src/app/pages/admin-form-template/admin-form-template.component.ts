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
  clases = ['Zumba', 'CrossFit', 'Yoga', 'Pilates', 'Spinning','Body Pump','Boxeo','KickBoxing', 'Pesos libres y máquinas'];
  diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  turnosDisponibles = ['Mañana', 'Tarde'];

  editForm = {
    nombre: '',
    email: '',
    clase: '',
    dias: [] as string[],
    turno: '',
    fecha: ''
  };

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.datosArray = this.storage.get<any>('formularioTemplate');
  }

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  eliminar(index: number) {
    this.datosArray.splice(index, 1);
    this.storage.set('formularioTemplate', this.datosArray);
    this.cancelarEdicion();
  }

  editar(index: number) {
    const dato = this.datosArray[index];
    this.editForm = {
      nombre: dato.nombre,
      email: dato.email,
      clase: dato.clase,
      dias: [...(dato.dias || [])],
      turno: dato.turno || '',
      fecha: dato.fecha || ''
    };
    this.editIndex = index;
  }

  toggleDiaEdit(dia: string, checked: boolean) {
    if (checked) {
      this.editForm.dias.push(dia);
    } else {
      this.editForm.dias = this.editForm.dias.filter(d => d !== dia);
    }
  }

  onDiaCheckboxChange(event: Event, dia: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleDiaEdit(dia, checked);
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
    this.editForm = {
      nombre: '',
      email: '',
      clase: '',
      dias: [],
      turno: '',
      fecha: ''
    };
  }
}
