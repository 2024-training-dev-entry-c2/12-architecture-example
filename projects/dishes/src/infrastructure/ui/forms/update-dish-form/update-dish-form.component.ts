import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'shared';
import { IDish, IDishRequest } from '../../../../public-api';

@Component({
  selector: 'lib-update-dish-form',
  imports: [ReactiveFormsModule,ModalComponent],
  templateUrl: './update-dish-form.component.html',
  styleUrl: './update-dish-form.component.css'
})
export class UpdateDishFormComponent {
@Input() getData: IDish;
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
  const orderIdsArray = this.dishfoodUpdatedForm.get(
    'orderList'
  ) as FormArray;
  orderIdsArray.clear();
  if (this.getData.orderList && Array.isArray(this.getData.orderList)) {
    this.getData.orderList.forEach((orderId: number) => {
      orderIdsArray.push(
        this.formBuilder.control(orderId, Validators.required)
      );
    });
  }
  this.dishfoodUpdatedForm.patchValue({
    id: this.getData.id,
    name: this.getData.name,
    price: this.getData.price,
    menu: this.getData.menu,
    isPopular: this.getData.isPopular,
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
