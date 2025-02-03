import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetByIdDishCompComponent } from './get-by-id-dish-comp.component';
import { IDish } from '../../../../domain/model/dish.model'
import { CurrencyPipe } from '@angular/common';

describe('GetByIdDishCompComponent', () => {
  let component: GetByIdDishCompComponent;
  let fixture: ComponentFixture<GetByIdDishCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdDishCompComponent,CurrencyPipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetByIdDishCompComponent);
    component = fixture.componentInstance;

    component.dish = {
      "id": 13,
      "nombre": "Arroz Blanco",
      "descripcion": "Rico arroz blanco en su punto",
      "precio": 5000.0,
      "tipo": "COMUN",
      "idMenu": 8
    } as IDish;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the description', () => {
    const compiled = fixture.nativeElement;
    const DishDescriptionElement = compiled.querySelector('li');

    expect(DishDescriptionElement.textContent).toContain(`Descripción: ${component.dish.descripcion}`);
  });

});
