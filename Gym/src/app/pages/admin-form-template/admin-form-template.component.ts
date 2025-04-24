import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-admin-form-template',
  imports: [CommonModule],
  templateUrl: './admin-form-template.component.html',
})
export class AdminFormTemplateComponent implements OnInit {
  datosArray: any[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.datosArray = this.storage.get<any>('formularioTemplate');
  }

  eliminar(index: number) {
    this.datosArray.splice(index, 1);
    this.storage.set('formularioTemplate', this.datosArray);
  }
}
