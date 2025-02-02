import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlInputComponent } from './control-input.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ControlInputComponent', () => {
  let component: ControlInputComponent;
  let fixture: ComponentFixture<ControlInputComponent>;
  let labelElement: HTMLLabelElement;
  let inputElement: HTMLInputElement;
  let errorSpan: HTMLSpanElement | null;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlInputComponent, ReactiveFormsModule, CommonModule],
    })
      .overrideComponent(ControlInputComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ControlInputComponent);
    component = fixture.componentInstance;
    labelElement = fixture.nativeElement.querySelector('label');
    inputElement = fixture.nativeElement.querySelector('input');
    control = new FormControl('');
    fixture.componentRef.setInput('control', control);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label with correct title', () => {
    fixture.componentRef.setInput('title', 'Test Label');
    fixture.detectChanges();
    expect(labelElement.textContent).toContain('Test Label:');
  });

  it('should render input with correct type, id and placeholder', () => {
    fixture.componentRef.setInput('id', 'test-id');
    fixture.componentRef.setInput('type', 'email');
    fixture.componentRef.setInput('placeholder', 'Enter your email');
    fixture.detectChanges();

    expect(inputElement.getAttribute('id')).toBe('test-id');
    expect(inputElement.getAttribute('type')).toBe('email');
    expect(inputElement.getAttribute('placeholder')).toBe('Enter your email');
  });

  it('should bind control input to FormControl', () => {
    control.setValue('test value');
    fixture.detectChanges();
    expect(inputElement.value).toBe('test value');
  });

  it('should render error message if error is true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.componentRef.setInput('errorMessage', 'This field is required');
    fixture.detectChanges();

    errorSpan = fixture.nativeElement.querySelector('.form-group__error');
    expect(errorSpan?.textContent).toContain('This field is required');
  });
  it('should not render error message if error is false', () => {
    fixture.componentRef.setInput('error', false);
    fixture.detectChanges();

    errorSpan = fixture.nativeElement.querySelector('.form-group__error');
    expect(errorSpan).toBeNull();
  });

  it('should emit change event on focus and change', () => {
    let emitted = false;
    component.change.subscribe(() => {
      emitted = true;
    });
    inputElement.dispatchEvent(new Event('focus'));
    expect(emitted).toBeTrue();
    emitted = false;
    inputElement.dispatchEvent(new Event('change'));
    expect(emitted).toBeTrue();
  });
});
