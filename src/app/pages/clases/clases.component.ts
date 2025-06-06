import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Clase } from '../../models/clase.model';
import { ClasesService } from '../../services/clases.service';
import { BuscadorComponent } from '../../shared/buscador/buscador.component';
import { Subscription } from 'rxjs';
import { PauseService } from '../../services/pause.service';

@Component({
  selector: 'app-clases',
  imports: [RouterModule, CommonModule, BuscadorComponent],
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit, OnDestroy {
  clasesDestacadas: Clase[] = [];
  clasesOriginales: Clase[] = [];
  isSpeaking = false; // Control si el lector está activado
  currentUtterance: SpeechSynthesisUtterance | null = null; // Instancia de la lectura
  private pauseSubscription: Subscription = new Subscription();  // Inicializamos con un nuevo Subscription

  constructor(private clasesService: ClasesService, private pauseService: PauseService) { }

  ngOnInit(): void {
    this.clasesService.getClases().subscribe((data) => {
      this.clasesDestacadas = data;
      this.clasesOriginales = data;
    });

    // Suscribirse al estado de pausa
    this.pauseSubscription = this.pauseService.pauseState$.subscribe(isPaused => {
      this.isSpeaking = !isPaused; // Si está pausado, no leer
      if (isPaused) {
        // Si la voz está pausada, cancelamos cualquier síntesis en curso
        speechSynthesis.cancel();
        this.currentUtterance = null;
      }
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse cuando el componente se destruya
    if (this.pauseSubscription) {
      this.pauseSubscription.unsubscribe();
    }
  }

  filtrarClases(termino: string): void {
    if (!termino.trim()) {
      this.clasesDestacadas = this.clasesOriginales; // Restaurar si vacío
    } else {
      this.clasesDestacadas = this.clasesOriginales.filter(clase =>
        clase.nombre.toLowerCase().includes(termino.toLowerCase())
      );
    }
  }

  leerNombreClase(event: MouseEvent) {
    // Solo leer si el lector está activado y no está pausado
    if (!this.isSpeaking || speechSynthesis.paused) return; // No leer si está pausado

    const target = event.currentTarget as HTMLElement;
    const nombre = target.getAttribute('data-nombre');

    if (!nombre) return; // Si no tiene nombre, no hacer nada

    this.speakText(nombre);
  }

  speakText(text: string) {
    // Detener cualquier lectura anterior si existe
    if (this.currentUtterance) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voz = speechSynthesis.getVoices().find(v => v.name === 'Microsoft Sabina') ||
      speechSynthesis.getVoices().find(v => v.lang.startsWith('es'));

    utterance.voice = voz || null;
    utterance.rate = 1;
    utterance.pitch = 1.1;

    this.currentUtterance = utterance;

    // Iniciar la síntesis de voz
    speechSynthesis.speak(utterance);
  }
}
