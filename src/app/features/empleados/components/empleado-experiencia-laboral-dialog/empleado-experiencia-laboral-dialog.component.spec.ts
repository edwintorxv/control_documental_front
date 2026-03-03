import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoExperienciaLaboralDialogComponent } from './empleado-experiencia-laboral-dialog.component';

describe('EmpleadoExperienciaLaboralDialogComponent', () => {
  let component: EmpleadoExperienciaLaboralDialogComponent;
  let fixture: ComponentFixture<EmpleadoExperienciaLaboralDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoExperienciaLaboralDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoExperienciaLaboralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
