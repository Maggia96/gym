import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagosComponent } from './modal-pagos.component';

describe('ModalPagosComponent', () => {
  let component: ModalPagosComponent;
  let fixture: ComponentFixture<ModalPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
