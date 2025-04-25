import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClasesService } from '../../services/clases.service';
import { Clase } from '../../models/clase.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clase-detalle',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './clase-detalle.component.html',
  styleUrl: './clase-detalle.component.css'
})
export class ClaseDetalleComponent {
  idClase: string | null = null;
  clase: Clase | undefined;
  

  constructor(private route: ActivatedRoute, private clasesService: ClasesService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', id); // 👈 esto te dice si recibe bien el ID
  
    this.clasesService.getClases().subscribe(clases => {
      const encontrada = clases.find(c => c.id === id);
      console.log('Clase encontrada:', encontrada); // 👈 esto te dice si se encontró la clase
      this.clase = encontrada;
    });
  }
  
  
}
