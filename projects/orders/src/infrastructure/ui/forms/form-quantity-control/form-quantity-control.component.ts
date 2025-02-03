import { Component, input, output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'lib-form-quantity-control',
  imports: [],
  templateUrl: './form-quantity-control.component.html',
  styleUrl: './form-quantity-control.component.scss'
})
export class FormQuantityControlComponent {
  public formArray = input<FormArray>();
  public controlName = input<string>();
  public index = input<number>();
  public onDelete = output<number>();  

  get quantityControl(): FormControl {
    return this.formArray()!.at(this.index()).get('quantity') as FormControl;
  }

  incrementQuantity(){
    const currentValue = this.quantityControl.value;
    this.quantityControl.setValue(currentValue + 1);
  }

  decrementQuantity(){
    const currentValue = this.quantityControl.value;
    if(currentValue > 1){
      this.quantityControl.setValue(currentValue - 1);
    }
  }

  onDeleteClick(){
    this.onDelete.emit(this.index());
  }
}
