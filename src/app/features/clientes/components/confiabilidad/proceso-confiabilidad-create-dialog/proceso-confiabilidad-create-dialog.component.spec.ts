import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteConfiabilidadEmpleadosDialogComponent } from './proceso-confiabilidad-create-dialog.component';

describe('ClienteConfiabilidadEmpleadosDialogComponent', () => {
  let component: ClienteConfiabilidadEmpleadosDialogComponent;
  let fixture: ComponentFixture<ClienteConfiabilidadEmpleadosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteConfiabilidadEmpleadosDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteConfiabilidadEmpleadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
