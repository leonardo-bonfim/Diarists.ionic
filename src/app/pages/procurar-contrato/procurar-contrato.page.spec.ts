import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurarContratoPage } from './procurar-contrato.page';

describe('ProcurarContratoPage', () => {
  let component: ProcurarContratoPage;
  let fixture: ComponentFixture<ProcurarContratoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurarContratoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurarContratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
