import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ViewOrdersComponent } from "../../components/view-orders/view-orders.component";
import { Observable } from 'rxjs';
import { IOrders } from '../../../../domain/model/orders.model';
import { CommonModule } from '@angular/common';
import { FindAllOrdersUseCase } from '../../../../application/find-all-orders.usecase';

@Component({
  selector: 'lib-view-orders-container',
  imports: [CommonModule,ViewOrdersComponent],
  templateUrl: './view-orders-container.component.html',

})
export class ViewOrdersContainerComponent implements OnInit, OnDestroy {
  private readonly _findAllOrdersUseCase = inject(FindAllOrdersUseCase)
  orders$ : Observable<IOrders[]>;

  ngOnInit(): void {
    this._findAllOrdersUseCase.initSubscriptions();
    this._findAllOrdersUseCase.execute();
    this.orders$ = this._findAllOrdersUseCase.orders$();

  }
  ngOnDestroy(): void {
    this._findAllOrdersUseCase.destroySubscriptions();

  }



}
