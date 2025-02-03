import { Component, inject } from '@angular/core';
import { DishesSectionComponent } from '../../components/dishes-section/dishes-section.component';
import { Observable } from 'rxjs';
import { ListDishesUsecase } from '../../../../application/dishes/list-dishes.usecase';
import { CreateDishUsercase } from '../../../../application/dishes/create-dish.usecase';
import { UpdateDishUsecase } from '../../../../application/dishes/update-dish.usecase';
import { DeleteDishUsecase } from '../../../../application/dishes/delete-dish.usecase';
import { IDish } from '../../../../domain/model/dish.model';
import { IMenu, ListMenusUsecase } from 'menus';
import { ModalComponent } from 'shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-dishes-container',
  imports: [DishesSectionComponent, AsyncPipe],
  providers : [ListDishesUsecase, ListMenusUsecase, CreateDishUsercase, UpdateDishUsecase, DeleteDishUsecase],
  templateUrl: './dishes-container.component.html',
  styleUrl: './dishes-container.component.scss'
})
export class DishesContainerComponent {
  public dishes$: Observable<IDish[]>;
  public menus$: Observable<IMenu[]>;
  public currentDish$: Observable<IDish>;
  private _listUsecase = inject(ListDishesUsecase);
  private _listMenusUsecase = inject(ListMenusUsecase);
  private _createUsecase = inject(CreateDishUsercase);
  private _updateUsecase = inject(UpdateDishUsecase);
  private _deleteUsecase = inject(DeleteDishUsecase);

  ngOnInit(): void {
    this.initSubscriptions();    
    this._listUsecase.execute();
    this._listMenusUsecase.execute();

    this.menus$ = this._listMenusUsecase.menus$();
    this.dishes$ = this._listUsecase.dishes$();

    this.currentDish$ = this._updateUsecase.currentDish$();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  handlePatchDish({dish, modal}:{dish: IDish; modal: ModalComponent}){
    const usecase= dish.id ? this._updateUsecase : this._createUsecase;
    usecase.execute(dish, modal);
  }

  handleSelectUpdateDish(id : number){
    this._updateUsecase.selectDish(id);
  }

  handleDeleteDish(id: number){
    this._deleteUsecase.execute(id);
  }

  initSubscriptions(){
    this._listUsecase.initSubscriptions();
    this._listMenusUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();    
    this._updateUsecase.initSubscriptions();    
    this._deleteUsecase.initSubscriptions();    
  }

  destroySubscriptions(){
    this._listUsecase.destroySubscriptions();
    this._listMenusUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
    this._updateUsecase.destroySubscriptions();    
    this._deleteUsecase.destroySubscriptions(); 
  }
}
