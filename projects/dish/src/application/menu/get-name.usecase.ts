import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { IMenu } from "../../domain/model/menu.model";
import { GetNameService } from "../../infrastructure/services/menu/get-name.service";

@Injectable({
  providedIn: 'root'
})
export class GetNamesUsecase {
  private readonly _service = inject(GetNameService);
  private capitalizeFirstPipe = new CapitalizeFirstPipe();

  //#region Public Methods

  execute(dishId: number): Observable<IMenu> {
    return this._service.execute(dishId).pipe(
      map(menu => ({
        ...menu,
        name: menu ? this.capitalizeFirstPipe.transform(menu?.name) : '',
      }))
    )
  }
  //#endregion
}