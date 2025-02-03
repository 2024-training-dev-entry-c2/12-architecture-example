import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormOrderComponent } from '../../forms/form-order/form-order.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../../../../domain/model/order.model';
import { GetByIdOrderUseCase } from '../../../../application/get-by-id-order.useCase';
import { Observable, of } from "rxjs";
import { AsyncPipe, NgIf } from '@angular/common';
import { UpdateOrderUseCase } from '../../../../application/update-order.useCase';
import { RegisterOrderUseCase } from '../../../../application/register-order.useCase';


@Component({
  selector: 'lib-form-order-container',
  imports: [FormOrderComponent, AsyncPipe, NgIf],
  templateUrl: './form-order-container.component.html',
  styles: ''
})

export class FormOrderContainerComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getOrderByIdUseCase = inject(GetByIdOrderUseCase);
  private updateOrderUseCase = inject(UpdateOrderUseCase);
  private createOrderUseCase = inject(RegisterOrderUseCase);

  public idOrder?: number;
  public order: IOrder;
  order$!: Observable<IOrder>;

  public title: string;
  public action: string;

  ngOnInit(): void {
    this.updateOrderUseCase.initSubscriptions();
    this.getOrderByIdUseCase.initSubscriptions();
    this.createOrderUseCase.initSubscriptions();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idOrder = +idParam;
        this.action = 'update';
        this.title = 'Actualizar Orden';
        this.loadOrderData(this.idOrder);
      } else {
        this.order$ = of({} as IOrder);
        this.action = 'save';
        this.title = 'Registrar Orden';
      }
    });
  }

  ngOnDestroy(): void {
    this.updateOrderUseCase.destroySubscriptions();
    this.getOrderByIdUseCase.destroySubscriptions();
    this.createOrderUseCase.destroySubscriptions();
  }

  private loadOrderData(id: number): void {
    this.getOrderByIdUseCase.execute(id);
    this.order$ = this.getOrderByIdUseCase.order$();
  }

  handleSubmit(order: IOrder) {
    if (this.action === 'update') {
      this.updateOrderUseCase.execute(this.idOrder, order).subscribe({
        next: () => this.router.navigate(['pedidos']),
        error: (err) => console.error('Error al actualizar la orden', err),
      });
    } else {
      this.createOrderUseCase.execute(order).subscribe({
        next: () => this.router.navigate(['pedidos']),
        error: (err) => console.error('Error al registrar la orden', err),
      });
    }
  }

}
