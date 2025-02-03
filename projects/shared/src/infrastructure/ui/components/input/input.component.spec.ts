import { TestBed } from "@angular/core/testing";
import { FormGroup, FormControl } from "@angular/forms";
import { InputComponent } from "./input.component";
import { IInput } from "../../interfaces";

describe('InputComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [InputComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(InputComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the elements', () => {
        const fixture = TestBed.createComponent(InputComponent);
        const compiled = fixture.nativeElement as HTMLElement;
  
        const inputData: IInput = {
            id: 'id',
            label: 'label',
            value: 'value',
            placeholder: 'placeholder',
            type: 'text',
            formControlName: 'formControlName',
            required: true,
            disabled: false,
        };

        const formGroup = new FormGroup({
            formControlName: new FormControl(),
        });

        fixture.componentRef.setInput('inputData', inputData);
        fixture.componentRef.setInput('formGroup', formGroup);
        fixture.detectChanges();
    
        const labelElement = compiled.querySelector('label');
        const inputElement = compiled.querySelector('input');

        expect(labelElement).toBeTruthy();
        expect(inputElement).toBeTruthy();
      
    });

    it('should be called onClick', () => {
        const fixture = TestBed.createComponent(InputComponent);
        const component = fixture.componentInstance;

        const inputData: IInput = {
            id: 'id',
            label: 'label',
            value: 'value',
            placeholder: 'placeholder',
            type: 'text',
            formControlName: 'formControlName',
            required: true,
            disabled: false,
        };

        const formGroup = new FormGroup({
            formControlName: new FormControl(),
        });

        const compiled = fixture.nativeElement as HTMLElement;
        const inputElement = compiled.querySelector('input');
        fixture.componentRef.setInput('inputData', inputData);
        fixture.componentRef.setInput('formGroup', formGroup);
        fixture.detectChanges();
        spyOn(component.outputData, 'emit');
    
    
        inputElement.dispatchEvent(new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            data: 'search',
        }));

        
        expect(component.outputData.emit).toHaveBeenCalled();

    });

});