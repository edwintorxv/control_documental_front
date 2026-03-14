import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoConfiabilidadListComponent } from './proceso-confiabilidad-table.component';

describe('ProcesoConfiabilidadListComponent', () => {
  let component: ProcesoConfiabilidadListComponent;
  let fixture: ComponentFixture<ProcesoConfiabilidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoConfiabilidadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoConfiabilidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
