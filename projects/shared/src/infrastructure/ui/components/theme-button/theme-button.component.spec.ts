import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeButtonComponent } from './theme-button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ThemeButtonComponent', () => {
  let component: ThemeButtonComponent;
  let componentRef;
  let fixture: ComponentFixture<ThemeButtonComponent>;
  let buttonEl: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeButtonComponent);
    componentRef = fixture.componentRef;
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonEl = fixture.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.text()).toBe('Enviar');
    expect(component.type()).toBe('button');
    expect(component.theme()).toBe('success');
    expect(component.hasPopup()).toBe(false);
    expect(component.idPopUp()).toBeUndefined();
    expect(component.form()).toBeUndefined();
  });

  it('should set correct text on button', () => {
    componentRef.setInput('text','Submit');
    fixture.detectChanges();
    expect(buttonEl.textContent?.trim()).toBe('Submit');
  });

  it('should apply correct theme class', () => {
    componentRef.setInput('theme','danger');
    fixture.detectChanges();
    expect(buttonEl.classList).toContain('theme-button--danger');
  });

  it('should disable button when form is invalid', () => {
    componentRef.setInput('form',new FormGroup({ field: new FormControl('', Validators.required) }));
    fixture.detectChanges();
    
    expect(buttonEl.disabled).toBeTrue();
    expect(buttonEl.getAttribute('aria-disabled')).toBe('true');
  });

  it('should enable button when form is valid', () => {
    componentRef.setInput('form',new FormGroup({ field: new FormControl('valid value') }));
    fixture.detectChanges();
    
    expect(buttonEl.disabled).toBeFalse();
    expect(buttonEl.getAttribute('aria-disabled')).toBeNull();
  });

  it('should emit event on button click', () => {
    const spy = spyOn(component.onClick, 'emit');

    buttonEl.click();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should set aria attributes correctly', () => {
    componentRef.setInput('hasPopup', true);
    componentRef.setInput('idPopUp', 'popup1');
    fixture.detectChanges();
    
    expect(buttonEl.getAttribute('aria-haspopup')).toBe('true');
    expect(buttonEl.getAttribute('aria-controls')).toBe('popup1');
  });
});
