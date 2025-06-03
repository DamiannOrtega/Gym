import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  CollectionReference,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  // Agrega un documento a la colección
  agregarDato(nombreColeccion: string, data: any) {
    const ref = collection(this.firestore, nombreColeccion);
    return addDoc(ref, data);
  }

  // Obtiene todos los documentos de una colección
  obtenerDatos(nombreColeccion: string): Observable<any[]> {
    const ref = collection(this.firestore, nombreColeccion);
    return collectionData(ref, { idField: 'id' });
  }

  // Obtiene documentos filtrados por campo usando where()
  getPorCampo(coleccion: string, campo: string, valor: any): Observable<any[]> {
    const ref = collection(this.firestore, coleccion);
    const q = query(ref, where(campo, '==', valor));
    return collectionData(q, { idField: 'id' });
  }
}
