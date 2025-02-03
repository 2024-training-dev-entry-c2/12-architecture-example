import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('name','Test Name');
    fixture.componentRef.setInput('email','test@example.com'); 
    fixture.componentRef.setInput('tel','123-456-7890'); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name as an input property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.name()).toBe('Test Name');
    expect(compiled.querySelector('.client-card__name').textContent).toBe('Test Name');
  });

  it('should display email as an input property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.email()).toBe('test@example.com');
    expect(compiled.querySelector('span').textContent).toContain('Email: test@example.com');
  });

  it('should display tel as an input property', () => {
    expect(component.tel()).toBe('123-456-7890');
  });

  it('should emit buttonModifyClick event when modify button is clicked', () => {
    spyOn(component.buttonModifyClick, 'emit');
    const modifyButton = fixture.debugElement.query(By.css('lib-modify-button-shared'));
    modifyButton.triggerEventHandler('buttonClicked', null);
    expect(component.buttonModifyClick.emit).toHaveBeenCalled();
  });

  it('should emit buttonRemoveClick event when remove button is clicked', () => {
    spyOn(component.buttonRemoveClick, 'emit');
    const removeButton = fixture.debugElement.query(By.css('lib-remove-button-shared'));
    removeButton.triggerEventHandler('buttonClicked', null);
    expect(component.buttonRemoveClick.emit).toHaveBeenCalled();
  });

});
