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
      imagen: 'assets/img/enrique.jpg',
      icons: [
        { class: 'fa-brands fa-instagram', url: 'https://www.instagram.com/c_enrique_blanco?igsh=cWN4amZ3NzZhN2Uz' },
        { class: 'fa-brands fa-twitter',url: 'https://x.com/miranother?t=I-pR2Y8LQjzFQR7JTjzjJQ&s=09' },
        { class: 'fa-brands fa-whatsapp', url: 'https://wa.me/1234567890' }
      ]
    },
    { 
      id: 2, 
      titulo: 'Alan Gael Gallardo Jimenez', 
      textoFrente: 'Entrenador Profesional', 
      trasera: 'Siguemeeee!', 
      imagen: 'assets/img/alan.jpg',
      icons: [
        { class: 'fa-brands fa-instagram', url: 'https://www.instagram.com/alan.gael.37?igsh=MTc3cXB1a2FlY2ZoNw%3D%3D&utm_source=qr' },
        { class: 'fa-brands fa-twitter',url: 'https://www.twitter.com' },
        { class: 'fa-brands fa-whatsapp', url: 'https://wa.me/1234567890' }
      ]
    },
    { 
      id: 3, 
      titulo: 'Juan Damian Ortega de Luna',  
      textoFrente: 'Entrenador Profesional', 
      trasera: 'Aqui me encuentras...', 
      imagen: 'assets/img/damian.jpg',
      icons: [
        { class: 'fa-brands fa-instagram', url: 'https://www.instagram.com/damiannortega?igsh=cDN5ZnFoYjJhZXRj' },
        { class: 'fa-brands fa-twitter',url: 'https://x.com/Pushezz?t=ldCh7fwYbCVt8S8N8IcVVg&s=09' },
        { class: 'fa-brands fa-whatsapp', url: 'https://wa.me/1234567890' }
      ]
    }
  ];

}
