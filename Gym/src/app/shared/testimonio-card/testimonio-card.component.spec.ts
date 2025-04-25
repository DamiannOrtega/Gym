import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonioCardComponent } from './testimonio-card.component';

describe('TestimonioCardComponent', () => {
  let component: TestimonioCardComponent;
  let fixture: ComponentFixture<TestimonioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
