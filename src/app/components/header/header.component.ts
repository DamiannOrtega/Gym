import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  logo = 'assets/img/Logo2.png';



  // Variables para accesibilidad
  showAccMenu = false;
  fontSize = 16;
  utterance: SpeechSynthesisUtterance | null = null;
  isSpeaking = false;

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  // Toggle menú accesibilidad
  toggleAccMenu() {
    this.showAccMenu = !this.showAccMenu;
  }

  // Lector de pantalla
  startReading() {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz');
      return;
    }
    const mainContent = document.querySelector('main')?.textContent?.trim();
    if (!mainContent) {
      alert('No hay contenido para leer');
      return;
    }
    this.utterance = new SpeechSynthesisUtterance(mainContent);
    speechSynthesis.speak(this.utterance);
    this.isSpeaking = true;
    this.utterance.onend = () => {
      this.isSpeaking = false;
    };
  }

  pauseReading() {
    if (this.isSpeaking) {
      speechSynthesis.pause();
    }
  }

  resumeReading() {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }

  stopReading() {
    speechSynthesis.cancel();
    this.isSpeaking = false;
  }

  setContraste(contraste: string) {
    const body = document.body;
    body.classList.remove('contraste-alto', 'contraste-bajo');
    if (contraste === 'alto') {
      body.classList.add('contraste-alto');
    } else if (contraste === 'bajo') {
      body.classList.add('contraste-bajo');
    }
  }


  setFuente(fuente: string) {
    const body = document.body;
    body.classList.remove('fuente-arial', 'fuente-verdana', 'fuente-roboto');
    if (fuente) {
      body.classList.add('fuente-' + fuente);
    }
  }


  setFontSize(size: string) {
    this.fontSize = +size;
    document.documentElement.style.setProperty('--font-size-base', this.fontSize + 'px');
    document.body.style.fontSize = this.fontSize + 'px'; // Aplica font-size inline a body para asegurar efecto
  }



  onFuenteChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setFuente(value);
  }

  onContrasteChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setContraste(value);
  }

  onFontSizeChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.setFontSize(value);
  }
}
