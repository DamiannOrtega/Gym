import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class QrService {
  private apiUrl = 'http://localhost:3000/api/generar-qr'; // Asegúrate que esta URL coincida con tu backend

  constructor(private http: HttpClient) {}

  generarQR(datos: any): Observable<{ qr: string }> {
    return this.http.post<{ qr: string }>(this.apiUrl, datos);
  }
}
