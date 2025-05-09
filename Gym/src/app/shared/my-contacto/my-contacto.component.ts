import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-contacto',
  imports: [CommonModule],
  templateUrl: './my-contacto.component.html',
  styleUrl: './my-contacto.component.css'
})
export class MyContactoComponent {

  tarjetas = [
    { 
      id: 1, 
      titulo: 'Carlos Enrique Blanco Ortiz', 
      textoFrente: 'Entrenador Profesional', 
      trasera: 'Mis redes!', 
      icons: [
        { class: 'fa-brands fa-instagram', url: 'https://www.instagram.com' },
        { class: 'fa-brands fa-twitter',url: 'https://www.twitter.com' },
        { class: 'fa-brands fa-whatsapp', url: 'https://wa.me/1234567890' }
      ]
    },
    { 
      id: 2, 
      titulo: 'Alan Gael Gallardo Jimenez', 
      textoFrente: 'Entrenador Profesional', 
      trasera: 'Siguemeeee!', 
      icons: [
        { class: 'fa-brands fa-instagram', url: 'https://www.instagram.com' },
        { class: 'fa-brands fa-twitter',url: 'https://www.twitter.com' },
        { class: 'fa-brands fa-whatsapp', url: 'https://wa.me/1234567890' }
      ]
    },
    { 
      id: 3, 
      titulo: 'Juan Damian Ortega de Luna',  
      textoFrente: 'Entrenador Profesional', 
      trasera: 'Aqui me encuentras...', 
      icons: [
        { class: 'fa-brands fa-instagram', url: 'https://www.instagram.com' },
        { class: 'fa-brands fa-twitter',url: 'https://www.twitter.com' },
        { class: 'fa-brands fa-whatsapp', url: 'https://wa.me/1234567890' }
      ]
    }
  ];

}
