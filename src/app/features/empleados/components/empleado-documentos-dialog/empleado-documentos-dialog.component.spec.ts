import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDocumentosDialogComponent } from './empleado-documentos-dialog.component';

describe('EmpleadoDocumentosDialogComponent', () => {
  let component: EmpleadoDocumentosDialogComponent;
  let fixture: ComponentFixture<EmpleadoDocumentosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoDocumentosDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoDocumentosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
