import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormTemplateComponent } from './admin-form-template.component';

describe('AdminFormTemplateComponent', () => {
  let component: AdminFormTemplateComponent;
  let fixture: ComponentFixture<AdminFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFormTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
