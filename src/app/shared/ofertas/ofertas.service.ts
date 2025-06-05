import { Injectable, signal } from '@angular/core';

export interface Oferta {
  texto: string;
  visible: boolean;
  tipo?: string; // "normal" o "contador"
}

@Injectable({ providedIn: 'root' })
export class OfertasService {
  private ofertasSignal = signal<Oferta[]>([
    { texto: 'Oferta de hoy: 20% de descuento en Yoga', visible: true, tipo: 'normal' },
    { texto: 'Oferta del mes: 2x1 en clases de CrossFit', visible: true, tipo: 'normal' },
    { texto: 'Inscripción gratis en Body Pump', visible: true, tipo: 'contador' } 
  ]);

   // Señal compartida para el contador de la oferta con tiempo limitado
  public contadorSignal = signal<number>(15 * 60); // 25 minutos en segundos

  get ofertas() {
    return this.ofertasSignal;
  }

  ocultarOferta(indice: number) {
    const ofertas = [...this.ofertasSignal()];
    ofertas[indice] = { ...ofertas[indice], visible: false };
    this.ofertasSignal.set(ofertas);

    // Detener el contador solo si la oferta que se cierra es la del "contador"
    if (ofertas[indice].tipo === 'contador') {
      this.contadorSignal.set(0); // Detener el contador
    }
  }

  // Método para iniciar el contador
  iniciarContador() {
    const intervalo = setInterval(() => {
      const tiempoRestante = this.contadorSignal();
      if (tiempoRestante > 0) {
        this.contadorSignal.set(tiempoRestante - 1);
      } else {
        clearInterval(intervalo); // Detener el contador cuando llegue a 0
      }
    }, 1000);
  }
}
