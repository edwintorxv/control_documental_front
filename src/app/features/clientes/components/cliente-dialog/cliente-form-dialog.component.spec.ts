import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormDialogComponent } from './cliente-form-dialog.component';

describe('ClienteDialogComponent', () => {
  let component: ClienteFormDialogComponent;
  let fixture: ComponentFixture<ClienteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
