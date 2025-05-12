import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {


  // Nos permite crear un solo componente FaqComponent que puede recibir diferentes listas de preguntas, en lugar de duplicar el código para cada tipo de preguntas
  @Input() faqs: { pregunta: string; respuesta: string }[] = [];

}
