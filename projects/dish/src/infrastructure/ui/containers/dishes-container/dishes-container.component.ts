import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IDishResponse, IDish } from '../../../../domain/model/dish.model';
import { DishesComponent } from '../../components/dishes/dishes.component';
import { ListDishesUsecase } from '../../../../application/dishes/list-dishes.usecase';
import { CreateDishUsecase } from '../../../../application/dishes/create-dish.usecase';
import { UpdateDishUsecase } from '../../../../application/dishes/update-dish.usecase';
import { DeleteDishUsecase } from '../../../../application/dishes/delete-dish.usecase';
import { IMenuResponse } from 'menu';

@Component({
  selector: 'lib-dishes-container',
  imports: [DishesComponent],
  templateUrl: './dishes-container.component.html',
})
export class DishesContainerComponent implements OnInit, OnDestroy {
  private readonly _listUseCase = inject(ListDishesUsecase);
  private readonly _createUseCase = inject(CreateDishUsecase);
  private readonly _updateUseCase = inject(UpdateDishUsecase);
  private readonly _deleteUseCase = inject(DeleteDishUsecase);

  public dishes$: Observable<IDishResponse[][]>;
  public menus$: Observable<IMenuResponse[]>;
  public currentDish$: Observable<IDishResponse>;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._listUseCase.execute();
    this.dishes$ = this._listUseCase.dishResponse$();
    this.menus$ = this._listUseCase.menuResponse$();
    this.currentDish$ = this._updateUseCase.currentDish$();
  }

  createDish(dish: IDish): void {
    const currentDish = this._updateUseCase.snapshotCurrentDish();
    if (!currentDish?.id) {
      this._createUseCase.execute(dish);
    } else {
      this._updateUseCase.execute(currentDish.id, dish);
    }
  }

  deleteDish(dishId: number, index: number): void {
    const menus = this._listUseCase.snapshotMenuResponse();
    const dishes = this._listUseCase.snapshotDishResponse();
    const dish = dishes[index].find((m) => m.id === dishId);
    if (!dish) {
      return;
    }
    const deletedDish: IDish = {
      dishName: dish.dishName,
      description: dish.description,
      basePrice: dish.basePrice,
      isPopular: dish.isPopular,
      menuId: menus[index].id,
      active: false,
    };
    this._deleteUseCase.execute(dishId, deletedDish);
  }

  handleSelectDish(data: { id: number; index: number }): void {
    this._updateUseCase.selectDish(data.id, data.index);
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }
}
