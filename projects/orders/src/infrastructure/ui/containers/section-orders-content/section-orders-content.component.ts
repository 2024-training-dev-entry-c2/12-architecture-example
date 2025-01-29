import { Component, inject } from '@angular/core';
import { SectionOrdersComponent } from '../../components/section-orders/section-orders.component';
import { IOrders } from '../../../../domain/model/orders.model';
import { Observable } from 'rxjs';
import { GetOrdersUseCase } from '../../../../application/orders/get-orders.usecase';

@Component({
  selector: 'lib-section-orders-content',
  imports: [SectionOrdersComponent],
  templateUrl: './section-orders-content.component.html',
})
export class SectionOrdersContentComponent {
 private readonly _getOrdersUseCase = inject(GetOrdersUseCase);
  public orders$: Observable<IOrders[]>;

  ngOnInit(): void {
    this.orders$ = this._getOrdersUseCase.order$();
    this._getOrdersUseCase.execute();
  }

  ngOnDestroy(): void {
    this._getOrdersUseCase.ngOnDestroy();
  }
}
