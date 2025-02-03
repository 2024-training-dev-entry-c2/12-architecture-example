import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetDishesComponent } from '../components/get-dishes/get-dishes.component';
import { GetMenuUseCase } from '../../../application/get-menu.usecase';
import { Observable } from 'rxjs';
import {
  IAddMenuResponse,
  IDish,
  IRestaurant,
} from '../../../domain/model/menu.model';
import { AsyncPipe } from '@angular/common';
import { MenuState } from '../../../domain/state/menu.state';
import { ModalComponent } from 'shared';
import { AddDishUsecase } from '../../../application/add-dish.usecase';
import { UpdateDishUseCase } from '../../../application/update-dish.usecase';
import { DeleteDishUseCase } from '../../../application/delete-dish.usecase';

@Component({
  selector: 'lib-get-menu-container',
  imports: [GetDishesComponent, AsyncPipe],
  templateUrl: './get-menu-container.component.html',
})
export class GetMenuContainerComponent implements OnInit, OnDestroy {
  private readonly _getMenuUseCase = inject(GetMenuUseCase);
  private readonly _addDishUseCase = inject(AddDishUsecase);
  private readonly _updateDishUseCase = inject(UpdateDishUseCase);
  private readonly _deleteDishUseCase = inject(DeleteDishUseCase);
  private readonly menuState = inject(MenuState);
  public restaurant$: Observable<IRestaurant>;
  public menu$: Observable<IAddMenuResponse>;
  public dishes$: Observable<IDish[]>;
  public currentDish$: Observable<IDish>;

  ngOnInit(): void {
    this._getMenuUseCase.initSubscriptions();
    this._addDishUseCase.initSubscriptions();
    this._updateDishUseCase.initSubscriptions();
    this._deleteDishUseCase.initSubscriptions();
    this.getMenu();
    this.restaurant$ = this._getMenuUseCase.restaurant$();
    this.menu$ = this._getMenuUseCase.menu$();
    this.dishes$ = this._addDishUseCase.currentDishes$();
    this.currentDish$ = this._updateDishUseCase.currentDish$();
  }
  getMenu(): void {
    this._getMenuUseCase.execute(1);
  }
  handlePatchMenu({ dish, modal }: { dish: IDish; modal: ModalComponent }) {
    const usecase = dish.id ? this._updateDishUseCase : this._addDishUseCase;
    usecase.execute(dish, modal);
  }
  handleSelectDish(id: number) {
    this._updateDishUseCase.selectDish(id);
  }
  handleDeleteDish(id: number) {
    this._deleteDishUseCase.execute(id);
  }
  ngOnDestroy(): void {
    this._getMenuUseCase.destroySubscriptions();
    this._addDishUseCase.destroySubscriptions();
    this._updateDishUseCase.destroySubscriptions();
    this._deleteDishUseCase.destroySubscriptions();
  }
}
