import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  terminoBusqueda: string = '';

  @Output() buscar = new EventEmitter<string>();

  buscarClases(): void {
    this.buscar.emit(this.terminoBusqueda);
  }
}
