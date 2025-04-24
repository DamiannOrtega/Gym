import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-formulario-reactivo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-reactivo.component.html',
})

export class FormularioReactivoComponent implements OnInit {
  clases = ['Boxeo', 'Kickboxing', 'Body Pump', 'CrossFit'];
  form!: ReturnType<FormBuilder['group']>; // se inicializa en ngOnInit

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      clase: ['', Validators.required],
      fecha: ['', Validators.required],
      dias: this.fb.array([], Validators.required),
      turno: ['', Validators.required]
    });
  }

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  onCheckboxChange(event: any): void {
    const dias = this.form.get('dias') as FormArray;
    if (event.target.checked) {
      dias.push(this.fb.control(event.target.value));
    } else {
      const index = dias.controls.findIndex(x => x.value === event.target.value);
      if (index >= 0) dias.removeAt(index);
    }
  }

  guardar(): void {
    const datos = this.storage.get<any>('formularioReactive');
    datos.push(this.form.value);
    this.storage.set('formularioReactive', datos);

    Swal.fire('¡Registro exitoso!', 'Tu información ha sido guardada.', 'success');
    this.form.reset();
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.invalid);
  }
}
