import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueoComponent } from './bloqueo.component';

describe('BloqueoComponent', () => {
  let component: BloqueoComponent;
  let fixture: ComponentFixture<BloqueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
