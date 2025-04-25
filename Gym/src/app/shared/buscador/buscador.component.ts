import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  @Output() buscar = new EventEmitter<string>();

  onInput(event: Event) {
    const texto = (event.target as HTMLInputElement).value;
    this.buscar.emit(texto);
  }

}
