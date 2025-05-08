import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';
import { FaqComponent } from '../../shared/faq/faq.component';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule, FaqComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  // Lista de motivos para el campo de selección
  motivos = ['Consultas generales', 'Soporte técnico', 'Clases y horarios'];
  
  // Lista de medios de contacto posibles
  medios = ['WhatsApp', 'Correo electrónico'];
  
  // Dirección del gimnasio para mostrar en el formulario
  direccion = 'Av. Universidad 940, Ciudad Universitaria, Universidad Autónoma de Aguascalientes, 20100 Aguascalientes, Ags.';
  
  // Array para almacenar los medios de contacto seleccionados
  mediosSeleccionados: string[] = [];
  
  // Declaración del formulario reactivo, se inicializa en ngOnInit
  form!: ReturnType<FormBuilder['group']>; 

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  ngOnInit(): void {
    // Configura el formulario reactivo con los campos requeridos y sus validaciones
    this.form = this.fb.group({
      // Campo de nombre, obligatorio, mínimo 3 caracteres
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      
      // Campo de correo electrónico, obligatorio y con validación de formato de correo
      email: ['', [Validators.required, Validators.email]],
      
      // Campo de motivo, obligatorio
      motivo: ['', Validators.required],
      
      // Campo de urgencia, opcional
      urgencia: [''],
      
      // Campo de métodos de contacto (checkboxes), obligatorio y como FormArray para múltiples valores
      mediosContacto: this.fb.array([], Validators.required),
      
      // Campo de promociones, obligatorio (Sí o No)
      promociones: ['', Validators.required],
      
      // Campo de fecha, obligatorio y debe ser una fecha válida
      fecha: ['', Validators.required],
      
      // Campo de comentarios, opcional
      comentarios: [''],
      
      // Campo de teléfono, opcional (se muestra solo si se selecciona WhatsApp)
      telefono: [''] 
    });
  }

  // Retorna la fecha actual en formato YYYY-MM-DD para usar como fecha mínima en el campo de fecha
  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Maneja los cambios en los checkboxes de métodos de contacto
  onMedioChange(event: Event, medio: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    const medios = this.form.get('mediosContacto') as FormArray;
  
    if (checked) {
      // Si el checkbox fue marcado, se agrega al array de métodos seleccionados
      medios.push(this.fb.control(medio));
      this.mediosSeleccionados.push(medio);
    } else {
      // Si fue desmarcado, se elimina del array de métodos seleccionados
      const i = medios.controls.findIndex(c => c.value === medio);
      if (i !== -1) medios.removeAt(i);
      this.mediosSeleccionados = this.mediosSeleccionados.filter(m => m !== medio);
    }
  }

  // Guarda los datos del formulario en el local storage
  guardar(): void {
    // Recupera los datos existentes del local storage (o inicializa como array vacío si no existen)
    const datos = this.storage.get<any>('formularioContacto') || [];
    
    // Agrega el nuevo formulario al array de datos
    datos.push(this.form.value);
    
    // Guarda el array actualizado en el local storage
    this.storage.set('formularioContacto', datos);

    // Muestra un mensaje de éxito usando SweetAlert
    Swal.fire('¡Gracias por contactarnos!', 'Tu mensaje ha sido registrado.', 'success');
    
    // Resetea el formulario para limpiarlo
    this.form.reset();
  }

  // Verifica si un campo es inválido y ha sido tocado para mostrar mensajes de error
  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    // Retorna verdadero si el control existe, fue tocado y es inválido
    return !!(c && c.touched && c.invalid);
  }
}
