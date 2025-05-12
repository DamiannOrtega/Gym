import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-class-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.css'
})
export class ClassCardComponent {
  clasesDestacadas = [
    { id: 1, nombre: 'Zumba', icono: 'fas fa-music', descripcion: 'Cardio con ritmo latino para todos los niveles.', image: './assets/img/zumba.avif' },
    { id: 2, nombre: 'CrossFit', icono: 'fas fa-dumbbell', descripcion: 'Entrenamiento funcional de alta intensidad.', image: './assets/img/crossfit.jpg' },
    { id: 3, nombre: 'Yoga', icono: 'fas fa-spa', descripcion: 'Conecta cuerpo y mente con sesiones de yoga guiadas.', image: './assets/img/yoga.jpg' }
  ];
  

}
