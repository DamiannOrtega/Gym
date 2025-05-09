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
      titulo: 'Profile', 
      frente: 'Front Card', 
      textoFrente: 'Follow me for more...', 
      trasera: 'Follow Me', 
      icons: [
        { class: 'bi bi-instagram', path: 'M8 0C5.829 0 5.556.01 4.703.048...' },
        { class: 'bi bi-twitter-x', path: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937...' },
        { class: 'bi bi-whatsapp', path: 'M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0.068...' }
      ]
    },
    { 
      id: 2, 
      titulo: 'About Me', 
      frente: 'Hello!', 
      textoFrente: 'Learn more about me...', 
      trasera: 'Connect', 
      icons: [
        { class: 'bi bi-facebook', path: 'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-...' },
        { class: 'bi bi-linkedin', path: 'M0 1.146C0 .513.42.001 1.057.001h13.885...' }
      ]
    },
    { 
      id: 3, 
      titulo: 'Projects', 
      frente: 'My Work', 
      textoFrente: 'Check out my projects...', 
      trasera: 'Explore', 
      icons: [
        { class: 'bi bi-github', path: 'M8 0C3.58 0 0 3.582 0 8c0 3.539 2.29 6.533...' },
        { class: 'bi bi-code', path: 'M0 1.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v13a.5...' }
      ]
    }
  ];

}
