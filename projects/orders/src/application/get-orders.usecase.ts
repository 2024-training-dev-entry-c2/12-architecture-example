import { inject, Injectable } from "@angular/core";
import { GetOrderService } from "../infrastructure/services/get/get-order.service";
import { State } from "../domain/state";
import { Observable, tap } from "rxjs";
import { IOrder } from "../domain/model/order.model";

@Injectable({
    providedIn:'root'
})
export class GetOrderUseCase{
    private readonly _service = inject(GetOrderService);
    private readonly _state = inject(State);

    execute(id:number): Observable<IOrder>{
        return this._service.getOrderId(id).pipe(
            tap((order)=>{
                this._state.orders.order.set(order);
            })
        )
    }
}