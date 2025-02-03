import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllDishCompComponent } from './get-all-dish-comp.component';
import { IDish } from 'dish';

describe('GetAllDishCompComponent', () => {
  let component: GetAllDishCompComponent;
  let fixture: ComponentFixture<GetAllDishCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllDishCompComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetAllDishCompComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dishes', [{
      "id": 13,
      "nombre": "Arroz Blanco",
      "descripcion": "Rico arroz blanco en su punto",
      "precio": 5000.0,
      "tipo": "COMUN",
      "idMenu": 8
    } as IDish]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the update button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const updateButtons = compiled.querySelectorAll('.get-all-dish__button');

    expect(updateButtons.length).toBeGreaterThan(0);
    expect(updateButtons[0].textContent?.trim()).toBe('Actualizar');
  });


  it('should display the delete button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButtons = compiled.querySelectorAll('.get-all-dish__button--secundary');

    expect(deleteButtons.length).toBeGreaterThan(0);
    expect(deleteButtons[0].textContent?.trim()).toBe('Eliminar');
  });

  it('should display the dish type', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dishTypeCell = compiled.querySelector('td[role="cell"]:nth-child(5)');
    expect(dishTypeCell?.textContent?.trim()).toBe('COMUN');
  });

});
