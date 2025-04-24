import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-admin-form-reactive',
  imports: [CommonModule],
  templateUrl: './admin-form-reactive.component.html',
})
export class AdminFormReactiveComponent implements OnInit {
  datosArray: any[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.datosArray = this.storage.get<any>('formularioReactive');
  }

  eliminar(index: number) {
    this.datosArray.splice(index, 1);
    this.storage.set('formularioReactive', this.datosArray);
  }
}
