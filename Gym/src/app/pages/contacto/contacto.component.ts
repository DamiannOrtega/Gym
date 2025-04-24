import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent implements OnInit {
  motivos = ['Consultas generales', 'Soporte técnico', 'Clases y horarios'];
  medios = ['WhatsApp', 'Correo electrónico'];

  form!: ReturnType<FormBuilder['group']>; // declaración fuera del constructor

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      mediosContacto: this.fb.array([], Validators.required),
      promociones: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  onMedioChange(event: Event, medio: string): void {
    const check = (event.target as HTMLInputElement).checked;
    const medios = this.form.get('mediosContacto') as FormArray;

    if (check) {
      medios.push(this.fb.control(medio));
    } else {
      const i = medios.controls.findIndex(c => c.value === medio);
      if (i !== -1) medios.removeAt(i);
    }
  }

  guardar(): void {
    const datos = this.storage.get<any>('formularioContacto');
    datos.push(this.form.value);
    this.storage.set('formularioContacto', datos);

    Swal.fire('¡Gracias por contactarnos!', 'Tu mensaje ha sido registrado.', 'success');
    this.form.reset();
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.invalid);
  }
}
