import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFamiliaresTableComponent } from './empleado-familiares-table.component';

describe('EmpleadoFamiliaresTableComponent', () => {
  let component: EmpleadoFamiliaresTableComponent;
  let fixture: ComponentFixture<EmpleadoFamiliaresTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoFamiliaresTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoFamiliaresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
