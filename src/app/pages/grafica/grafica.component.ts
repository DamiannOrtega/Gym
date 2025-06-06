import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // plugin nuevo
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FirebaseService } from '../../services/firebase.service';

// Registro de componentes y plugin
Chart.register(ArcElement, Tooltip, Legend, PieController, ChartDataLabels);


@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit {

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
        '#4bc0c0', '#9966ff', '#ff9f40', '#8dd1e1',
        '#f67019', '#f53794', '#70cad1', '#845ec2'
      ],
      borderColor: '#1d3854',
      borderWidth: 1
    }]
  };

  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: 'Usuarios no Administradores',
        color: '#fff'
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 13
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels?.[context.dataIndex];
          return `${label}: ${value}`;
        }
      }
    }
  };


  ChartDataLabels: typeof ChartDataLabels = ChartDataLabels;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.obtenerDatos('usuarios').subscribe(usuarios => {
      const usuariosFiltrados = usuarios.filter(u => u.admin !== true);
      const conteoPorNombre: Record<string, number> = {};

      usuariosFiltrados.forEach(usuario => {
        const nombre = usuario.nombre ?? 'Sin nombre';
        conteoPorNombre[nombre] = (conteoPorNombre[nombre] || 0) + 1;
      });

      this.pieChartData.labels = Object.keys(conteoPorNombre);
      this.pieChartData.datasets[0].data = Object.values(conteoPorNombre);

      // 👇 Forzar actualización del gráfico
      setTimeout(() => {
        this.chart?.update();
      }, 0);
    });
  }


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;



}
