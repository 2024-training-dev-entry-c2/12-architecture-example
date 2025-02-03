import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoComponentComponent } from './pedido-component.component';
import { By } from '@angular/platform-browser';
import { CardComponent } from '../card/card.component';
import { PedidoFormComponent } from '../../forms/pedido-form/pedido-form.component';

describe('PedidoComponentComponent', () => {
  let component: PedidoComponentComponent;
  let fixture: ComponentFixture<PedidoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoComponentComponent);
    fixture.componentRef.setInput('pedidos', [
      { id: 1, idCliente: 123, precio: 50 },
      { id: 2, idCliente: 456, precio: 75 },
    ]);
    fixture.componentRef.setInput('pedidoSelected', {
      id: 1,
      idCliente: 123,
      precio: 50,
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No hay pedidos" when pedidos list is empty', () => {
    fixture.componentRef.setInput('pedidos', []);
    fixture.detectChanges();
    const noPedidosElement = fixture.debugElement.query(By.css('span'));
    expect(noPedidosElement.nativeElement.textContent).toContain('No hay pedidos');
  });

  it('should display a list of pedidos when pedidos list is not empty', () => {
    const pedidoElements = fixture.debugElement.queryAll(By.css('lib-card'));
    expect(pedidoElements.length).toBe(component.pedidos().length);
  });

  it('should pass idCliente and precio to lib-card', () => {
    const cardComponent = fixture.debugElement.query(By.directive(CardComponent)).componentInstance;
    expect(cardComponent.idCliente()).toBe(component.pedidos()[0].idCliente);
    expect(cardComponent.precio()).toBe(component.pedidos()[0].precio);
  });

  it('should emit buttonRemoveClick event when delete is called', () => {
    spyOn(component, 'delete');
    const removeButton = fixture.debugElement.query(By.css('lib-card')).query(By.css('lib-remove-button-shared'));
    removeButton.triggerEventHandler('buttonClicked', null);
    fixture.detectChanges();
    expect(component.delete).toHaveBeenCalledWith(component.pedidos()[0].id);
  });
  
  it('should emit buttonModifyClick event when selectToUpdate is called', () => {
    spyOn(component, 'selectToUpdate');
    const modifyButton = fixture.debugElement.query(By.css('lib-card')).query(By.css('lib-modify-button-shared'));
    modifyButton.triggerEventHandler('buttonClicked', null);
    fixture.detectChanges();
    expect(component.selectToUpdate).toHaveBeenCalledWith(component.pedidos()[0]);
  });

  it('should pass pedidoSelected to lib-pedido-form', () => {
    const pedidoFormComponent = fixture.debugElement.query(By.directive(PedidoFormComponent)).componentInstance;
    expect(pedidoFormComponent.pedidoSelected()).toBe(component.pedidoSelected());
  });

  it('should emit buttonSubmitClick event when handleSubmit is called', () => {
    spyOn(component, 'handleSubmit');
    const pedidoFormComponent = fixture.debugElement.query(By.directive(PedidoFormComponent)).componentInstance;
    pedidoFormComponent.buttonSubmitClick.emit(component.pedidoSelected());
    fixture.detectChanges();
    expect(component.handleSubmit).toHaveBeenCalledWith(component.pedidoSelected());
  });
});
