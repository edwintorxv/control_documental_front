import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoConfiabilidadDialogComponent } from './empleado-confiabilidad-dialog.component';

describe('EmpleadoConfiabilidadDialogComponent', () => {
  let component: EmpleadoConfiabilidadDialogComponent;
  let fixture: ComponentFixture<EmpleadoConfiabilidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoConfiabilidadDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoConfiabilidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
