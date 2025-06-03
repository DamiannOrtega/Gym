import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  agregarDato(nombreColeccion: string, data: any) {
    const ref = collection(this.firestore, nombreColeccion);
    return addDoc(ref, data);
  }

  obtenerDatos(nombreColeccion: string): Observable<any[]> {
    const ref = collection(this.firestore, nombreColeccion);
    return collectionData(ref, { idField: 'id' });
  }
}
