import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Clase } from '../models/clase.model';


@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  private clasesUrl = '/json/clases.json';

  constructor(private http: HttpClient) {}

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.clasesUrl);
  }

  getClasePorId(id: number): Observable<Clase | undefined> {
    return this.getClases().pipe(
      map(clases => clases.find(c => c.id === id))
    );
  }
}
