import { inject, Injectable } from "@angular/core";
import { CreateClientService } from "../../infrastructure/services/create-client.service";
import { State } from "../../domain/state";
import { IClients } from "../../domain/model/clients.model";
import { Observable, Subscription, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class CreateClientUseCase{
   
    private readonly _service = inject(CreateClientService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    
    client$(): Observable<IClients[]> {
      return this._state.clients.client.$();
    }
  

    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }
  
    execute(client: IClients): void {
      this.subscriptions.add(
        this._service.createClient(client)
          .pipe(
            tap(result => {
                this._state.clients.client.set([...this._state.clients.client.snapshot(), result]);
            })
          )
          .subscribe()
      );
    }
}