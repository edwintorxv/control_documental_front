import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDocumentosTableComponent } from './empleado-documentos-table.component';

describe('EmpleadoDocumentosTableComponent', () => {
  let component: EmpleadoDocumentosTableComponent;
  let fixture: ComponentFixture<EmpleadoDocumentosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoDocumentosTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoDocumentosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
