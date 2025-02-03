import { Component, input, output } from '@angular/core';
import { SelectOption } from '../../../../domain/models/select-component.model';

@Component({
  selector: 'lib-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent<T> {
  public options = input<SelectOption<T>[]>([]);
  public placeholder = input<string>('Selecciona una opción');
  public selectionChange = output<T>();

  public isOpen = false;
  public selectedLabel = '';
  public activeOptionId = '';

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  onSelect(option: SelectOption<T>): void {
    this.selectedLabel = option.label;
    this.selectionChange.emit(option.value);
    this.isOpen = false;
  }
}
