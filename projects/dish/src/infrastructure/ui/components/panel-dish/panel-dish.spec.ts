import { TestBed } from '@angular/core/testing';
import { PanelDishComponent } from './panel-dish.component';
import { Idish } from '../../../../domain/model/dish.model';

describe('PanelDishComponent', () => {
  it('crea el componente', () => {
    const fixture = TestBed.createComponent(PanelDishComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe iniciar en false', () => {
    const fixture = TestBed.createComponent(PanelDishComponent);
    const app = fixture.componentInstance;
    expect(app.isModalForm).toBeFalse();
  });

  it('Debe emitir onCreateDish al llamar handleSubmit', () => {
    const fixture = TestBed.createComponent(PanelDishComponent);
    const app = fixture.componentInstance;
    spyOn(app.onCreateDish, 'emit');
    const dish = {
      id: 1,
      name: 'Pizza',
      price: 10,
      description: 'Pizza de peperoni',
    } as Idish;
    app.handleSubmit(dish);
    expect(app.onCreateDish.emit).toHaveBeenCalledWith(dish);
  });

  it('Debe llamar al modal al seleccionar un dish', () => {
    const fixture = TestBed.createComponent(PanelDishComponent);
    const app = fixture.componentInstance;
    spyOn(app.onSelectDish, 'emit');
    spyOn(app.modal(), 'toggle');

    app.selectDish(2);
    // esta hace que sea lamado con el argunmento pasado x el parametro
    expect(app.onSelectDish.emit).toHaveBeenCalledWith(2);
    // aqi que sea llamado al menos una sola vez
    expect(app.modal().toggle).toHaveBeenCalled();
  });

  it('Debe emitir onDeleteDish al eliminar un dish', () => {
    const fixture = TestBed.createComponent(PanelDishComponent);
    const app = fixture.componentInstance;
    spyOn(app.onDeleteDish, 'emit');
    const id = 3;
    expect(typeof id).toBe('number');
    app.deleteDish(id);
    expect(app.onDeleteDish.emit).toHaveBeenCalledWith(3);
  });
});
