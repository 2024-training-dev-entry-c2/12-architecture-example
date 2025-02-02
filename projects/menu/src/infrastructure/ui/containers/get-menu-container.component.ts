import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetDishesComponent } from "../components/get-dishes/get-dishes.component";
import { GetMenuUseCase } from '../../../application/get-menu.usecase';
import { Observable } from 'rxjs';
import { IAddMenuResponse, IDish, IRestaurant } from '../../../domain/model/menu.model';
import { AsyncPipe } from '@angular/common';
import { MenuState } from '../../../domain/state/menu.state';
import { ModalComponent } from 'shared';
import { AddDishUsecase } from '../../../application/add-dish.usecase';

@Component({
  selector: 'lib-get-menu-container',
  imports: [GetDishesComponent, AsyncPipe],
  templateUrl: './get-menu-container.component.html',

})
export class GetMenuContainerComponent implements OnInit, OnDestroy{
  private readonly _getMenuUseCase = inject(GetMenuUseCase);
  private readonly _addDishUseCase = inject(AddDishUsecase);
  private readonly menuState = inject(MenuState);
  public restaurant$ : Observable<IRestaurant>;
  public menu$ : Observable<IAddMenuResponse>;
  public dishes$ : Observable<IDish[]>;

  ngOnInit(): void {
    this._getMenuUseCase.initSubscriptions();
    this.getMenu();
    this.restaurant$ = this._getMenuUseCase.restaurant$();
    this._addDishUseCase.initSubscriptions();
    this.menu$ = this._getMenuUseCase.menu$();
    this.dishes$ = this._addDishUseCase.currentDishes$();

  }
  getMenu(): void {
    this._getMenuUseCase.execute(1);
  }
  handlePatchMenu({ dish, modal }: { dish: IDish; modal: ModalComponent }) {
     this._addDishUseCase.execute(dish, modal);

    }
  ngOnDestroy(): void {
    this._getMenuUseCase.destroySubscriptions();
    this._addDishUseCase.destroySubscriptions();
  }

}
