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
      textoFrente: 'Follow me for more...', 
      trasera: 'Follow Me', 
      icons: [
        { class: 'fa-brands fa-instagram' },
        { class: 'fa-brands fa-twitter' },
        { class: 'fa-brands fa-whatsapp' }
      ]
    },
    { 
      id: 2, 
      titulo: 'Alan Gael Gallardo Jimenez', 
      textoFrente: 'Learn more about me...', 
      trasera: 'Connect', 
      icons: [
        { class: 'fa-brands fa-instagram' },
        { class: 'fa-brands fa-twitter' },
        { class: 'fa-brands fa-whatsapp' }
      ]
    },
    { 
      id: 3, 
      titulo: 'Juan Damian Ortega de Luna',  
      textoFrente: 'lorem lorem loremloremvloremvloremloremloremloremloremloremloremloremlorem', 
      trasera: 'Explore', 
      icons: [
        { class: 'fa-brands fa-instagram' },
        { class: 'fa-brands fa-twitter' },
        { class: 'fa-brands fa-whatsapp' }
      ]
    }
  ];

}
