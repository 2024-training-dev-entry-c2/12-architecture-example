import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { ICustomer } from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersState{
  private readonly _factory = inject(StateFactory);
  private readonly customers$ = new BehaviorSubject<ICustomer[]>([]);
  private readonly currentCustomer$ = new BehaviorSubject<ICustomer>(null);

  store(){
    return{
      customers: this._factory.state(this.customers$),
      currentCustomer: this._factory.state(this.currentCustomer$)
    }
  }

}
