import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoConfiabilidadCreateDialogComponent } from './proceso-confiabilidad-create-dialog.component';

describe('ProcesoConfiabilidadCreateDialogComponent', () => {
  let component: ProcesoConfiabilidadCreateDialogComponent;
  let fixture: ComponentFixture<ProcesoConfiabilidadCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoConfiabilidadCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoConfiabilidadCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
