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
    { id: 1, nombre: 'Zumba', icono: 'fas fa-music', descripcion: 'Cardio con ritmo latino para todos los niveles.', image: '/assets/img/zumba.avif' },
    { id: 2, nombre: 'CrossFit', icono: 'fas fa-dumbbell', descripcion: 'Entrenamiento funcional de alta intensidad.', image: '/assets/img/crossfit.jpg' },
    { id: 3, nombre: 'Yoga', icono: 'fas fa-spa', descripcion: 'Conecta cuerpo y mente con sesiones de yoga guiadas.', image: '/assets/img/yoga.jpg' }
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
      nombre: 'René Descartes',
      mensaje: 'Hace poco me vi la velada del año IV, me motivé, espero y los entrenadores sean tan buenos para hacer una bestia.',
      foto: '/assets/img/carlitos.jpg',
      clase: 'Boxeo'
    },
    {
      nombre: 'Mir Blanco',
      mensaje: 'Hace poco me dejó mi novia, me siento destrozado, pero espero y un nuevo amanecer vuelva a mí,y por eso, entraré a mi prime, te odio Emily.',
      foto: '/assets/img/motivacion.png',
      clase: 'Pesos libres y máquinas'
    },
    {
      nombre: 'Ricardo Magallanes',
      mensaje: 'Durante estos ultimos 20 años, no he hecho nada de ejercicio, voy a adaptarme de nuevo',
      foto: '/assets/img/carlitos.jpg',
      clase: 'Pesos libres y máquinas'
    }
  ];
  
}
