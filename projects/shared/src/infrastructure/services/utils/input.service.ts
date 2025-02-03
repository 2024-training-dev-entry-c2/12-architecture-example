import { Injectable } from '@angular/core';
import { IInput } from '../../ui/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor() { }

  static generateInputData(id: string, label: string, value: string, placeholder: string, type: string, formControlName: string, required: boolean | true, disabled: boolean | false): IInput {
    return {
      id: id,
      label: label,
      value: value,
      placeholder: placeholder,
      type: type,
      formControlName: formControlName,
      required: required,
      disabled: disabled
    };
  }

}