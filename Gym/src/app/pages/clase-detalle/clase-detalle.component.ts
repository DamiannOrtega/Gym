import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clase-detalle',
  imports: [],
  templateUrl: './clase-detalle.component.html',
  styleUrl: './clase-detalle.component.css'
})
export class ClaseDetalleComponent {
  idClase: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idClase = this.route.snapshot.paramMap.get('id');
    console.log('ID de la clase:', this.idClase);
    // Aquí puedes usar el id para cargar la info real
  }
}
