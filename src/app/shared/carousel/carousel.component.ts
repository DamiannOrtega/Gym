import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  galeria = [
    '/assets/img/img01.png',
    '/assets/img/img02.png',
    '/assets/img/img03.png',
  ];
}
