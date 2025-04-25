import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  
  faqs = [
    {
      pregunta: '¿Cuánto tiempo tardan en responder los mensajes?',
      respuesta: 'Respondemos en menos de 24 horas, ya sea por WhatsApp o correo electrónico.'
    },
    {
      pregunta: '¿Puedo cambiar mi clase después de inscribirme?',
      respuesta: 'Sí, puedes modificar tu inscripción comunicándote con nosotros directamente.'
    },
 
    {
      pregunta: '¿Puedo asistir a una clase de prueba antes de inscribirme?',
      respuesta: 'Sí, ofrecemos una clase de prueba gratuita. Solo contáctanos para agendarla.'
    },
    {
      pregunta: '¿Cuál es el horario de atención al público?',
      respuesta: 'Nuestro horario es de lunes a viernes de 7:00 a.m. a 9:00 p.m. y sábados de 8:00 a.m. a 2:00 p.m.'
    },
    {
      pregunta: '¿Qué pasa si falto a una clase?',
      respuesta: 'Puedes recuperarla otro día dentro de la misma semana, siempre que haya cupo disponible.'
    },
    {
      pregunta: '¿Necesito llevar algo para mis clases?',
      respuesta: 'Solo ropa cómoda, toalla personal y, si deseas, tu botella de agua.'
    }
  ];

}
