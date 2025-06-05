import { Component, ElementRef, ViewChild, Signal, signal } from '@angular/core';
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
  imports: [CommonModule, FormsModule, OpinionesComponent, FaqComponent],
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent {
  // Señal para el mensaje de notificación (vacío = no mostrar)
  notificacion = signal<string>('');
  private timeoutId?: ReturnType<typeof setTimeout>;


  errorDias = "";

  // Lista de clases disponibles para inscripción
  clases = ['Zumba', 'CrossFit', 'Yoga', 'Pilates', 'Spinning', 'Body Pump', 'Boxeo', 'KickBoxing', 'Pesos libres y máquinas'];

  // Lista de días disponibles para seleccionar
  diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Lista de turnos disponibles para seleccionar
  turnosDisponibles = ['Mañana', 'Tarde'];

  // Variable para marcar si los días seleccionados son válidos o no
  diasInvalidos = false;
  esDomingo = false;
  fechaInvalida = false;

  errorFecha: string = ''; // Inicializamos como cadena vacía

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
  @ViewChild('paypalButtonContainer', { static: false }) paypalElement!: ElementRef;
  @ViewChild('f') formulario!: NgForm;

  pagoCompletado = false;
  mostrandoBotonPaypal = false;

  // Objeto que almacena los datos de inscripción
  inscripcion = {
    nombre: '',
    email: '',
    clase: '',
    fecha: '',
    dias: [] as string[],  // Arreglo de días seleccionados
    turno: ''
  };

  // Precio según clase (ajusta según tus datos)
  get precio(): number {
    switch (this.inscripcion.clase) {
      case 'Zumba': return 400;
      case 'CrossFit': return 600;
      case 'Yoga': return 500;
      case 'Pilates': return 450;
      case 'Spinning': return 350;
      case 'Body Pump': return 550;
      case 'Boxeo': return 500;
      case 'KickBoxing': return 500;
      case 'Pesos libres y máquinas': return 700;
      default: return 500;
    }
  }

  get precioSeleccionado(): number {
    switch (this.inscripcion.clase) {
      case 'Zumba': return 400;
      case 'CrossFit': return 600;
      case 'Yoga': return 500;
      case 'Pilates': return 450;
      case 'Spinning': return 350;
      case 'Body Pump': return 550;
      case 'Boxeo': return 500;
      case 'KickBoxing': return 500;
      case 'Pesos libres y máquinas': return 700;
      default: return 0;
    }
  }

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


  validarFecha() {
    // Si no se ha seleccionado una fecha, mostramos el error correspondiente
    if (!this.inscripcion.fecha) {
      this.errorFecha = "Debe seleccionar una fecha.";
    } else {
      const fechaSeleccionada = new Date(this.inscripcion.fecha);
      const fechaHoy = new Date();
      fechaHoy.setHours(0, 0, 0, 0); // Ajustamos la hora para comparar solo las fechas

      // Verificamos si la fecha seleccionada es un domingo (0 = domingo)
      this.esDomingo = fechaSeleccionada.getUTCDay() === 0;

      // Si es un domingo, mostramos el mensaje de error para domingo
      if (this.esDomingo) {
        this.errorFecha = "No se permiten fechas en domingo, no trabajamos ese día.";
      } else if (fechaSeleccionada < fechaHoy) {
        // Si la fecha es anterior a hoy, mostramos el mensaje de error correspondiente
        this.errorFecha = "La fecha no puede ser anterior a hoy.";
      } else {
        // Si la fecha es válida, limpiamos el mensaje de error
        this.errorFecha = "";
      }
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

  toggleDiaVisual(dia: string, form: NgForm): void {
    const index = this.inscripcion.dias.indexOf(dia);

    // Si el día no está en el arreglo, lo agrega
    if (index === -1) {
      this.inscripcion.dias.push(dia);
    } else {
      // Si ya está en el arreglo, lo elimina
      this.inscripcion.dias.splice(index, 1);
    }

    // Valida los días seleccionados después de cada cambio
    this.validarDias(form);
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
   // Método para guardar los datos del formulario
  guardar(form: NgForm) {
    // Verifica si el formulario es inválido o si no se seleccionaron días
    if (form.invalid || this.inscripcion.dias.length === 0) {
      return;
    }

    // Si el pago ya se completó, muestra la notificación y guarda los datos
    if (this.pagoCompletado) {
      const datos = this.storage.get<any>('formularioTemplate') || [];
      datos.push(this.inscripcion);
      this.storage.set('formularioTemplate', datos);

      Swal.fire('¡Registro exitoso!', 'Tu inscripción ha sido guardada.', 'success');
      form.resetForm();
      this.inscripcion.dias = [];
      this.pagoCompletado = false;
      this.mostrandoBotonPaypal = false;
      return;
    }

    // Si no ha pagado, mostramos el botón PayPal
    this.mostrandoBotonPaypal = true;
    setTimeout(() => this.renderizarBotonPaypal(), 0);
  }

  // Función que maneja el pago a través de PayPal
  renderizarBotonPaypal() {
    if (!this.paypalElement) return;

    this.paypalElement.nativeElement.innerHTML = ''; // Limpia si ya había botón

    // @ts-ignore
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.precio.toString()
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          Swal.fire('Pago completado', `Gracias, ${details.payer.name.given_name}!`, 'success');
          
          // Mostrar la notificación solo después de que se haya completado el pago
          this.notificacionInscripcion();

          this.pagoCompletado = true;
          this.mostrandoBotonPaypal = false;
          this.guardar(this.formulario); // Guardar inscripción después de pagar
        });
      },
      onCancel: () => {
        Swal.fire('Pago cancelado', 'El pago fue cancelado, inténtalo de nuevo.', 'info');
        this.mostrandoBotonPaypal = false;
      },
      onError: (err: any) => {
        Swal.fire('Error', 'Ocurrió un error con el pago: ' + err, 'error');
        this.mostrandoBotonPaypal = false;
      }
    }).render(this.paypalElement.nativeElement);
  }

  // Notificación que se muestra al inscribirse
  notificacionInscripcion() {
    this.notificacion.set(`¡Te inscribiste correctamente a ${this.inscripcion.clase}!`);
    // Limpiar la notificación después de 5 segundos
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.notificacion.set('');
      this.timeoutId = undefined;
    }, 5000);
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

  validarNombre(nombreControl: any): void {
    const nombre = this.inscripcion.nombre || '';
    const errors: { [key: string]: boolean } = {};

    if (this.nombreVacio(nombre)) {
      errors['nombreVacio'] = true;
    }

    if (this.nombreCorto(nombre)) {
      errors['nombreCorto'] = true;
    }

    if (this.nombreSinApellidos(nombre)) {
      errors['nombreSinApellidos'] = true;
    }

    // Si hay errores, se los asigna al control, si no, los limpia
    nombreControl.control.setErrors(Object.keys(errors).length ? errors : null);
  }
  // Validadores individuales
  nombreVacio(nombre: string): boolean {
    return nombre.trim().length === 0;
  }

  nombreCorto(nombre: string): boolean {
    return nombre.trim().length < 3;
  }

  nombreSinApellidos(nombre: string): boolean {
    const palabras = nombre.trim().split(' ');
    return palabras.length < 2 || palabras.some(p => p.length < 3);
  }

  validarCorreo(emailControl: any): void {
    const email = this.inscripcion.email || '';
    const errors: { [key: string]: boolean } = {};

    if (this.correoVacio(email)) {
      errors['correoVacio'] = true;
    }

    if (this.correoFormatoInvalido(email)) {
      errors['correoFormatoInvalido'] = true;
    }

    if (this.correoUsuarioInvalido(email)) {
      errors['correoUsuarioInvalido'] = true;
    }

    if (this.correoDominioInvalido(email)) {
      errors['correoDominioInvalido'] = true;
    }

    // Asigna los errores al control, o los limpia si no hay errores
    emailControl.control.setErrors(Object.keys(errors).length ? errors : null);
  }

  // Validadores individuales
  correoVacio(email: string): boolean {
    return email.trim().length === 0;
  }

  correoFormatoInvalido(email: string): boolean {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !patronCorreo.test(email);
  }

  correoUsuarioInvalido(email: string): boolean {
    const usuario = email.split('@')[0];
    return /[^a-zA-Z0-9._%+-]/.test(usuario);
  }

  correoDominioInvalido(email: string): boolean {
    const dominiosComunes = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

    // Divide el correo en usuario y dominio
    const partes = email.split('@');

    // Verifica que el correo tenga un dominio y que sea uno permitido
    if (partes.length !== 2) {
      return true; // Si no tiene exactamente un @, es inválido
    }

    const dominio = partes[1].toLowerCase();
    return !dominiosComunes.includes(dominio);
  }

  // Validación de días
  validarDias(form: NgForm): void {
    const diasSeleccionados = this.inscripcion.dias || [];

    // Si no hay días seleccionados
    if (diasSeleccionados.length === 0) {
      this.diasInvalidos = true;
      this.errorDias = "Debes seleccionar al menos dos días preferidos.";
    }
    // Si hay solo un día seleccionado
    else if (diasSeleccionados.length === 1) {
      this.diasInvalidos = true;
      this.errorDias = "Debes seleccionar al menos dos días.";
    }
    // Si hay dos o más días seleccionados, no hay errores
    else {
      this.diasInvalidos = false;
      this.errorDias = "";
    }

    // Marca el formulario como inválido si hay errores
    form.controls['dias']?.setErrors(this.diasInvalidos ? { diasInvalidos: true } : null);
  }



  // Validación del turno
  validarTurno(form: NgForm): void {
    if (!this.inscripcion.turno) {
      form.controls['turno']?.setErrors({ turnoRequerido: true });
    } else {
      form.controls['turno']?.setErrors(null);
    }
  }

  //Notificacion de inscripcion de clase
  cerrarNotificacion() {
    this.notificacion.set('');
  }


}
