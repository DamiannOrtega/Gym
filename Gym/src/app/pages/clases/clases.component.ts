import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Clase } from '../../models/clase.model';
import { ClasesService } from '../../services/clases.service';
import { BuscadorComponent } from '../../shared/buscador/buscador.component';

@Component({
  selector: 'app-clases',
  imports: [RouterModule,CommonModule,BuscadorComponent],
  templateUrl: './clases.component.html',
 styleUrls: ['./clases.component.css']

})
export class ClasesComponent {
    clasesDestacadas: Clase[] = [];
    clasesOriginales: Clase[] = []; 
    constructor(private clasesService: ClasesService) {}

    ngOnInit(): void {
      this.clasesService.getClases().subscribe((data) => {
        this.clasesDestacadas = data;
        this.clasesOriginales = data; 
      });
    }
  
    filtrarClases(termino: string) {
      if (!termino.trim()) {
        this.clasesDestacadas = this.clasesOriginales; 
      } else {
        const terminoLower = termino.toLowerCase();
        this.clasesDestacadas = this.clasesOriginales.filter(clase =>
          clase.nombre.toLowerCase().includes(terminoLower)
          
        );
      }
    }

  

}
