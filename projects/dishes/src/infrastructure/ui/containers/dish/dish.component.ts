import { Component, inject } from '@angular/core';
import { GetAllDishesUseCase } from '../../../../application/get-all-dishes.usecase';
import { ModalUseCase } from '../../../../application/modal.usecase';
import { CreateDishUseCase } from '../../../../application/create-dish.usecase';
import { DeleteDishUseCase } from '../../../../application/delete-dish.usecase';
import { UpdateDishUseCase } from '../../../../application/update-dish.usecase';
import { IDish } from '../../../../domain/model/dish.model';
import { Observable } from 'rxjs';
import { GetMenusUsecase } from '../../../../application/get-menus.usecase';
import { IMenu } from '../../../../domain/model/menu.model';
import { AnimationWrapperComponent, ModalComponent, TableComponent } from 'shared';
import { DishFormComponent } from "../../forms/dish-form/dish-form.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-dish',
  imports: [AnimationWrapperComponent, ModalComponent, TableComponent, DishFormComponent, AsyncPipe],
  templateUrl: './dish.component.html',
})
export class DishComponent {
  private readonly _useCaseGet = inject(GetAllDishesUseCase);
  private readonly _useCaseModal = inject(ModalUseCase);
  private readonly _useCaseCreate = inject(CreateDishUseCase);
  private readonly _useCaseUpdate = inject(UpdateDishUseCase);
  private readonly _useCaseDelete = inject(DeleteDishUseCase);
  private readonly _useCaseGetMenus = inject(GetMenusUsecase);

  public dishes$: Observable<IDish[]>
  public menus$: Observable<IMenu[]>
  public isModalOpen$: Observable<boolean>;
  public selectedDish$: Observable<IDish>;
  public message$: Observable<string>;

  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'menuName', header: 'Pertenece al Menú' },
    { field: 'description', header: 'Descripción' },
    { field: 'price', header: 'Precio' },
    { field: 'dishType', header: 'Tipo de Plato' },
  ]
  
  ngOnInit(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseModal.initSubscriptions();
    this._useCaseGetMenus.initSubscriptions();
    this._useCaseGet.execute();
    this._useCaseGetMenus.execute();
    this.dishes$ = this._useCaseGet.dish$();
    this.selectedDish$ = this._useCaseUpdate.currentDish$();
    this.isModalOpen$ = this._useCaseModal.openModal$();
    this.message$ = this._useCaseCreate.message$();
    this.menus$ = this._useCaseGetMenus.menus$();
  }

  ngOnDestroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions
    this._useCaseGet.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
  }


  openModal(event: boolean) {
    this._useCaseModal.execute(event);
  }

  public submit(dish: IDish) {
    const usecase = dish.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(dish);
  }

  public updateDishById(dishId: number): void {
    this._useCaseUpdate.selectDish(dishId);
  }

  public deleteDishById(dishId: number): void {
    this._useCaseDelete.execute(dishId);
  }

}
