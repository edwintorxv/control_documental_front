import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoConfiabilidadUpdateDialogComponent } from './proceso-confiabilidad-update-dialog.component';

describe('ProcesoConfiabilidadUpdateDialogComponent', () => {
  let component: ProcesoConfiabilidadUpdateDialogComponent;
  let fixture: ComponentFixture<ProcesoConfiabilidadUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoConfiabilidadUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoConfiabilidadUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
