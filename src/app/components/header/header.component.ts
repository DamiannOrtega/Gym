import { Component, HostListener } from '@angular/core';
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
  hoverLecturaActiva = true;


  constructor(public authService: AuthService) {
    speechSynthesis.onvoiceschanged = () => {
      const voces = speechSynthesis.getVoices();
      console.log('VOCES DISPONIBLES:');
      voces.forEach((v, i) => {
        console.log(`${i}: ${v.name} - ${v.lang}`);
      });
    };

  }

  logout() {
    this.authService.logout();
  }
  get estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  get esAdmin(): boolean {
    return this.authService.getRol() === 'admin';
  }

  get nombreUsuario(): string {
    return this.authService.getNombreMostrado();
  }

  // Toggle menú accesibilidad
  toggleAccMenu() {
    this.showAccMenu = !this.showAccMenu;
  }

  // Lector de pantalla
  async startOrPauseReading() {
    if (!this.utterance) {
      // Elimina íconos del texto antes de leer
      const bodyClone = document.body.cloneNode(true) as HTMLElement;
      bodyClone.querySelectorAll('mat-icon, i').forEach(icon => icon.remove());
      const texto = bodyClone.innerText;

      this.utterance = new SpeechSynthesisUtterance(texto);

      const vocesDisponibles = await this.getVocesCargadas();
      const vozFemenina = vocesDisponibles.find(v => v.name === 'Microsoft Sabina');
      this.utterance.voice = vozFemenina || vocesDisponibles.find(v => v.lang.startsWith('es')) || null;

      this.utterance.rate = 1;
      this.utterance.pitch = 1.1;

      // Cuando termina la lectura completa
      this.utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.utterance = null;
        this.hoverLecturaActiva = true; // ✅ Reactiva lectura por mouse al terminar
      };

      speechSynthesis.cancel();
      speechSynthesis.speak(this.utterance);
      this.isSpeaking = true;
      this.isPaused = false;
      this.hoverLecturaActiva = false; // ❌ Desactiva lectura por mouse mientras habla

    } else if (this.isPaused) {
      speechSynthesis.resume();
      this.isPaused = false;
      this.hoverLecturaActiva = false; // ❌ Sigue desactivado mientras reanuda

    } else {
      speechSynthesis.pause();
      this.isPaused = true;
      this.hoverLecturaActiva = false; // ✅ NO permitir hover cuando está pausado
    }
  }


  restartReading() {
    speechSynthesis.cancel(); // Detiene y limpia
    this.utterance = null;
    this.isSpeaking = false;
    this.isPaused = false;
    this.hoverLecturaActiva = false; // ❌ Se desactiva hover al reiniciar
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

  getVocesCargadas(): Promise<SpeechSynthesisVoice[]> {
    return new Promise(resolve => {
      const voces = speechSynthesis.getVoices();
      if (voces.length) {
        resolve(voces);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          resolve(speechSynthesis.getVoices());
        };
      }
    });
  }

  @HostListener('document:mouseover', ['$event'])
  leerElementoConMouse(event: MouseEvent) {
    if (this.isPaused) return; // ❗️Esto es lo importante

    const target = event.target as HTMLElement;
    if (!target) return;

    if (target.tagName === 'MAT-ICON' || target.tagName === 'I') return;

    const elemento = target.closest('a, button');

    if (elemento) {
      const texto = Array.from(elemento.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent?.trim() || '')
        .join(' ')
        .trim();

      if (texto && texto.length > 0) {
        const u = new SpeechSynthesisUtterance(texto);
        const voz = speechSynthesis.getVoices().find(v => v.name === 'Microsoft Sabina') ||
          speechSynthesis.getVoices().find(v => v.lang.startsWith('es'));

        u.voice = voz || null;
        u.rate = 1;
        u.pitch = 1.1;

        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      }
    }
  }

}
