import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuComponent } from './list-menu.component';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { IMenu } from '../../../../domain/model/menu.model';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';

describe('ListMenuComponent', () => {
  let component: ListMenuComponent;
  let fixture: ComponentFixture<ListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenuComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMenuComponent);
    fixture.componentRef.setInput('menu', [
      { id: 1, nombre: 'Menu 1', urlImage: 'https://example.com/image1.png' },
      { id: 2, nombre: 'Menu 2', urlImage: 'https://example.com/image2.png' },
    ]);
    fixture.componentRef.setInput('menuSelected', {
      id: 1,
      nombre: 'Menu 1',
      urlImage: 'https://example.com/image1.png',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No hay menús disponibles" when menu list is empty', () => {
    fixture.componentRef.setInput('menu', []);
    fixture.detectChanges();
    const noMenusElement = fixture.debugElement.query(By.css('span'));
    expect(noMenusElement.nativeElement.textContent).toContain(
      'No hay menús disponibles'
    );
  });

  it('should display a list of menus when menu list is not empty', () => {
    const menuElements = fixture.debugElement.queryAll(By.css('lib-card'));
    expect(menuElements.length).toBe(component.menu().length);
  });

  it('should pass image, link, and title to lib-card', () => {
    const cardComponent = fixture.debugElement.query(By.directive(CardComponent)).componentInstance;
    expect(cardComponent.image()).toBe(component.menu()[0].urlImage);
    expect(cardComponent.link()).toBe('/menu/' + component.menu()[0].id);
    expect(cardComponent.title()).toBe(component.menu()[0].nombre);
  });

  it('should emit menuSelectedToDelete event when deleteMenu is called', () => {
    spyOn(component.menuSelectedToDelete, 'emit');
    const menuId = 1;
    component.deleteMenu(menuId);
    expect(component.menuSelectedToDelete.emit).toHaveBeenCalledWith(menuId);
  });

  it('should emit menuSelectedToUpdate event when selectMenuToUpdate is called', () => {
    spyOn(component.menuSelectedToUpdate, 'emit');
    const menu: IMenu = { id: 1, nombre: 'Menu 1', urlImage: 'https://example.com/image1.png' };
    component.selectMenuToUpdate(menu);
    expect(component.menuSelectedToUpdate.emit).toHaveBeenCalledWith(menu);
  });

  it('should pass menuSelected to lib-menu-form', () => {
    const menuFormComponent = fixture.debugElement.query(By.directive(MenuFormComponent)).componentInstance;
    expect(menuFormComponent.menuSelected()).toBe(component.menuSelected());
  });

  it('should emit buttonSubmitClick event when handleSubmit is called', () => {
    spyOn(component.buttonSubmitClick, 'emit');
    const menu: IMenu = { id: 1, nombre: 'Menu 1', urlImage: 'https://example.com/image1.png' };
    component.handleSubmit(menu);
    expect(component.buttonSubmitClick.emit).toHaveBeenCalledWith(menu);
  });

});
