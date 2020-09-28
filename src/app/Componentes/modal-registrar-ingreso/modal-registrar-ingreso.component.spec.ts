import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarIngresoComponent } from './modal-registrar-ingreso.component';

describe('ModalRegistrarIngresoComponent', () => {
  let component: ModalRegistrarIngresoComponent;
  let fixture: ComponentFixture<ModalRegistrarIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistrarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
