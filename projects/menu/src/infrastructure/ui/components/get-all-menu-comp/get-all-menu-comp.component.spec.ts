import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMenuCompComponent } from './get-all-menu-comp.component';
import { IMenu } from '../../../../domain/model/menu.model';

describe('GetAllMenuCompComponent', () => {
  let component: GetAllMenuCompComponent;
  let fixture: ComponentFixture<GetAllMenuCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllMenuCompComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetAllMenuCompComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('menus', [{
      "id": 8,
      "nombre": "Menú Sencillo ",
      "platos": [
        {
          "id": 13,
          "nombre": "Arroz Blanco",
          "descripcion": "Rico arroz blanco en su punto",
          "precio": 5000.0,
          "tipo": "COMUN",
          "idMenu": 8
        },
        {
          "id": 14,
          "nombre": "Arepa de Huevo",
          "descripcion": "Arepa frita rellena de huevo y carne",
          "precio": 3500.0,
          "tipo": "COMUN",
          "idMenu": 8
        }
      ]
    } as IMenu]);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the update button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const updateButtons = compiled.querySelectorAll('.get-all-menu__button');

    expect(updateButtons.length).toBeGreaterThan(0);
    expect(updateButtons[0].textContent?.trim()).toBe('Actualizar');
  });


  it('should display the delete button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButtons = compiled.querySelectorAll('.get-all-menu__button--secundary');

    expect(deleteButtons.length).toBeGreaterThan(0);
    expect(deleteButtons[0].textContent?.trim()).toBe('Eliminar');
  });


});
