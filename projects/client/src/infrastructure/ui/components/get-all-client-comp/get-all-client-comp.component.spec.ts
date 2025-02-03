import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllClientCompComponent } from './get-all-client-comp.component';
import { IClient } from '../../../../domain/model/client.model';

describe('GetAllClientCompComponent', () => {
  let component: GetAllClientCompComponent;
  let fixture: ComponentFixture<GetAllClientCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllClientCompComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetAllClientCompComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('clients', [{
      "id": 3,
      "nombre": "Carlos cuadrado",
      "cedula": "1004879850",
      "correo": "carlos@gmail.com",
      "telefono": "3103682617",
      "tipo": "COMUN"
    } as IClient]);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the update button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const updateButtons = compiled.querySelectorAll('.get-all-client__button');

    expect(updateButtons.length).toBeGreaterThan(0);
    expect(updateButtons[0].textContent?.trim()).toBe('Actualizar');
  });


  it('should display the delete button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButtons = compiled.querySelectorAll('.get-all-client__button--secundary');

    expect(deleteButtons.length).toBeGreaterThan(0);
    expect(deleteButtons[0].textContent?.trim()).toBe('Eliminar');
  });

  it('should display the client email', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailCell = compiled.querySelector('td[role="cell"]:nth-child(4)');
    expect(emailCell?.textContent?.trim()).toBe('carlos@gmail.com');
  });


});
