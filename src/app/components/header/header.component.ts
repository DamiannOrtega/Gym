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
  isPaused = false;

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  // Toggle menú accesibilidad
  toggleAccMenu() {
    this.showAccMenu = !this.showAccMenu;
  }

  // Lector de pantalla
  startOrPauseReading() {
    if (!this.utterance) {
      const texto = document.body.innerText;
      this.utterance = new SpeechSynthesisUtterance(texto);
      const voces = speechSynthesis.getVoices();
      const vozFemenina = voces.find(v =>
        v.lang.startsWith('es') &&
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('mujer'))
      );
      this.utterance.voice = vozFemenina || voces.find(v => v.lang.startsWith('es')) || null;
      this.utterance.rate = 1;
      this.utterance.pitch = 1.1;
      speechSynthesis.speak(this.utterance);
      this.isSpeaking = true;
      this.isPaused = false;
    } else if (this.isPaused) {
      speechSynthesis.resume();
      this.isPaused = false;
    } else {
      speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  restartReading() {
    speechSynthesis.cancel(); // Detiene y limpia
    this.utterance = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.startOrPauseReading(); // Inicia de nuevo
  }

  setContraste(contraste: string) {
    const body = document.body;
    const appHome = document.querySelector('.app-home') as HTMLElement | null;

    body.classList.remove('contraste-alto', 'contraste-bajo');
    if (appHome) appHome.classList.remove('contraste-alto', 'contraste-bajo');

    if (contraste === 'alto') {
      body.classList.add('contraste-alto');
      if (appHome) appHome.classList.add('contraste-alto');
    } else if (contraste === 'bajo') {
      body.classList.add('contraste-bajo');
      if (appHome) appHome.classList.add('contraste-bajo');
    }
  }

  setFuente(fuente: string) {
    const body = document.body;
    const appHome = document.querySelector('.app-home') as HTMLElement | null;

    body.classList.remove('fuente-arial', 'fuente-verdana', 'fuente-roboto');
    if (appHome) appHome.classList.remove('fuente-arial', 'fuente-verdana', 'fuente-roboto');

    if (fuente) {
      body.classList.add('fuente-' + fuente);
      if (appHome) appHome.classList.add('fuente-' + fuente);
    }
  }

  setFontSize(size: string) {
    this.fontSize = +size;
    document.documentElement.style.setProperty('--font-size-base', this.fontSize + 'px');
    document.body.style.fontSize = this.fontSize + 'px';
    const appHome = document.querySelector('.app-home') as HTMLElement | null;
    if (appHome) {
      appHome.style.fontSize = this.fontSize + 'px';
    }
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
