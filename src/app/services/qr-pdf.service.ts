import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class QrPdfService {
  generarPDF(inscripcion: any, qrBase64: string): void {
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(20);
    doc.text('Comprobante de Inscripción - FitZone', 20, 20);

    // Datos con estilo de tabla
    autoTable(doc, {
      startY: 30,
      head: [['Campo', 'Valor']],
      body: [
        ['Nombre', inscripcion.nombre],
        ['Correo', inscripcion.email],
        ['Clase', inscripcion.clase],
        ['Turno', inscripcion.turno],
        ['Días', Array.isArray(inscripcion.dias) ? inscripcion.dias.join(', ') : inscripcion.dias],
        ['Fecha inicio', inscripcion.fecha],
        ['Precio', `$${inscripcion.precio}`],
        ['Fecha de registro', inscripcion.fechaRegistro]
      ],
      styles: {
        fillColor: [40, 40, 60],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
        textColor: 0
      }
    });

    // Agregar QR
    const qrY = (doc as any).lastAutoTable.finalY + 20;
    doc.text('Código QR de tu inscripción:', 20, qrY);
    doc.addImage(qrBase64, 'PNG', 20, qrY + 5, 70, 70);

    // Descargar el PDF
    const fileName = `Inscripcion_FitZone_${inscripcion.nombre.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
  }
}
