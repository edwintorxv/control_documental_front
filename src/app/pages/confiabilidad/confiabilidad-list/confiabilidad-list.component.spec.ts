import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiabilidadListComponent } from './confiabilidad-list.component';

describe('ConfiabilidadListComponent', () => {
  let component: ConfiabilidadListComponent;
  let fixture: ComponentFixture<ConfiabilidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiabilidadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiabilidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
