import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductaComponent } from './conducta.component';

describe('ConductaComponent', () => {
  let component: ConductaComponent;
  let fixture: ComponentFixture<ConductaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
