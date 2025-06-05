import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PauseService {

  private pauseSubject = new Subject<boolean>();
  pauseState$ = this.pauseSubject.asObservable();

  constructor() { }

  togglePause(state: boolean) {
    this.pauseSubject.next(state); // Emite el estado de pausa
  }
}
