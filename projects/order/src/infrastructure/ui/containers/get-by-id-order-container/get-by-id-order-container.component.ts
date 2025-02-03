import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormByIdOrderComponent } from '../../forms/form-by-id-order/form-by-id-order.component';
import { IOrder } from '../../../../domain/model/order.model';
import { GetByIdOrderUseCase } from '../../../../application/get-by-id-order.useCase';
import { Observable, Subscription } from "rxjs";
import { GetByIdOrderCompComponent } from '../../components/get-by-id-order-comp/get-by-id-order-comp.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-get-by-id-order-container',
  imports: [FormByIdOrderComponent, GetByIdOrderCompComponent, AsyncPipe],
  templateUrl: './get-by-id-order-container.component.html',
  styles: ''
})
export class GetByIdOrderContainerComponent implements OnInit, OnDestroy {
  private getByIdUseCase = inject(GetByIdOrderUseCase);
  public order: IOrder;
  order$!: Observable<IOrder>;
  private subscription: Subscription;

  ngOnInit(): void {
    this.getByIdUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.getByIdUseCase.destroySubscriptions();
    this.subscription?.unsubscribe();
  }

  handleGetId(id: number) {
    this.getByIdUseCase.execute(id);
    this.order$ = this.getByIdUseCase.order$();

    this.subscription = this.order$.subscribe(order => {
      this.order = order;
    });
  }
}
