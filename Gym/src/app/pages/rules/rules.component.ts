import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule, MatDividerModule, MatTooltipModule],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {
  reglas = [
    {
      titulo: 'Diseño Consistente',
      icono: 'palette',
      puntos: [
        'Usar los mismos colores y tipografías.',
        'Mantener estructura visual en todas las vistas.',
        'Adaptabilidad responsive en todo el sitio.'
      ]
    },
    {
      titulo: 'Contenido Relevante',
      icono: 'notes',
      puntos: [
        'Cada sección debe tener información útil.',
        'Evitar contenido irrelevante o vacío.'
      ]
    },
    {
      titulo: 'Interacción Clara',
      icono: 'touch_app',
      puntos: [
        'Botones visibles y accesibles.',
        'Acciones del usuario deben ser intuitivas.'
      ]
    },
    {
      titulo: 'Optimización de Recursos',
      icono: 'bolt',
      puntos: [
        'Cargar imágenes optimizadas.',
        'Minimizar tiempos de carga.'
      ]
    },
    {
      titulo: 'Seguridad Básica',
      icono: 'security',
      puntos: [
        'Protección de datos básicos del usuario.',
        'Manejo adecuado de formularios.'
      ]
    }
  ];
}