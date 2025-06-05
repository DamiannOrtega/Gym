import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClasesService } from '../../services/clases.service';
import { Clase } from '../../models/clase.model';
import { CommonModule } from '@angular/common';
import { ObjetivoResaltadoPipe } from '../../pipes/objetivo-resaltado.pipe';

@Component({
  selector: 'app-clase-detalle',
  standalone: true,
  imports: [CommonModule,RouterModule, ObjetivoResaltadoPipe],
  templateUrl: './clase-detalle.component.html',
  styleUrl: './clase-detalle.component.css'
})
export class ClaseDetalleComponent implements AfterViewInit {
  idClase: string | null = null;
  clase: Clase | undefined;
  

  constructor(private route: ActivatedRoute, private clasesService: ClasesService) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

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
