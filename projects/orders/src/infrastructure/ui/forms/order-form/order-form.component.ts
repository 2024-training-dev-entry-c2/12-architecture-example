import { Component, inject, Input, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent, ThemeButtonComponent } from 'shared';
import { IOrder } from '../../../../domain/model/order.model';
import { IClient } from 'clients';
import { IOrderRequest } from '../../../../domain/model/order-request.model';
import { IDishOrder } from '../../../../domain/model/dish-order.model';
import { FormSelectorComponent } from '../form-selector/form-selector.component';
import { FormDynamicSelectorComponent } from "../form-dynamic-selector/form-dynamic-selector.component";
import { IDish } from 'dishes';


@Component({
  selector: 'lib-order-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ThemeButtonComponent, FormSelectorComponent, FormDynamicSelectorComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  private formBuilder = inject(FormBuilder);
  public onSubmit = output<IOrder>();
  public action = input<string>();
  public clients = input<IClient[]>();
  public dishesList = input<IDish[]>();
  public theme  = input<'success' | 'warning'>('success');


  @Input()
  set order(value: IOrder){
    this.form.patchValue({
      ...value, 
      clientId: value?.client.id ?? 0,
      dishes: []
    });
    
    this.dishes.clear();

    value?.dishes.forEach(dish => {
      const dishGroup = this.formBuilder.group({
        dishId: [dish.dishId || null, Validators.required],
        quantity: [dish.quantity || 1, [Validators.required, Validators.min(1)]],
        price: [dish.price || null],
        dishName: [dish.dishName || null]
      });
      this.dishes.push(dishGroup);
    });
    console.log(this.getFormArrayControls());
  }

  public form = this.formBuilder.group({
    date : [null as Date, [Validators.required]],
    clientId : [0, [Validators.required]],
    dishes : this.formBuilder.array([
      this.formBuilder.group({
        dishId: [0, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        // -------------------
        price: [null],
        dishName: ['']
      })
    ]),
    // -------------------
    id : [null]
  });

  get dishes(): FormArray {
    return this.form.get('dishes') as FormArray;
  }

  addDish() : void {
    const newDish = this.formBuilder.group({
      dishId : [0, Validators.required],
      quantity : [1, [Validators.required, Validators.min(1)]],
      // ----------------
      price : [null],
      dishName : [null]
    })
    this.dishes.push(newDish);
  }

  deleteDish(index: number): void {
    this.dishes.removeAt(index);
  }

  getFormArrayControls() {
    const formArray = this.form.get('dishes');
    console.log(formArray.value);
    if (formArray instanceof FormArray) {
      return formArray.controls;
    }
    return [];
  }

  submit(){
    if(!this.form.valid)return;

    const rawData = this.form.getRawValue();
    const data : IOrder = {
      id: rawData.id,
      date : rawData.date,
      client: this.clients().find(client => client.id == rawData.clientId),
      dishes: rawData.dishes,
      total : null
    }

    this.onSubmit.emit(data);
    this.resetForm();
  }

  public resetForm(){
    this.form.reset();    
    this.form.setControl('dishes', this.formBuilder.array([
      this.formBuilder.group({
        dishId: [0, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        // -------------------
        price: [null],
        dishName: ['']
      })
    ]));
  }
}
