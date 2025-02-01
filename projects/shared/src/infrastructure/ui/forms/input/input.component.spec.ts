import { TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the label', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('label')).toBeTruthy();
  });

  it('should render the text', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('text', 'Nombre');
    fixture.componentRef.setInput('controlName', 'nombre');
    fixture.componentRef.setInput('formGroup', new FormGroup({ nombre: new FormControl('') }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.text()).toBe('Nombre');
    expect(compiled.querySelector('.label__text').textContent).toBe('Nombre');
  });

  it('should render the input', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it('should render the type', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('type', 'text');
    fixture.componentRef.setInput('controlName', 'nombre');
    fixture.componentRef.setInput('formGroup', new FormGroup({ nombre: new FormControl('') }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.type()).toBe('text');
    expect(compiled.querySelector('input').getAttribute('type')).toBe('text');
  });

  it('should render the controlName', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('controlName', 'name');
    fixture.componentRef.setInput('formGroup', new FormGroup({ name: new FormControl('') }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.controlName()).toBe('name');
    // expect(compiled.querySelector('input').getAttribute('formControlName')).toBe('name');
  });

  it('should render the formGroup', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('controlName', 'name');
    fixture.componentRef.setInput('formGroup', new FormGroup({ name: new FormControl('') }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.formGroup()).toBeTruthy();
  });

  it('should render the errorMessage required', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('controlName', 'email');
    fixture.componentRef.setInput('formGroup', new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    component.formGroup().get('email')?.markAllAsTouched();
    fixture.detectChanges();

    expect(component.isInvalid()).toBeTruthy();
    expect(compiled.querySelector('.label__error').textContent).toBe(' Este campo es obligatorio. ');
  });

  it('should render the errorMessage email', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('controlName', 'email');
    fixture.componentRef.setInput('formGroup', new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    component.formGroup().get('email')?.markAsTouched();
    component.formGroup().get('email')?.setValue('invalid');
    fixture.detectChanges();

    expect(component.isInvalid()).toBeTruthy();
    expect(compiled.querySelector('.label__error').textContent).toBe(' Por favor, introduce un correo válido. ');
  });

  it('should render the errorMessage min', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('controlName', 'tel');
    fixture.componentRef.setInput('formGroup', new FormGroup({
      tel: new FormControl('', [Validators.required, Validators.min(1)])
    }));

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    component.formGroup().get('tel')?.markAsTouched();
    component.formGroup().get('tel')?.setValue('0');
    fixture.detectChanges();

    expect(component.isInvalid()).toBeTruthy();
    expect(compiled.querySelector('.label__error').textContent).toBe(' El valor debe ser mayor o igual a 1. ');
  });

  it('should render the errorMessage invalid', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('controlName', 'tel');
    fixture.componentRef.setInput('formGroup', new FormGroup({
      tel: new FormControl('', [Validators.required, Validators.pattern(/^123$/)])
    }));
  
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
  
    component.formGroup().get('tel')?.markAsTouched();
    component.formGroup().get('tel')?.setValue('456'); 
    fixture.detectChanges();

    expect(component.isInvalid()).toBeTruthy();
    expect(compiled.querySelector('.label__error').textContent).toBe(' El valor introducido no es válido. ');
  });
});
