import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';
import { FaqComponent } from '../../shared/faq/faq.component';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule,FaqComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  motivos = ['Consultas generales', 'Soporte técnico', 'Clases y horarios'];
  medios = ['WhatsApp', 'Correo electrónico'];
  direccion = ' Av. Universidad 940, Ciudad Universitaria, Universidad Autónoma de Aguascalientes, 20100 Aguascalientes, Ags.';
  mediosSeleccionados: string[] = [];

  form!: ReturnType<FormBuilder['group']>; // declaración fuera del constructor

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      urgencia: [''],
      mediosContacto: this.fb.array([], Validators.required),
      promociones: ['', Validators.required],
      fecha: ['', Validators.required],
      comentarios: [''],
      telefono: [''] 
    });
    
  }

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  onMedioChange(event: Event, medio: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    const medios = this.form.get('mediosContacto') as FormArray;
  
    if (checked) {
      medios.push(this.fb.control(medio));
      this.mediosSeleccionados.push(medio);
    } else {
      const i = medios.controls.findIndex(c => c.value === medio);
      if (i !== -1) medios.removeAt(i);
      this.mediosSeleccionados = this.mediosSeleccionados.filter(m => m !== medio);
    }
  }
  

  guardar(): void {
    // Recupera los datos existentes del local storage
    const datos = this.storage.get<any>('formularioContacto');
    
    // Agrega el nuevo formulario al array de datos
    datos.push(this.form.value);
    
    // Guarda el array actualizado en el local storage
    this.storage.set('formularioContacto', datos);

    // Muestra un mensaje de éxito usando SweetAlert
    Swal.fire('¡Gracias por contactarnos!', 'Tu mensaje ha sido registrado.', 'success');
    
    // Resetea el formulario para limpiarlo
    this.form.reset();
}


  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.touched && c.invalid);
  }

  
}