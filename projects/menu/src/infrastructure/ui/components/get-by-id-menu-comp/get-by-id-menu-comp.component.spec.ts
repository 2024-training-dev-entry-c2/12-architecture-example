import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetByIdMenuCompComponent } from './get-by-id-menu-comp.component';
import { IMenu } from '../../../../domain/model/menu.model';

describe('GetByIdMenuCompComponent', () => {
  let component: GetByIdMenuCompComponent;
  let fixture: ComponentFixture<GetByIdMenuCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdMenuCompComponent]
    })
      .compileComponents();
      fixture = TestBed.createComponent(GetByIdMenuCompComponent);
      component = fixture.componentInstance;

    component.menu = {
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
  } as IMenu;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu name', () => {
    const compiled = fixture.nativeElement;
    const MenuNameElement = compiled.querySelector('h3');

    expect(MenuNameElement.textContent).toContain(component.menu.nombre);
  });

});
