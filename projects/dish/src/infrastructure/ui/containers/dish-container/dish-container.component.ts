import { Component, inject } from '@angular/core';
import { ModalComponent } from 'shared';
import { DeleteDishUseCase } from '../../../../application/delete-dish.usecase';
import { GetDishesUseCase } from '../../../../application/get-dishes.usecase';
import { UpdateDishUseCase } from '../../../../application/update-dish.usecase';
import { Idish } from '../../../../domain/model/dish.model';
import { CreateDishesUseCase } from '../../../../application/create-dishes.usecase';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PanelDishComponent } from '../../components/panel-dish/panel-dish.component';

@Component({
  selector: 'lib-dish-container',
  imports: [AsyncPipe, PanelDishComponent],
  templateUrl: './dish-container.component.html',
  styleUrl: './dish-container.component.scss',
})
export class DishContainerComponent {


  private readonly _getDishCase = inject(GetDishesUseCase)
  private readonly _createUseCase = inject(CreateDishesUseCase)
  private readonly _updateUseCase = inject(UpdateDishUseCase)
  private readonly _deleteUseCase = inject(DeleteDishUseCase)
  public dishs$:Observable<Idish[]>;
  public currentDish$: Observable<Idish>;


  ngOnInit(): void {
    this._getDishCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._getDishCase.execute();
    this.dishs$ = this._getDishCase.dishes$()
    this.currentDish$ = this._updateUseCase.dishCurrent$();

  }

  ngOndestroy():void{
    this._getDishCase.destroySubscriptions();
  }

  hanglePatchDish(dish: Idish) {
    const usecase = dish.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(dish);
  }

  handleSelectDish(id: number) {
    this._updateUseCase.selectDish(id);
  }

  handleDeleteDish(id: number) {
    console.log("funcion para borrar dish", id);

    this._deleteUseCase.execute(id);
  }

}
