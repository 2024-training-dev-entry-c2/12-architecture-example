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
    fixture.componentRef.setInput('title','AngularTitle');
    fixture.componentRef.setInput('image','AngularImage'); 
    fixture.componentRef.setInput('link','AngularLink'); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as an input property', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.title()).toBe('AngularTitle');
    expect(compiled.querySelector('h2').textContent).toBe('AngularTitle'); 
  });

  it('should have image as an input property', () => {
    expect(component.image()).toBe('AngularImage');
  });

  it('should have link as an input property', () => {
    expect(component.link()).toBe('AngularLink');
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
