import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModifyButtonSharedComponent, RemoveButtonSharedComponent } from 'shared';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('idCliente', 12345);
    fixture.componentRef.setInput('precio', 200);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display client ID', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.idCliente()).toBe(12345);
    expect(compiled.querySelector('span').textContent).toBe('Id de cliente: 12345');
  });

  it('should display order price in USD currency', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.precio()).toBe(200);
    expect(compiled.querySelectorAll('span').item(1).textContent).toBe('Precio del pedido: $200.00');
  });

  it('should emit buttonModifyClick event when modify button is clicked', () => {
    spyOn(component.buttonModifyClick, 'emit');
    const modifyButton = fixture.debugElement.query(By.directive(ModifyButtonSharedComponent));
    modifyButton.triggerEventHandler('buttonClicked', null);
    expect(component.buttonModifyClick.emit).toHaveBeenCalled();
  });

  it('should emit buttonRemoveClick event when remove button is clicked', () => {
    spyOn(component.buttonRemoveClick, 'emit');
    const removeButton = fixture.debugElement.query(By.directive(RemoveButtonSharedComponent));
    removeButton.triggerEventHandler('buttonClicked', null);
    expect(component.buttonRemoveClick.emit).toHaveBeenCalled();
  });
});
