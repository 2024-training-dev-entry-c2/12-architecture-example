import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ModalComponent } from 'shared';
import { GetAllDishesUsecase } from '../../../../application/get-dish.usecase';
import { DeleteDishUsecase } from '../../../../application/delete-dish.usecase';
import { AddDishUsecase } from '../../../../application/add-dish.usecase';
import { UpdateDishUsecase } from '../../../../application/update-dish.usecase';
import { IDish, IMenu } from '../../../../domain/model/dish.model';
import { DishPageComponent } from '../../components/dish-page/dish-page.component';
import { GetAllMenusUsecase } from 'menu';

@Component({
  selector: 'lib-dish-container',
  imports: [AsyncPipe, DishPageComponent],
  templateUrl: './dish-container.component.html',
})
export class DishContainer implements OnInit, OnDestroy {
  private readonly _getAlluseCase = inject(GetAllDishesUsecase);
  private readonly _deleteDishUseCase = inject(DeleteDishUsecase);
  private readonly _createDishUseCase = inject(AddDishUsecase);
  private readonly _updateDishUseCase = inject(UpdateDishUsecase);
  private readonly _getAllMenususeCase = inject(GetAllMenusUsecase);
  public menus$: Observable<IMenu[]>;
  public dishes$: Observable<IDish[]>;
  public currentDish$: Observable<IDish>;
  protected intervalSub: Subscription;

  ngOnInit(): void {
    this._getAlluseCase.initSubscriptions();
    this._createDishUseCase.initSubscriptions();
    this._updateDishUseCase.initSubscriptions();
    this._getAllMenususeCase.initSubscriptions();
    this._getAllMenususeCase.execute();
    this._getAlluseCase.execute();
    this.menus$ = this._getAllMenususeCase.menus$();
    this.dishes$ = this._getAlluseCase.dishes$();
    this.currentDish$ = this._updateDishUseCase.currentDish$();

    this.intervalSub = interval(500).pipe(switchMap(async () => this._getAlluseCase.execute())).subscribe();
  }

  
  ngOnDestroy(): void {
    this._createDishUseCase.destroySubscriptions();
    this._getAlluseCase.destroySubscriptions();
    this._updateDishUseCase.destroySubscriptions();
    this._getAllMenususeCase.destroySubscriptions();
  }

  handleDish({dish, modal}: {dish: IDish; modal: ModalComponent}){
    const usecase = dish.id ? this._updateDishUseCase : this._createDishUseCase;
    usecase.execute(dish, modal);
    modal.toggle();
  }

  handleDelete(id: number) {
    this._deleteDishUseCase.execute(id);
  }

  handleSelectDish(id: number) {
    this._updateDishUseCase.selectDish(id);
  }

}
