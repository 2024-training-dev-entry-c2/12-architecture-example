import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SelectOption } from '../../../../domain/models/select-component.model';

describe('SelectComponent', () => {
  let component: SelectComponent<number>;
  let fixture: ComponentFixture<SelectComponent<number>>;

  const mockOptions: SelectOption<number>[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent<number>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show placeholder by default', () => {
    const defaultPlaceholder = 'Selecciona una opción';
    const button = fixture.nativeElement.querySelector('.select__button');
    expect(button.textContent.trim()).toBe(defaultPlaceholder);
  });

  it('should show custom placeholder when provided', () => {
    const customPlaceholder = 'Custom placeholder';
    (component.placeholder as any).set(customPlaceholder);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.select__button');
    expect(button.textContent.trim()).toBe(customPlaceholder);
  });

  it('should toggle dropdown on button click', () => {
    const button = fixture.nativeElement.querySelector('.select__button');
    button.click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
    button.click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });

  it('should emit selected value', () => {
    const selectedOption = mockOptions[0];
    let emittedValue: number | undefined;

    (component.options as any).set(mockOptions);
    component.selectionChange.subscribe((value) => {
      emittedValue = value;
    });

    component.onSelect(selectedOption);
    expect(emittedValue).toBe(selectedOption.value);
    expect(component.selectedLabel).toBe(selectedOption.label);
  });

  it('should close dropdown after selection', () => {
    TestBed.runInInjectionContext(() => {
      (component.options as any).set(mockOptions);
    });
    component.isOpen = true;

    component.onSelect(mockOptions[0]);
    expect(component.isOpen).toBe(false);
  });
});
