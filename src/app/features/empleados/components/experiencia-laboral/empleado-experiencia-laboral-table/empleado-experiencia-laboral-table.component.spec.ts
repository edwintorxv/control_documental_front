import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoExperienciaLaboralTableComponent } from './empleado-experiencia-laboral-table.component';

describe('EmpleadoExperienciaLaboralTableComponent', () => {
  let component: EmpleadoExperienciaLaboralTableComponent;
  let fixture: ComponentFixture<EmpleadoExperienciaLaboralTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoExperienciaLaboralTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoExperienciaLaboralTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
