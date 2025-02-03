import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('name','AngularName');
    fixture.componentRef.setInput('price',20);
    fixture.componentRef.setInput('image','AngularImage');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name as an input property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.name()).toBe('AngularName');
    expect(compiled.querySelector('h2').textContent).toBe('AngularName');
  });

  it('should have price as an input property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.price()).toBe(20);
    expect(compiled.querySelector('span').textContent).toBe('Price: $20.00');
  });

  it('should have image as an input property', () => {
    expect(component.image()).toBe('AngularImage');
  });

  it('should emit buttonModifyClick event when modify button is clicked', () => {
    spyOn(component.buttonModifyClick, 'emit');
    const modifyButton = fixture.debugElement.query(By.css('lib-modify-button-shared'));
    modifyButton.triggerEventHandler('buttonClicked', null);
    fixture.detectChanges();
    expect(component.buttonModifyClick.emit).toHaveBeenCalled();
  });

  it('should emit buttonRemoveClick event when remove button is clicked', () => {
    spyOn(component.buttonRemoveClick, 'emit');
    const removeButton = fixture.debugElement.query(By.css('lib-remove-button-shared'));
    removeButton.triggerEventHandler('buttonClicked', null);
    fixture.detectChanges();
    expect(component.buttonRemoveClick.emit).toHaveBeenCalled();
  });

});
