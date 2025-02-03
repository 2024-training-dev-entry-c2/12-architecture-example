import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DynamicInputComponent } from './dynamic-input.component';
import { CommonModule } from '@angular/common';

describe('DynamicInputComponent', () => {
  let component: DynamicInputComponent;
  let fixture: ComponentFixture<DynamicInputComponent>;
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      testInput: new FormControl(''),  // Definir el control testInput
    });

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, DynamicInputComponent],
    });

    fixture = TestBed.createComponent(DynamicInputComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroup;
    component.config = {
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input element with the correct label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent.trim()).toBe('Test Input');  // Asegúrate de eliminar cualquier espacio extra

    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.id).toBe('testInput');
  });

  it('should render a select element when the type is "select"', () => {
    // Agregar control testSelect en el formGroup
    formGroup.addControl('testSelect', new FormControl(''));
    component.config = { name: 'testSelect', label: 'Test Select', type: 'select', options: [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }] };
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    expect(select).toBeTruthy();
    expect(select.id).toBe('testSelect');
    expect(select.options.length).toBe(2);  // Verifica que haya dos opciones
  });

  it('should render a multiple select element when the type is "selectM"', () => {
    // Agregar control testSelectM en el formGroup
    formGroup.addControl('testSelectM', new FormControl(''));
    component.config = { name: 'testSelectM', label: 'Test Select Multiple', type: 'selectM', options: [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }] };
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    expect(select).toBeTruthy();
    expect(select.multiple).toBeTrue();
  });

  it('should render the error message when the input is invalid and touched', () => {
    formGroup.controls['testInput'].setValue('');
    formGroup.controls['testInput'].markAsTouched();
    formGroup.controls['testInput'].setErrors({ required: true });
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.dynamic-input__error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Invalid input');
  });

  it('should display a custom error message if provided', () => {
    component.config = { name: 'testInput', label: 'Test Input', errorMessage: 'Custom error message' };
    formGroup.controls['testInput'].setValue('');
    formGroup.controls['testInput'].markAsTouched();
    formGroup.controls['testInput'].setErrors({ required: true });
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.dynamic-input__error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Custom error message');
  });

  it('should render a dynamic input array when the control is a FormArray', () => {
    const formArray = new FormArray([new FormControl('')]);
    formGroup = new FormGroup({ testArray: formArray });
    component.formGroup = formGroup;
    component.config = { name: 'testArray', label: 'Test Array', type: 'select', options: [{ label: 'Option 1', value: 1 }] };
    fixture.detectChanges();

    const arrayItems = fixture.nativeElement.querySelectorAll('.dynamic-input__array-item');
    expect(arrayItems.length).toBe(1);
    const select = arrayItems[0].querySelector('select');
    expect(select).toBeTruthy();
  });
});
