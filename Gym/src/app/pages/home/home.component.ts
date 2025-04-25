import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassCardComponent } from '../../shared/class-card/class-card.component';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { HeroComponent } from '../../shared/hero/hero.component';
import { TestimonioCardComponent } from '../../shared/testimonio-card/testimonio-card.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule,RouterModule,ClassCardComponent,CarouselComponent,HeroComponent,TestimonioCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   
}
