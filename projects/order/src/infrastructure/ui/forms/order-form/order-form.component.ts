import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnDestroy, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapitalizeFirstPipe, CastFormGroupPipe, IControls, InputComponent, IOptions, SelectComponent } from 'shared';
import { GetClientsUsecase } from '../../../../application/client/get-clients.usecase';
import { GetDishesUsecase } from '../../../../application/dish/get-dishes.usecase';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { IOrder } from '../../../../domain/model/order.model';

@Component({
  selector: 'lib-order-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, SelectComponent, CastFormGroupPipe],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit, OnDestroy {
  private readonly _useCaseModal = inject(ModalUsecase);
  private readonly _useCaseClients = inject(GetClientsUsecase);
  private readonly _useCaseDishes = inject(GetDishesUsecase);
  private formBuilder = inject(FormBuilder);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  public message = input<string>();
  public onSubmit = output<IOrder>();
  public clientOptions: IOptions[] = [];
  public dishesOptions: IOptions[] = [];

  @Input()
  set order(value: IOrder) {
    const orderDetailsArray = this.form.get('orderDetails') as FormArray;
    orderDetailsArray.clear();

    if (value?.orderDetails?.length) {
      value?.orderDetails.forEach(orderDetail => {
        orderDetailsArray.push(this.formBuilder.group({
          dishId: [orderDetail.dish.id, [Validators.required]],
          quantity: [orderDetail.quantity, [Validators.required, Validators.min(0)]]
        }));
      });
    } else {
      this.addDish();
    }

    this.form.patchValue(value || { id: null, clientId: '', orderDetails: [] });
  }

  ngOnInit() {
    this._useCaseModal.initSubscriptions();
    this._useCaseClients.initSubscriptions();
    this._useCaseDishes.initSubscriptions();
    this._useCaseClients.execute();
    this._useCaseDishes.execute();

    this._useCaseClients.clients$().subscribe(clients => {
      this.clientOptions = (clients ?? []).map(client => ({
        value: client.id,
        name: this.capitalizeFirstPipe.transform(client.name)
      }));
      this.updateClientsOptions();
    });

    this._useCaseDishes.dishes$().subscribe(dishes => {
      this.dishesOptions = (dishes ?? []).map(dish => ({
        value: dish.id,
        name: this.capitalizeFirstPipe.transform(dish.name)
      }));
      this.updateDishesOptions();
    });

    this._useCaseModal.open$().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    });
  }

  ngOnDestroy() {
    this._useCaseModal.destroySubscriptions();
    this._useCaseClients.destroySubscriptions();
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    clientId: ['', [Validators.required]],
    orderDetails: this.formBuilder.array([this.formBuilder.group({
      dishId: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    })])
  });
  public controls: IControls[] = [
    {
      type: 'select', text: 'Cliente', controlName: 'clientId',
      options: []
    }
  ];

  get dishes(): FormArray {
    return this.form.get('orderDetails') as FormArray;
  }

  addDish(): void {
    this.dishes.push(this.formBuilder.group({
      dishId: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  removeDish(index: number): void {
    this.dishes.removeAt(index);
  }

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  private updateClientsOptions() {
    const clientControl = this.controls.find(control => control.controlName === 'clientId');
    if (clientControl) {
      clientControl.options = this.clientOptions;
    }
  }

  private updateDishesOptions() {
    const dishControl = this.controls.find(control => control.controlName === 'dishId');
    if (dishControl) {
      dishControl.options = this.dishesOptions;
    }
  }
}