import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-inscripcion',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent {
  clases = ['Zumba', 'CrossFit', 'Yoga', 'Pilates', 'Spinning','Body Pump','Boxeo','KickBoxing', 'Pesos libres y máquinas'];  
  diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  turnosDisponibles = ['Mañana', 'Tarde'];
  diasInvalidos = false;


  inscripcion = {
    nombre: '',
    email: '',
    clase: '',
    fecha: '',
    dias: [] as string[],
    turno: ''
  };

  constructor(private storage: StorageService, private route: ActivatedRoute) {}

  hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  toggleDia(dia: string, checked: boolean) {
    if (checked) {
      this.inscripcion.dias.push(dia);
    } else {
      this.inscripcion.dias = this.inscripcion.dias.filter(d => d !== dia);
    }
  }

  toggleDiaVisual(dia: string) {
    const index = this.inscripcion.dias.indexOf(dia);
    if (index === -1) {
      this.inscripcion.dias.push(dia);
    } else {
      this.inscripcion.dias.splice(index, 1);
    }
  }
  
  onDiaChange(event: Event, dia: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleDia(dia, checked);
  }

  esFormularioValido(form: NgForm): boolean {
    return !!form.valid && this.inscripcion.dias.length > 0;
  }
  
  

  guardar(form: NgForm) {
    if (form.invalid || this.inscripcion.dias.length === 0) {
      this.diasInvalidos = this.inscripcion.dias.length === 0;
      return;
    }
  
    this.diasInvalidos = false;
  
    const datos = this.storage.get<any>('formularioTemplate');
    datos.push(this.inscripcion);
    this.storage.set('formularioTemplate', datos);
  
    Swal.fire('¡Registro exitoso!', 'Tu inscripción ha sido guardada.', 'success');
  
    form.resetForm();           // Limpia el formulario
    this.inscripcion.dias = []; // Limpia los checkboxes manualmente
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
  
    if (!isNaN(id)) {
      if (id >= 9 && id <= 18) {
        this.inscripcion.clase = 'Pesos libres y máquinas';
      } else {
        const claseSeleccionada = this.clases.find(c => c.toLowerCase().includes(this.obtenerNombreClasePorId(id)));
        if (claseSeleccionada) {
          this.inscripcion.clase = claseSeleccionada;
        }
      }
    }
  }
  
  // Método de ayuda para mapear ids a clases comunes
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
    return clasesPorId[id]?.toLowerCase() ?? '';
  }
  
  
  
  
}
