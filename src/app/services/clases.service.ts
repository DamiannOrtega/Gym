import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Clase } from '../models/clase.model';

// Decorador que marca esta clase como un servicio inyectable en Angular
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class ClasesService {
  // URL del archivo JSON que contiene los datos de las clases
  private clasesUrl = 'https://run.mocky.io/v3/7c64c463-a17b-46a5-8744-6ea3e76e392e';

  // Inyección del servicio HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todas las clases desde el archivo JSON
  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.clasesUrl); // Realiza una solicitud GET y devuelve un Observable con un array de clases
  }

  // Método para obtener una clase específica por su ID
  getClasePorId(id: number): Observable<Clase | undefined> {
    return this.getClases().pipe(
      // Utiliza el operador `map` para buscar la clase con el ID especificado
      map(clases => clases.find(c => c.id === id))
    );
  }
}
