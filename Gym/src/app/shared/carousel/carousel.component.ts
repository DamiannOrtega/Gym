import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  galeria = [
    '/assets/img/gym1.jpg',
    '/assets/img/carlitos.jpg',
    '/assets/img/gym2.jpg',
    '/assets/img/gym3.jpg',
  ];
}
