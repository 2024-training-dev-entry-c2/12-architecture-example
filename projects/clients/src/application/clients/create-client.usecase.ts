import { inject, Injectable } from "@angular/core";
import { CreateClientService } from "../../infrastructure/services/create-client.service";
import { State } from "../../domain/state";
import { IClients } from "../../domain/model/clients.model";

@Injectable({
    providedIn: 'root'
})

export class CreateClientUseCase{
   
    private readonly _service = inject(CreateClientService);
    private readonly _state = inject(State);

    // execute(client:  IClients): void{
    //     this._service.createClient(client);

    // }



}