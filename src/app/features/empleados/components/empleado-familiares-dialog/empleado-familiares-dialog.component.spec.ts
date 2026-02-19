import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFamiliaresDialogComponent } from './empleado-familiares-dialog.component';

describe('EmpleadoFamiliaresDialogComponent', () => {
  let component: EmpleadoFamiliaresDialogComponent;
  let fixture: ComponentFixture<EmpleadoFamiliaresDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoFamiliaresDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoFamiliaresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
