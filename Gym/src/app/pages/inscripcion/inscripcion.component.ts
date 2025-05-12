import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { OpinionesComponent } from '../../components/opiniones/opiniones.component';
import { FaqComponent } from '../../shared/faq/faq.component';

@Component({
  standalone: true,
  selector: 'app-inscripcion',
  imports: [CommonModule, FormsModule, OpinionesComponent,FaqComponent],
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent {
  // Lista de clases disponibles para inscripción
  clases = ['Zumba', 'CrossFit', 'Yoga', 'Pilates', 'Spinning', 'Body Pump', 'Boxeo', 'KickBoxing', 'Pesos libres y máquinas'];

  // Lista de días disponibles para seleccionar
  diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Lista de turnos disponibles para seleccionar
  turnosDisponibles = ['Mañana', 'Tarde'];

  // Variable para marcar si los días seleccionados son válidos o no
  diasInvalidos = false;


  faqsInscripcion = [
    {
      pregunta: '¿Puedo cambiar mi clase después de inscribirme?',
      respuesta: 'Sí, puedes modificar tu inscripción comunicándote con nosotros directamente.'
    },
    {
      pregunta: '¿Cuáles son los requisitos para inscribirme?',
      respuesta: 'Solo necesitas ser mayor de edad y llenar el formulario de inscripción.'
    },
    {
      pregunta: '¿Puedo cambiar mi horario después de inscribirme?',
      respuesta: 'Sí, puedes modificar tu horario contactándonos directamente.'
    },
    {
      pregunta: '¿Hay descuentos por inscripción anticipada?',
      respuesta: 'Sí, ofrecemos descuentos para inscripciones tempranas. Consulta nuestras promociones.'
    },
    {
      pregunta: '¿Qué métodos de pago aceptan para la inscripción?',
      respuesta: 'Aceptamos pagos en efectivo, tarjeta de crédito, débito y transferencias bancarias.'
    }
  ];

  // Decorador @ViewChild para capturar el formulario (NgForm) desde el template
  @ViewChild('f') formulario!: NgForm;

  fechaInvalida = false;


  // Objeto que almacena los datos de inscripción
  inscripcion = {
    nombre: '',
    email: '',
    clase: '',
    fecha: '',
    dias: [] as string[],  // Arreglo de días seleccionados
    turno: ''
  };



  // Inyección de servicios de almacenamiento y ruta activa
  constructor(private storage: StorageService, private route: ActivatedRoute) { }

  // Retorna la fecha actual en formato YYYY-MM-DD para usar como fecha mínima en el campo de fecha
  hoy(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // Método para validar que la fecha seleccionada no sea anterior a hoy
  validarFecha() {
    if (this.inscripcion.fecha) {
      // Obtener la fecha seleccionada como cadena
      const fechaSeleccionada = this.inscripcion.fecha;
      const fechaHoy = this.hoy();

      // Solo marcar como inválida si la fecha es estrictamente menor que hoy
      this.fechaInvalida = fechaSeleccionada < fechaHoy;
    } else {
      this.fechaInvalida = false;
    }
  }




  // Método para alternar la selección de días (checkboxes)
  toggleDia(dia: string, checked: boolean) {
    if (checked) {
      // Si el checkbox fue marcado, agrega el día al arreglo de días seleccionados
      this.inscripcion.dias.push(dia);
    } else {
      // Si fue desmarcado, elimina el día del arreglo
      this.inscripcion.dias = this.inscripcion.dias.filter(d => d !== dia);
    }
  }

  // Método alternativo para manejar la selección visual de días
  toggleDiaVisual(dia: string) {
    const index = this.inscripcion.dias.indexOf(dia);
    if (index === -1) {
      // Si el día no está en el arreglo, lo agrega
      this.inscripcion.dias.push(dia);
    } else {
      // Si ya está en el arreglo, lo elimina
      this.inscripcion.dias.splice(index, 1);
    }
  }

  // Maneja el evento de cambio en los checkboxes de días
  onDiaChange(event: Event, dia: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleDia(dia, checked);
  }

  // Verifica si el formulario es válido antes de permitir su envío
  esFormularioValido(form: NgForm): boolean {
    // Es válido si todos los campos son válidos y al menos un día fue seleccionado
    return !!form.valid && this.inscripcion.dias.length > 0;
  }

  // Método para guardar los datos del formulario en local storage
  guardar(form: NgForm) {
    // Asigna el formulario al campo ViewChild para su uso posterior
    this.formulario = form;

    // Verifica si el formulario es inválido o si no se seleccionaron días
    if (form.invalid || this.inscripcion.dias.length === 0) {
      // Marca los días como inválidos si no se seleccionaron
      this.diasInvalidos = this.inscripcion.dias.length === 0;
      return;
    }

    // Marca los días como válidos
    this.diasInvalidos = false;

    // Recupera los datos existentes del local storage (o inicializa como array vacío si no existen)
    const datos = this.storage.get<any>('formularioTemplate') || [];

    // Agrega los datos de la nueva inscripción al array
    datos.push(this.inscripcion);

    // Guarda el array actualizado en el local storage
    this.storage.set('formularioTemplate', datos);

    // Muestra un mensaje de éxito usando SweetAlert
    Swal.fire('¡Registro exitoso!', 'Tu inscripción ha sido guardada.', 'success');

    // Resetea el formulario para limpiarlo y reinicia la lista de días seleccionados
    form.resetForm();
    this.inscripcion.dias = [];
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Verifica si hay un parámetro 'id' en la URL
    const idParam = this.route.snapshot.queryParamMap.get('id');

    if (idParam !== null) {
      const id = Number(idParam);

      // Si el ID es válido, asigna la clase automáticamente según el ID
      if (!isNaN(id)) {
        // Para IDs de 9 a 18, asigna 'Pesos libres y máquinas'
        if (id >= 9 && id <= 18) {
          this.inscripcion.clase = 'Pesos libres y máquinas';
        } else {
          // Para otros IDs, intenta mapear el ID a una clase usando el método helper
          const claseSeleccionada = this.clases.find(c =>
            c.toLowerCase().includes(this.obtenerNombreClasePorId(id))
          );
          if (claseSeleccionada) {
            this.inscripcion.clase = claseSeleccionada;
          }
        }
      }
    }
  }

  // Método de ayuda para mapear IDs a nombres de clases
  obtenerNombreClasePorId(id: number): string {
    const clasesPorId: { [key: number]: string } = {
      1: 'zumba',
      2: 'crossfit',
      3: 'yoga',
      4: 'pilates',
      5: 'spinning',
      6: 'body pump',
      7: 'boxeo',
      8: 'kickboxing'
    };
    // Retorna el nombre de la clase en minúsculas o una cadena vacía si el ID no es válido
    return clasesPorId[id]?.toLowerCase() ?? '';
  }

  // Verifica si un control específico es inválido
  esInvalido(control: string): boolean {
    const c = this.formulario?.controls?.[control];
    // Retorna verdadero si el control es inválido y ha sido tocado o el formulario fue enviado
    return !!(c && (c.touched || this.formulario.submitted) && c.invalid);
  }



}
