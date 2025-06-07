import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QrService {
  private apiUrl = 'http://localhost:3000/api/generar-qr'; // Asegúrate que esta URL coincida con tu backend

  constructor(private http: HttpClient) {}

  generarQRDesdeFirebase(id: string): Observable<{ qr: string; datos: any }> {
    return this.http.get<{ qr: string; datos: any }>(`${this.apiUrl}/${id}`);
  }
  
}

