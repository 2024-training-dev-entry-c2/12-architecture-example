import { ValidatorFn } from '@angular/forms';
import { IInput } from './input.interface';
import { IDropdown } from './dropdown.interface';

export interface IField {
    type: string;
    name: string;
    class: string;
    input?: IInput;
    dropdown?: IDropdown;
    validators?: ValidatorFn[];
}