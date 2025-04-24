import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormReactiveComponent } from './admin-form-reactive.component';

describe('AdminFormReactiveComponent', () => {
  let component: AdminFormReactiveComponent;
  let fixture: ComponentFixture<AdminFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormReactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
