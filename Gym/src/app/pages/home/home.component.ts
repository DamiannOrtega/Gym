import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  clasesDestacadas = [
    { id: 1, nombre: 'Zumba', icono: 'fas fa-music', descripcion: 'Cardio con ritmo latino para todos los niveles.', image: '/assets/img/gym1.jpg' },
    { id: 2, nombre: 'CrossFit', icono: 'fas fa-dumbbell', descripcion: 'Entrenamiento funcional de alta intensidad.', image: '/assets/img/gym1.jpg' },
    { id: 3, nombre: 'Yoga', icono: 'fas fa-spa', descripcion: 'Conecta cuerpo y mente con sesiones de yoga guiadas.', image: '/assets/img/gym1.jpg' }
  ];
  

  galeria = [
    '/assets/img/gym1.jpg',
    '/assets/img/carlitos.jpg',
    '/assets/img/gym2.jpg',
    '/assets/img/gym3.jpg',
  ];

  opiniones = [
    {
      nombre: 'Ana Martínez',
      mensaje: '¡Me encantan las clases de Zumba! Siempre salgo con más energía.',
      foto: '/assets/img/carlitos.jpg',
      clase: 'Zumba'
    },
    {
      nombre: 'Luis Herrera',
      mensaje: 'Los entrenadores son súper profesionales y motivadores.',
      foto: '/assets/img/carlitos.jpg',
      clase: 'CrossFit'
    },
    {
      nombre: 'Sofía García',
      mensaje: 'Un ambiente muy cómodo, ideal para empezar en el fitness.',
      foto: '/assets/img/carlitos.jpg',
      clase: 'Yoga'
    },
    {
      nombre: 'Sofía García',
      mensaje: 'Un ambiente muy cómodo, ideal para empezar en el fitness.',
      foto: '/assets/img/carlitos.jpg',
      clase: 'Yoga'
    },
    {
      nombre: 'Sofía García',
      mensaje: 'Un ambiente muy cómodo, ideal para empezar en el fitness.',
      foto: '/assets/img/carlitos.jpg',
      clase: 'Yoga'
    }
  ];
  
}
