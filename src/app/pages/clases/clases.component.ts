import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Clase } from '../../models/clase.model';
import { ClasesService } from '../../services/clases.service';
import { BuscadorComponent } from '../../shared/buscador/buscador.component';

@Component({
  selector: 'app-clases',
  imports: [RouterModule, CommonModule, BuscadorComponent],
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']

})
export class ClasesComponent {
  clasesDestacadas: Clase[] = [];
  clasesOriginales: Clase[] = [];
  constructor(private clasesService: ClasesService) { }

  ngOnInit(): void {
    this.clasesService.getClases().subscribe((data) => {
      this.clasesDestacadas = data;
      this.clasesOriginales = data;
    });
  }

  filtrarClases(termino: string): void {
    if (!termino.trim()) {
      this.clasesDestacadas = this.clasesOriginales; // restaurar si vacío
    } else {
      this.clasesDestacadas = this.clasesOriginales.filter(clase =>
        clase.nombre.toLowerCase().includes(termino.toLowerCase())
      );
    }
  }

  leerNombreClase(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const nombre = target.getAttribute('data-nombre');

    // Si ya está pausado o vacío, no leer
    if (!nombre || speechSynthesis.paused) return;

    const utterance = new SpeechSynthesisUtterance(nombre);
    const voz = speechSynthesis.getVoices().find(v => v.name === 'Microsoft Sabina') ||
      speechSynthesis.getVoices().find(v => v.lang.startsWith('es'));

    utterance.voice = voz || null;
    utterance.rate = 1;
    utterance.pitch = 1.1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }


}
