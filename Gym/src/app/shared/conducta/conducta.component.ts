import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-conducta',
  imports: [MatCardModule, MatIconModule, MatListModule, MatDividerModule, MatTooltipModule],
  templateUrl: './conducta.component.html',
  styleUrl: './conducta.component.css'
})
export class ConductaComponent {

}
