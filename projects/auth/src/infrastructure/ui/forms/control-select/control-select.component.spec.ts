import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlSelectComponent } from './control-select.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ControlSelectComponent', () => {
  let component: ControlSelectComponent;
  let fixture: ComponentFixture<ControlSelectComponent>;
  let labelElement: HTMLLabelElement;
  let selectElement: HTMLSelectElement;
  let errorSpan: HTMLSpanElement | null;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlSelectComponent, ReactiveFormsModule, CommonModule],
    })
      .overrideComponent(ControlSelectComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ControlSelectComponent);
    component = fixture.componentInstance;
    labelElement = fixture.nativeElement.querySelector('label');
    selectElement = fixture.nativeElement.querySelector('select');
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
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should render select with correct id and default option', () => {
    fixture.componentRef.setInput('id', 'test-id');
    fixture.componentRef.setInput('default', 'Select an option');
    fixture.detectChanges();
    expect(selectElement.getAttribute('id')).toBe('test-id');
    expect(
      selectElement.querySelector('option[disabled]')?.textContent
    ).toContain('Select an option');
  });

  it('should render options from input', () => {
    fixture.componentRef.setInput('options', [
      'Option 1',
      'Option 2',
      'Option 3',
    ]);
    fixture.detectChanges();
    const options = selectElement.querySelectorAll('option:not([disabled])');
    expect(options.length).toBe(3);
    expect((options[0] as HTMLOptionElement).value).toBe('Option 1');
    expect((options[1] as HTMLOptionElement).value).toBe('Option 2');
    expect((options[2] as HTMLOptionElement).value).toBe('Option 3');
  });

  it('should bind control select to FormControl', () => {
    fixture.componentRef.setInput('options', [
      'Option 1',
      'Option 2',
      'Option 3',
    ]);
    fixture.detectChanges();
    control.setValue('Option 2');
    control.updateValueAndValidity();
    fixture.detectChanges();
    expect(selectElement.value).toBe('Option 2');
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

  it('should emit change event when select value changes', () => {
    let emitted = false;
    component.change.subscribe(() => {
      emitted = true;
    });
    selectElement.dispatchEvent(new Event('change'));
    expect(emitted).toBeTrue();
  });
});
