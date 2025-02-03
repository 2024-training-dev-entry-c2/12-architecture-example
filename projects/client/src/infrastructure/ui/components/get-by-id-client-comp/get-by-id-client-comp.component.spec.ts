import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdClientCompComponent } from './get-by-id-client-comp.component';
import { IClient } from '../../../../domain/model/client.model';

describe('GetByIdClientCompComponent', () => {
  let component: GetByIdClientCompComponent;
  let fixture: ComponentFixture<GetByIdClientCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdClientCompComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetByIdClientCompComponent);
    component = fixture.componentInstance;

    component.client = {
      "id": 3,
      "nombre": "Carlos cuadrado",
      "cedula": "1004879850",
      "correo": "carlos@gmail.com",
      "telefono": "3103682617",
      "tipo": "COMUN"
  } as IClient;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name', () => {
    const compiled = fixture.nativeElement;
    const clientNameElement = compiled.querySelector('.get-by-id-client-info__item');

    expect(clientNameElement.textContent).toContain(`Nombre: ${component.client.nombre}`);
  });

});
