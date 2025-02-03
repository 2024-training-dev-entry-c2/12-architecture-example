import { TestBed } from '@angular/core/testing';
import { PanelMenuComponent } from './panel-menu.component';
import { Imenu } from '../../../../domain/model/menu.model';

describe('PanelMenuComponent', () => {
  it('Crea el componente', () => {
    const fixture = TestBed.createComponent(PanelMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Llama el handleSubmit', () => {
    const fixture = TestBed.createComponent(PanelMenuComponent);
    const component = fixture.componentInstance;
    spyOn(component.onCreateMenu, 'emit');
    const menu: Imenu = {
      id: 1,
      name: 'Menú Especial',
      dishes: [],
      description: 'Menú especial para la cena',
    } as Imenu;
    component.handleSubmit(menu);
    expect(component.onCreateMenu.emit).toHaveBeenCalledWith(menu);
  });

  it('onSelectMenu', () => {
    const fixture = TestBed.createComponent(PanelMenuComponent);
    const component = fixture.componentInstance;
    spyOn(component.onSelectMenu, 'emit');
    spyOn(component.modal(), 'toggle');

    const id = 2;
    expect(typeof id).toBe('number');
    component.selectMenu(id);
    expect(component.onSelectMenu.emit).toHaveBeenCalledWith(id);
    expect(component.modal().toggle).toHaveBeenCalled();
  });

  it('onDeleteMenu eliminar un menú', () => {
    const fixture = TestBed.createComponent(PanelMenuComponent);
    const component = fixture.componentInstance;
    spyOn(component.onDeleteMenu, 'emit');
    const id = 10;
    expect(typeof id).toBe('number');
    component.deleteMenu(id);
    expect(component.onDeleteMenu.emit).toHaveBeenCalledWith(id);
  });
});
