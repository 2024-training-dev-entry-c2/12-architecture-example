import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent } from 'shared';
import { CreateDishUseCase } from '../../../../application/create-dish.usecase';
import { GetDishesUseCase } from '../../../../application/get-dishes.usecase';
import { UpdateDishUseCase } from '../../../../application/update-dish.usecase';
import { IDish } from '../../../../domain/model/dish.model';
import { ListDishesComponent } from '../../components/list-dishes/list-dishes.component';

@Component({
  selector: 'lib-dishes-container',
  imports: [AsyncPipe, ListDishesComponent],
  templateUrl: './dishes-container.component.html',
})
export class DishesContainerComponent {
  private readonly _getUseCase = inject(GetDishesUseCase);
  private readonly _createUseCase = inject(CreateDishUseCase);
  private readonly _updateUseCase = inject(UpdateDishUseCase);

  public dishes$: Observable<IDish[]>;
  public currentDish$: Observable<IDish>;

  //#region lifeCycle methods
  ngOnInit() {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();

    this.dishes$ = this._getUseCase.dishes$();
    this.currentDish$ = this._updateUseCase.currentDish$();
  }

  ngOnDestroy() {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }
  //#endregion

  // #region public methods
  handlePatchDish({ dish, modal }: { dish: IDish; modal: ModalComponent }) {
    const usecase = dish.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(dish, modal);
  }

  handleSelectDish(dishId: number) {
    this._updateUseCase.selectDish(dishId);
  }

  // #endregion
}
