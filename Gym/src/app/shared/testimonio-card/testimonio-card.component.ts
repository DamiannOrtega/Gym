import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-testimonio-card',
  imports: [RouterModule,CommonModule],
  templateUrl: './testimonio-card.component.html',
  styleUrl: './testimonio-card.component.css'
})
export class TestimonioCardComponent {
  
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
