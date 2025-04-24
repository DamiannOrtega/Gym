import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule,RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  logo = 'assets/img/Logo.png';
  year = new Date().getFullYear();
}
