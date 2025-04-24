import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseDetalleComponent } from './clase-detalle.component';

describe('ClaseDetalleComponent', () => {
  let component: ClaseDetalleComponent;
  let fixture: ComponentFixture<ClaseDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaseDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaseDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
