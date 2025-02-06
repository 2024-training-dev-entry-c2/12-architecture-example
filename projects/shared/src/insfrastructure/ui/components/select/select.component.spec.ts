import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SelectOption } from '../../../../domain/models/select-component.model';
import { signal } from '@angular/core';

describe('SelectComponent', () => {
  let component: SelectComponent<number>;
  let fixture: ComponentFixture<SelectComponent<number>>;

  const mockOptions: SelectOption<number>[] = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent<number>);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      (component.options as any) = signal(mockOptions);
      (component.placeholder as any) = signal('Select an option');
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should start with dropdown closed', () => {
      expect(component.isOpen).toBeFalsy();
    });

    it('should display placeholder when no option is selected', () => {
      const button = fixture.nativeElement.querySelector('.select__button');
      expect(button.textContent.trim()).toBe('Select an option');
    });

    it('should render all options', () => {
      const options = fixture.nativeElement.querySelectorAll('.select__option');
      expect(options.length).toBe(mockOptions.length);
    });
  });

  describe('Dropdown Toggle', () => {
    it('should toggle dropdown when button is clicked', () => {
      const button = fixture.nativeElement.querySelector('.select__button');
      button.click();
      fixture.detectChanges();
      expect(component.isOpen).toBeTruthy();

      button.click();
      fixture.detectChanges();
      expect(component.isOpen).toBeFalsy();
    });

    it('should close dropdown when clicking outside', () => {
      component.isOpen = true;
      fixture.detectChanges();

      document.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(component.isOpen).toBeFalsy();
    });
  });

  describe('Option Selection', () => {
    it('should select option and update display text', () => {
      const option = mockOptions[0];
      component.onSelect(option);
      fixture.detectChanges();

      expect(component.value).toBe(option.value);
      expect(component.selectedLabel).toBe(option.label);
    });

    it('should emit selected value', () => {
      const option = mockOptions[0];
      let emittedValue: number | undefined;

      component.selectionChange.subscribe((value) => {
        emittedValue = value;
      });

      component.onSelect(option);
      expect(emittedValue).toBe(option.value);
    });

    it('should close dropdown after selection', () => {
      component.isOpen = true;
      fixture.detectChanges();

      component.onSelect(mockOptions[0]);
      expect(component.isOpen).toBeFalsy();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open dropdown with arrow down', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onArrowDown(event);
      fixture.detectChanges();

      expect(component.isOpen).toBeTruthy();
    });

    it('should open dropdown with arrow up', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onArrowUp(event);
      fixture.detectChanges();

      expect(component.isOpen).toBeTruthy();
    });

    it('should select option with enter key', () => {
      const option = fixture.nativeElement.querySelector('.select__option');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      option.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.isOpen).toBeFalsy();
    });
  });

  describe('Form Control Integration', () => {
    it('should implement ControlValueAccessor', () => {
      const value = mockOptions[0].value;
      const changeSpy = spyOn(component.selectionChange, 'emit');
      const touchSpy = spyOn(component as any, 'onTouched');

      component.writeValue(value);
      fixture.detectChanges();

      expect(component.value).toBe(value);
      expect(component.selectedLabel).toBe(mockOptions[0].label);

      component.onSelect(mockOptions[1]);
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledWith(mockOptions[1].value);
      expect(touchSpy).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const select = fixture.nativeElement.querySelector('.select');
      expect(select.getAttribute('role')).toBe('combobox');
      expect(select.getAttribute('aria-expanded')).toBe('false');
      expect(select.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should update ARIA attributes when opened', () => {
      component.toggleDropdown();
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('.select');
      expect(select.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
