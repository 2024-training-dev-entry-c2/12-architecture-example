import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup } from "@angular/forms";
import { IDropdown } from "../../interfaces";
import { DropdownComponent } from "./dropdown.component";

describe('DropdownComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DropdownComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(DropdownComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the elements', () => {
        const fixture = TestBed.createComponent(DropdownComponent);
        const compiled = fixture.nativeElement as HTMLElement;
  
        const dropdownData: IDropdown = {
            id: 'id',
            label: 'label',
            formControlName: 'formControlName',
            options: [{ label: 'label', value: 'value' }],
            required: true,
            disabled: false,
        };

        const formGroup = new FormGroup({
            formControlName: new FormControl(),
        });

        fixture.componentRef.setInput('dropdownData', dropdownData);
        fixture.componentRef.setInput('formGroup', formGroup);
        fixture.detectChanges();
    
        const labelElement = compiled.querySelector('label');
        const selectElement = compiled.querySelector('select');
        const optionElements = selectElement?.querySelectorAll('option');

        expect(labelElement).toBeTruthy();
        expect(selectElement).toBeTruthy();
        expect(optionElements?.length).toBe(2);
    
      });

});