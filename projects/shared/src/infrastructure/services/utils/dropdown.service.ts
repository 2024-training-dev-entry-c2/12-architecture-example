import { Injectable } from '@angular/core';
import { IDropdown } from '../../ui/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  static generateDropdownData(id: string, label?: string, options?:any[], formControlName?: string, required?: boolean | true, disabled?: boolean | false): IDropdown {
    return {
      id: id,
      label: label,
      options: options ?? [],
      formControlName: formControlName,
      required: required ?? false,
      disabled: disabled ?? false
    };
  }
}