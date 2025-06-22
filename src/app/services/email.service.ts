import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private apiUrl = 'https://gymnodejs-2.onrender.com/api/enviar-correo';

  constructor(private http: HttpClient) {}

  enviarCorreo(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
