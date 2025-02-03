import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoComponentComponent } from './plato-component.component';
import { By } from '@angular/platform-browser';
import { IPlato } from '../../../../domain/model/platos.model';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PlatoComponentComponent', () => {
  let component: PlatoComponentComponent;
  let fixture: ComponentFixture<PlatoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoComponentComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatoComponentComponent);
    fixture.componentRef.setInput('platos', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No hay platos" when platos list is empty', () => {
    expect(component.platos()).toEqual([]);
    fixture.detectChanges();
    const noPlatosElement: DebugElement = fixture.debugElement.query(
      By.css('span')
    );
    expect(noPlatosElement.nativeElement.textContent).toContain(
      'No hay platos'
    );
  });

  it('should display a list of platos when platos list is not empty', () => {
    const platosList: IPlato[] = [
      {
        id: 1,
        nombre: 'Plato 1',
        precio: 10,
        urlImage: 'https://example.com/image1.png',
        idmenu: 0,
        tipoPlato: '',
      },
      {
        id: 2,
        nombre: 'Plato 2',
        precio: 20,
        urlImage: 'https://example.com/image2.png',
        idmenu: 0,
        tipoPlato: '',
      },
    ];
    fixture.componentRef.setInput('platos', platosList);
    fixture.detectChanges();
    const platoElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('lib-card')
    );
    expect(platoElements.length).toBe(platosList.length);
  });

  it('should emit selectedToDelete event when deleteMenu is called', () => {
    spyOn(component.selectedToDelete, 'emit');
    const platoId = 1;
    component.deleteMenu(platoId);
    expect(component.selectedToDelete.emit).toHaveBeenCalledWith(platoId);
  });

  it('should emit selectedToUpdate event when selectMenuToUpdate is called', () => {
    spyOn(component.selectedToUpdate, 'emit');
    const plato: IPlato = {
      id: 1,
      nombre: 'Plato 1',
      precio: 10,
      urlImage: 'https://example.com/image1.png',
      idmenu: 0,
      tipoPlato: '',
    };
    component.selectMenuToUpdate(plato);
    expect(component.selectedToUpdate.emit).toHaveBeenCalledWith(plato);
  });

  it('should emit buttonSubmitClick event when handleSubmit is called', () => {
    spyOn(component.buttonSubmitClick, 'emit');
    const plato: IPlato = {
      id: 1,
      nombre: 'Plato 1',
      precio: 10,
      urlImage: 'https://example.com/image1.png',
      idmenu: 0,
      tipoPlato: '',
    };
    component.handleSubmit(plato);
    expect(component.buttonSubmitClick.emit).toHaveBeenCalledWith(plato);
  });
});
