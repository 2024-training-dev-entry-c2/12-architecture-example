import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFacotory } from 'shared';
import { Idish } from '../../../../dish/src/domain/model/dish.model';

@Injectable({providedIn: 'root'})
export class ServiceNameService {

  private readonly _factory = inject(StateFacotory);

  //#region states de menu
  private readonly menus$ = new BehaviorSubject<Idish[]>([])
  //#endregion

}