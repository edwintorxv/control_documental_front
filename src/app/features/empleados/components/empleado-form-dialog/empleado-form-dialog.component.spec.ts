import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFormDialogComponent } from './empleado-form-dialog.component';

describe('EmpleadoFormDialogComponent', () => {
  let component: EmpleadoFormDialogComponent;
  let fixture: ComponentFixture<EmpleadoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
