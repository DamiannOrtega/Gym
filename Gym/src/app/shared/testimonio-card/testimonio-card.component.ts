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
      nombre: 'Alicia González',
      mensaje: '¡Me encantan las clases de Zumba! Siempre salgo con más energía.',
      foto: '/assets/img/zeling.jpg',
      clase: 'Zumba'
    },
    {
      nombre: 'Daniel Alonso Góndez',
      mensaje: 'Los entrenadores son súper profesionales y motivadores.',
      foto: '/assets/img/plex.jpg',
      clase: 'CrossFit'
    },
    {
      nombre: 'Gabriel Perez',
      mensaje: 'Hace poco me vi la velada del año IV, me motivé, espero y los entrenadores sean tan buenos para hacer una bestia.',
      foto: '/assets/img/Shadi.jpg',
      clase: 'Boxeo'
    },
    {
      nombre: 'Mir Blanco',
      mensaje: 'Hace poco me dejó mi novia, me siento destrozado, pero espero y un nuevo amanecer vuelva a mí,y por eso, entraré a mi prime, te odio Emily.',
      foto: '/assets/img/motivacion.png',
      clase: 'Pesos libres y máquinas'
    },
    {
      nombre: 'Guillermo Pinochet',
      mensaje: 'Durante estos ultimos 20 años, no he hecho nada de ejercicio, voy a adaptarme de nuevo',
      foto: '/assets/img/Guibeeru.png',
      clase: 'Pesos libres y máquinas'
    }
  ];

}
