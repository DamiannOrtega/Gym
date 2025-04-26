import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConductaComponent } from '../../shared/conducta/conducta.component';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule, MatDividerModule, MatTooltipModule,ConductaComponent],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {
  reglas = [
    {
      titulo: 'Respeto y Compañerismo',
      icono: 'groups',
      puntos: [
        'Trata a todos los miembros con respeto y cortesía.',
        'Evita lenguaje ofensivo o actitudes negativas en el gimnasio.',
        'Respeta los turnos en las máquinas y equipos.'
      ]
    },
    {
      titulo: 'Uso Responsable del Equipo',
      icono: 'fitness_center',
      puntos: [
        'Limpia las máquinas y mancuernas después de usarlas.',
        'Regresa los accesorios a su lugar correspondiente.',
        'Reporta cualquier daño o mal funcionamiento de los equipos.'
      ]
    },
    {
      titulo: 'Higiene Personal',
      icono: 'clean_hands',
      puntos: [
        'Usa toalla personal para cubrir máquinas y bancos.',
        'Lleva ropa y calzado adecuado para entrenar.',
        'Evita entrenar si presentas síntomas de enfermedad.'
      ]
    },
    {
      titulo: 'Control del Volumen',
      icono: 'volume_up',
      puntos: [
        'Mantén tu música personal a un volumen moderado.',
        'De preferencia usar audifonos para colocar tu musica',
        'Respeta el ambiente de entrenamiento de los demás.'
      ]
    },
    {
      titulo: 'Normas de Seguridad',
      icono: 'security',
      puntos: [
        'Sigue las instrucciones de los coaches y del personal.',
        'No realices ejercicios peligrosos sin supervisión.',
        'Respeta los límites de tu cuerpo para evitar lesiones.'
      ]
    },
    {
      titulo: 'Cuidado de las Instalaciones',
      icono: 'delete',
      puntos: [
        'Deposita la basura en los contenedores asignados.',
        'No ingieras alimentos dentro de las áreas de entrenamiento.',
        'Mantén las áreas comunes limpias y ordenadas.'
      ]
    }
  ];
}
