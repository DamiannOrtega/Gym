import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
  import Swal from 'sweetalert2';
  import { StorageService } from '../../services/storage.service';
  import { FaqComponent } from '../../shared/faq/faq.component';
  import { MyContactoComponent } from '../../shared/my-contacto/my-contacto.component';

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule, FaqComponent,MyContactoComponent],
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

  faqsGenerales = [
    {
      pregunta: '¿Cuánto tiempo tardan en responder los mensajes?',
      respuesta: 'Respondemos en menos de 24 horas, ya sea por WhatsApp o correo electrónico.'
    },
    {
      pregunta: '¿Cuál es el horario de atención al público?',
      respuesta: 'Nuestro horario es de lunes a viernes de 7:00 a.m. a 9:00 p.m. y sábados de 8:00 a.m. a 2:00 p.m.'
    },
    {
      pregunta: '¿Necesito llevar algo para mis clases?',
      respuesta: 'Solo ropa cómoda, toalla personal y, si deseas, tu botella de agua.'
    },
    {
      pregunta: '¿Puedo asistir a una clase de prueba antes de inscribirme?',
      respuesta: 'Sí, ofrecemos una clase de prueba gratuita. Solo contáctanos para agendarla.'
    },
    {
      pregunta: '¿Qué pasa si falto a una clase?',
      respuesta: 'Puedes recuperarla otro día dentro de la misma semana, siempre que haya cupo disponible.'
    }
  ];
  
  // Array para almacenar los medios de contacto seleccionados
  mediosSeleccionados: string[] = [];
  
  // Declaración del formulario reactivo, se inicializa en ngOnInit
  form!: ReturnType<FormBuilder['group']>; 

    constructor(private fb: FormBuilder, private storage: StorageService) {}

    ngOnInit(): void {
      // Configura el formulario reactivo con los campos requeridos y sus validaciones
      this.form = this.fb.group({
        // Campo de nombre, obligatorio, mínimo 3 caracteres
        nombre: ['', [Validators.required, Validators.minLength(3), this.nombreCompletoValidator]],
        
        // Campo de correo electrónico, obligatorio y con validación de formato de correo
        email: ['', [Validators.required, Validators.email, this.emailProfesionalValidator]],

        
        // Campo de motivo, obligatorio
        motivo: ['', Validators.required],
        
        // Campo de urgencia, opcional
        urgencia: [''],
        
        // Campo de métodos de contacto (checkboxes), obligatorio y como FormArray para múltiples valores
        mediosContacto: this.fb.array([], Validators.required),
        
        // Campo de promociones, obligatorio (Sí o No)
        promociones: ['', Validators.required],
        
        // Campo de fecha, obligatorio y debe ser una fecha válida
        fecha: ['', [Validators.required, this.fechaValidator()]],
        
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
      const telefonoControl = this.form.get('telefono');
      if (checked) {
        medios.push(this.fb.control(medio));
        this.mediosSeleccionados.push(medio);
      } else {
        const index = medios.controls.findIndex(control => control.value === medio);
        if (index !== -1) {
          medios.removeAt(index);
          this.mediosSeleccionados = this.mediosSeleccionados.filter(m => m !== medio);
        }
      }
       // Validar el campo "telefono" si se selecciona "WhatsApp"
      if (this.mediosSeleccionados.includes('WhatsApp')) {
        telefonoControl?.setValidators([Validators.required, this.telefonoValidator()]);
      } else {
        telefonoControl?.clearValidators();
      }

    // Actualiza el estado del control para que se reflejen los cambios
    telefonoControl?.updateValueAndValidity();
      // Marca el campo como tocado para que se active la validación
      medios.markAsTouched();
    }

    // Guarda los datos del formulario en el local storage
    guardar(): void {
      // Recupera los datos existentes del local storage (o inicializa como array vacío si no existen)
      const datos = this.storage.get<any>('formularioContacto') || [];
      
      // Asegúrate de que todos los campos se guarden correctamente
      const nuevoContacto = {
          nombre: this.form.get('nombre')?.value || '',
          email: this.form.get('email')?.value || '',
          motivo: this.form.get('motivo')?.value || '',
          urgencia: this.form.get('urgencia')?.value || '',
          fecha: this.form.get('fecha')?.value || '',
          comentarios: this.form.get('comentarios')?.value || '',
          promociones: this.form.get('promociones')?.value || '',
          telefono: this.form.get('telefono')?.value || ''
      };

      console.log('Guardando contacto:', nuevoContacto);

      datos.push(nuevoContacto);
      
      // Guarda el array actualizado en el local storage
      this.storage.set('formularioContacto', datos);

      // Muestra un mensaje de éxito usando SweetAlert
      Swal.fire('¡Gracias por contactarnos!', 'Tu mensaje ha sido registrado.', 'success');
      
      // Resetea el formulario para limpiarlo
      this.form.reset();
      this.mediosSeleccionados = [];
    }
    // Verifica si un campo es inválido y ha sido tocado para mostrar mensajes de error
    isInvalid(control: string): boolean {
      const c = this.form.get(control);
      // Retorna verdadero si el control existe, fue tocado y es inválido
      return !!(c && c.touched && c.invalid);
    }
    nombreCompletoValidator(control: AbstractControl): ValidationErrors | null {
      const nombre = control.value || '';
      const palabras = nombre.trim().split(' ');
      if (palabras.length < 2 || palabras.some((p: string) => p.length < 3)) {
        return { nombreIncompleto: true };
      }
      return null;
    }

    emailProfesionalValidator(control: AbstractControl): ValidationErrors | null {
      const email = control.value || '';
      
      // Patrón para correos válidos sin caracteres especiales en el usuario
      const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    

    
      // Valida longitud mínima y máxima
      if (email.length < 5 || email.length > 50) {
        return { longitudInvalida: true };
      }
    
      // Valida caracteres especiales en el usuario del correo
      const usuario = email.split('@')[0];
      if (/[^a-zA-Z0-9._%+-]/.test(usuario)) {
        return { usuarioInvalido: true };
      }
 
      return null;
    }
    
  //Esta funcion es para verificar las validaciones del num de tel
    telefonoValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const telefono = control.value || '';
    
        // Solo permite exactamente 10 dígitos numéricos
        const patronTelefono = /^[0-9]{10}$/;

          // Verificamos que no tenga letras
          if (/[a-zA-Z]/.test(telefono)) {
            return { letrasNoPermitidas: true };
          }
            
        if (telefono && !patronTelefono.test(telefono)) {
          return { telefonoInvalido: true };
        }
    

        return null;
      };
    }

  //Esta funcion es para verificar las validaciones de la fecha
    fechaValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const fechaSeleccionadaStr = control.value;
    
        // Verificamos que se haya seleccionado una fecha
        if (!fechaSeleccionadaStr) {
          return { fechaRequerida: true };
        }
    
        // Convertimos  a objeto Date
        const fechaSeleccionada = new Date(fechaSeleccionadaStr);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // comparamos fechas
    
        // Verificamos que no sea un día anterior a hoy
        if (fechaSeleccionada < hoy) {
          return { fechaPasada: true };
        }
    
        // Verificamos  que no sea un domingo (0 = domingo)
        if (fechaSeleccionada.getUTCDay() === 0) {
          return { domingoNoPermitido: true };
        }
    
        return null;
      };
    }
    
    
    
    
    
    
    
  }