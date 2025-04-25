import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opiniones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent {
  opiniones = [
    { nombre: 'Ana Torres', estrellas: 5, mensaje: '¡Me encantó el ambiente y las clases de zumba!' },
    { nombre: 'Luis García', estrellas: 4, mensaje: 'Muy buenos entrenadores y atención al cliente.' },
    { nombre: 'Carla Ruiz', estrellas: 5, mensaje: 'Me siento súper motivada. ¡Recomendado 100%!' },
    { nombre: 'Fernando Díaz', estrellas: 3, mensaje: 'Las máquinas están bien, pero podrían mejorar los vestidores.' },
    { nombre: 'Patricia Romero', estrellas: 5, mensaje: 'Excelente para entrenar en las mañanas. Muy organizado.' },
    { nombre: 'Jorge Méndez', estrellas: 4, mensaje: 'Las rutinas son exigentes pero efectivas.' },
    { nombre: 'Sofía León', estrellas: 5, mensaje: 'Nunca había sentido tanta energía positiva en un gym.' },
    { nombre: 'Diana Pérez', estrellas: 5, mensaje: 'Amo las clases de pilates, la instructora es muy profesional.' },
    { nombre: 'Alejandro Torres', estrellas: 4, mensaje: 'Ideal para entrenar después del trabajo.' },
    { nombre: 'Mónica Sánchez', estrellas: 5, mensaje: 'Todo muy limpio, moderno y con buena música.' },
    { nombre: 'Eduardo Ramírez', estrellas: 3, mensaje: 'Algunos horarios no me quedan, pero lo demás excelente.' },
    { nombre: 'Lucía Fernández', estrellas: 5, mensaje: '¡Qué gran experiencia! Me ayudaron con mi rutina personalizada.' },
    { nombre: 'Daniel Vargas', estrellas: 4, mensaje: 'Las instalaciones son geniales.' },
    { nombre: 'Valeria Morales', estrellas: 5, mensaje: '¡Recomendadísimo! Me encanta venir a entrenar.' },
    { nombre: 'Carlos Herrera', estrellas: 4, mensaje: 'Buen lugar para desconectar y entrenar con calma.' }
  ];

  crearArray(n: number): number[] {
    return Array.from({ length: n });
  }
  
}
