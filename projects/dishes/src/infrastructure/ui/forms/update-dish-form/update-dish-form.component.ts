import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'shared';
import { IDish, IDishRequest } from '../../../../public-api';

@Component({
  selector: 'lib-update-dish-form',
  imports: [ReactiveFormsModule,ModalComponent],
  templateUrl: './update-dish-form.component.html',
  styleUrl: './update-dish-form.component.scss'
})
export class UpdateDishFormComponent {
public getData = input.required<IDish>();
@Input() getMenuid: number = 0;
@Output() updateDish = new EventEmitter<any>();
private formBuilder = inject(FormBuilder);

public dishfoodUpdatedForm = this.formBuilder.group({
  id: [{ value: 0, disabled: true }, [Validators.required]],
  name: ['', [Validators.required, Validators.minLength(2)]],
  price: [10.0, [Validators.required]],
  isPopular: [false],
  menu: ["", [Validators.required]],
  orderList: this.formBuilder.array([]),
});
ngOnInit(): void {
  console.log(this.getData);
  this.setValue();
} 

setValue(): void {
  const dishObject = this.getData();
  console.log(dishObject);
  
  const orderIdsArray = this.dishfoodUpdatedForm.get(
    'orderList'
  ) as FormArray;
  orderIdsArray.clear();
  if (dishObject.orderList && Array.isArray(dishObject.orderList)) {
    dishObject.orderList.forEach((orderId: number) => {
      orderIdsArray.push(
        this.formBuilder.control(orderId, Validators.required)
      );
    });
  }
  this.dishfoodUpdatedForm.patchValue({
    id: dishObject.id,
    name: dishObject.name,
    price: dishObject.price,
    menu: dishObject.menu,
    isPopular: dishObject.isPopular,
  });

  orderIdsArray.disable();
}
sendToUpdate() {
  if (this.dishfoodUpdatedForm.valid) {
    const updatePayload = {
      name: this.dishfoodUpdatedForm.get('name')?.value,
      price: this.dishfoodUpdatedForm.get('price')?.value,
      isPopular: this.dishfoodUpdatedForm.get('isPopular')?.value,
      menuId: this.getMenuid,
    };
    updatePayload.price=Number(updatePayload.price);
    this.updateDish.emit(
      updatePayload as unknown as IDishRequest
    );
    alert('Dish Updated');
    this.redirectToMenu();

  }
}
    constructor(private router: Router) {}
    redirectToMenu(): void {
      this.router.navigate(['/menu']);
    }

}
