import { Component, input, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDishSelectorComponent } from '../form-dish-selector/form-dish-selector.component';
import { IDish } from 'dishes';
import { FormQuantityControlComponent } from '../form-quantity-control/form-quantity-control.component';

@Component({
  selector: 'lib-form-dynamic-selector',
  imports: [ReactiveFormsModule, FormDishSelectorComponent, FormQuantityControlComponent],
  templateUrl: './form-dynamic-selector.component.html',
  styleUrl: './form-dynamic-selector.component.scss'
})
export class FormDynamicSelectorComponent {
  public form = input.required<FormGroup>();
  public formArray = input.required<FormArray>();
  public formArrayName = input<string>();
  public index = input<number>();
  public dishes = input<IDish[]>();
  public onDelete = output<number>();  

  ngOnInit() {
    console.log('formArrayName:', this.formArrayName()); 
  }

  onDeleteClick():void{
    this.onDelete.emit(this.index());
  }
}
