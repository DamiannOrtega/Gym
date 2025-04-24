import { Injectable, signal } from '@angular/core';
import { Clase } from '../models/clase.model';


@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private clases = signal<Clase[]>([
    { id: 1, nombre: 'Zumba', descripcion: 'Clase de baile con cardio', imagen: 'zumba.jpg' },
    { id: 2, nombre: 'Yoga', descripcion: 'Posturas, respiración y relajación', imagen: 'yoga.jpg' },
    { id: 3, nombre: 'CrossFit', descripcion: 'Entrenamiento funcional', imagen: 'crossfit.jpg' },
  ]);

  getClases(): Clase[] {
    return this.clases();
  }

  getClasePorId(id: number): Clase | undefined {
    return this.clases().find(c => c.id === id);
  }
}
