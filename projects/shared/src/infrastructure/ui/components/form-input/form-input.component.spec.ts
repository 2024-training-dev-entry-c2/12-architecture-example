import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputComponent } from './form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input value', () => {
    component.writeValue('Test value');
    fixture.detectChanges();
    expect(component.value).toBe('Test value');
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toBe('Test value');
  });

  it('should call onChange when input value changes', () => {
    const onChangeSpy = spyOn(component, 'onChange');
    const inputElement = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));
    expect(onChangeSpy).toHaveBeenCalledWith('test value');
  });
});
