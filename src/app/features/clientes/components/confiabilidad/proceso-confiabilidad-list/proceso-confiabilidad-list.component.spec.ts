import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteConfiabilidadEmpleadosTableComponent } from './proceso-confiabilidad-list.component';

describe('ClienteConfiabilidadEmpleadosTableComponent', () => {
  let component: ClienteConfiabilidadEmpleadosTableComponent;
  let fixture: ComponentFixture<ClienteConfiabilidadEmpleadosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteConfiabilidadEmpleadosTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteConfiabilidadEmpleadosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
