import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuSelectorComponent } from '../control-select/menu-selector/menu-selector.component';
import { ClientSelectorComponent } from '../control-select/client-selector/client-selector.component';
import { IClient } from 'client';
import { IMenu } from 'menus';
import { IOrder, IOrderRequest } from '../../../../domain/model/order.model';
import { PaginationComponent } from 'shared';
import { IDish } from 'dishes';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'lib-create-order-form',
  imports: [
    MenuSelectorComponent,
    ClientSelectorComponent,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.scss',
})
export class CreateOrderFormComponent {
  @Output() createOrder = new EventEmitter<IOrderRequest>();
  @Input() menus: IMenu[] = [];
  @Input() clients: IClient[] = [];
  @Input() order: IOrder;
  public dishList: IDish[] = [];
  public clientSelected: number = 0;
  private formBuilder = inject(FormBuilder);
  public addOrderForm = this.formBuilder.group({
    clientId: [0, [Validators.required]],
    localDate: ['', [Validators.required]],
    menuId: [null],
    dishfoodIds: this.formBuilder.array([]),
  });
  getClient(id: number) {
    this.clientSelected = id;
  }
  addDish(id: IDish) {
    this.dishList.push(id);
    const dishfoodIds = this.addOrderForm.get('dishfoodIds') as FormArray;
    dishfoodIds.push(this.formBuilder.control(id, Validators.required));
  }
  removeDish(index: any) {
    this.dishList = this.dishList.filter((item) => item !== index);
  }

  submit() {
    if (this.addOrderForm.valid) {
      const payload = {
        clientId: this.clientSelected,
        localDate: this.addOrderForm.get('localDate')?.value,
        dishfoodIds: this.dishList.map((dish) => dish.id),
      };

      this.createOrder.emit(payload as unknown as IOrderRequest);
      alert('Order Created');
      this.addOrderForm.reset();
      this.dishList.splice(0, this.dishList.length);
    } else {
      console.log(this.addOrderForm);
    }
  }
}
