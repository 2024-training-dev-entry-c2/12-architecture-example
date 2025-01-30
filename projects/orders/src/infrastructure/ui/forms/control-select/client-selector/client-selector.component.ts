import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IClient } from 'client';

@Component({
  selector: 'lib-client-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './client-selector.component.html',
  styleUrl: './client-selector.component.scss'
})
export class ClientSelectorComponent {
  @Input() clients: IClient[] = [];
  @Input() formGroup!: FormGroup;
  @Output() clientSelected = new EventEmitter<number>();
  ngOnInit(): void {
    console.log(this.clients);
  }
  onClientChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedDishId = selectElement.value;
    console.log(selectedDishId);
    this.clientSelected.emit(parseFloat(selectedDishId));
    
  }

}
