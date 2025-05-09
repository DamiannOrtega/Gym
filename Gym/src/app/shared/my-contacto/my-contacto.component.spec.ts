import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContactoComponent } from './my-contacto.component';

describe('MyContactoComponent', () => {
  let component: MyContactoComponent;
  let fixture: ComponentFixture<MyContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
