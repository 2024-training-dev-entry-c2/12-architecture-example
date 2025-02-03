import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IOrder, IOrderRequest } from '../../../../domain/model/order.model';
import { IMenu } from 'menus';
import { IClient } from 'client';
import { IDish } from 'dishes';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuSelectorComponent } from '../control-select/menu-selector/menu-selector.component';
import { ClientSelectorComponent } from '../control-select/client-selector/client-selector.component';
import { ModalComponent, PaginationComponent } from 'shared';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-update-order-form',
  imports: [
    MenuSelectorComponent,
    ClientSelectorComponent,
    ReactiveFormsModule,
    CurrencyPipe,
    ModalComponent,
  ],
  templateUrl: './update-order-form.component.html',
  styleUrl: './update-order-form.component.scss',
})
export class UpdateOrderFormComponent implements OnInit {
  @Output() closeModalOrder = new EventEmitter<void>();
  @Output() createOrder = new EventEmitter<IOrderRequest>();
  @Input() menus: IMenu[] = [];
  @Input() clients: IClient[] = [];
  @Input() order: IOrder;
  public dishList: IDish[] = [];
  public clientSelected: number = 0;
  private formBuilder = inject(FormBuilder);
  
  ngOnInit(): void {
    setTimeout(() => this.setValue(), 300);
  }
  public updateOrderForm = this.formBuilder.group({
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
    const dishfoodIds = this.updateOrderForm.get('dishfoodIds') as FormArray;
    dishfoodIds.push(this.formBuilder.control(id, Validators.required));
  }
  removeDish(index: any) {
    this.dishList = this.dishList.filter((item) => item !== index);
  }
  updateOrder(): void {
    if (this.updateOrderForm.valid) {
      const payload = {
        clientId: this.clientSelected,
        localDate: this.updateOrderForm.get('localDate')?.value,
        dishfoodIds: this.dishList.map((dish) => dish.id),
      };
      this.createOrder.emit(payload as unknown as IOrderRequest);
      alert('Order Created');
      this.updateOrderForm.reset();
      this.dishList.splice(0, this.dishList.length);
    } else {
      console.log(this.updateOrderForm);
    }
  }
  setValue(): void {
    if (!Array.isArray(this.menus)) {
      console.error('Data is null or not an array:', this.menus);
      return;
    }
    this.clientSelected = this.order.client.id;
    this.menus.map((menu) =>
      menu.dishfoods.map((dish) => {
        this.order.dishfoodIds.forEach((dishId) => {
          if (dishId === dish.id) {
            this.dishList.push(dish);
          }
        });
      })
    );
    this.updateOrderForm.patchValue({
      clientId: this.order.client.id,
      localDate: String(this.order.localDate),
    });
  }
  constructor(private router: Router) {}
  closeModal() {
    this.updateOrderForm.reset();
    this.dishList.splice(0, this.dishList.length);
    this.closeModalOrder.emit();
  }

}
