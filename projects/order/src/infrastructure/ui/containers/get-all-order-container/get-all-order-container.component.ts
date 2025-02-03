import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllOrderUseCase } from '../../../../application/get-all-order.useCase';
import { IOrder } from '../../../../domain/model/order.model';
import { GetAllOrderCompComponent } from '../../components/get-all-order-comp/get-all-order-comp.component';
import { AsyncPipe } from '@angular/common';
import { DeleteOrderUseCase } from '../../../../application/delete-order.useCase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-get-all-order-container',
  imports: [GetAllOrderCompComponent, AsyncPipe],
  templateUrl: './get-all-order-container.component.html',
  styles: ''
})

export class GetAllOrderContainerComponent implements OnInit, OnDestroy {

  private readonly getAllOrdersUsecase = inject(GetAllOrderUseCase);
  private readonly _deleteUseCase = inject(DeleteOrderUseCase);
  public orders$: Observable<IOrder[]>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAllOrdersUsecase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this.getAllOrdersUsecase.execute();

    this.orders$ = this.getAllOrdersUsecase.orders$();
  }

  ngOnDestroy(): void {
    this.getAllOrdersUsecase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleDeleteOrder(id: number) {
    this._deleteUseCase.execute(id);
  }

  handleUpdateOrder(id: number) {
    this.router.navigate(['pedidos/actualizar', id]);
  }

}
