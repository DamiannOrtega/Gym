import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Clase } from '../../models/clase.model';
import { ClasesService } from '../../services/clases.service';

@Component({
  selector: 'app-clases',
  imports: [RouterModule,CommonModule],
  templateUrl: './clases.component.html',
 styleUrls: ['./clases.component.css']

})
export class ClasesComponent {
    clasesDestacadas: Clase[] = [];

    constructor(private clasesService: ClasesService) {}

    ngOnInit(): void {
      this.clasesService.getClases().subscribe((data) => {
        this.clasesDestacadas = data;
      });

  

  }
}