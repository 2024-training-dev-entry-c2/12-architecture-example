import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { GetNameService } from "../../infrastructure/services/client/get-name.service";
import { IClient } from "../../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class GetNamesUsecase {
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private readonly _service = inject(GetNameService);

  //#region Public Methods

  execute(orderId: number): Observable<IClient> {
      return this._service.execute(orderId).pipe(
        map(client => ({
          ...client,
          name: client ? this.capitalizeFirstPipe.transform(client?.name) : '',
        }))
      )
  }
  //#endregion
}