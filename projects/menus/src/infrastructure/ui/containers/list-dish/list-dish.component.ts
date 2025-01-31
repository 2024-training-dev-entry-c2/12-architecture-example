import { Component, inject, Input, input, Output } from '@angular/core';
import { CreateDishUsecase, IDish, IDishRequest, ListDishesUseCase, RemoveDishUsecase, UpdateDishUsecase } from 'dishes';
import { GetMenusListUseCase, IMenu } from '../../../../public-api';
import { Observable } from 'rxjs';

import { TableDishComponent } from '../../components/table-dish/table-dish.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-list-dish',
  imports: [TableDishComponent, AsyncPipe],
  templateUrl: './list-dish.component.html',

})
export class ListDishComponent {
  private readonly __useCaseMenus = inject(GetMenusListUseCase);
  private readonly __useCaseRemoveDish = inject(RemoveDishUsecase);
  private readonly __useCaseUpdate = inject(UpdateDishUsecase);
  private readonly __useCasecreate = inject(CreateDishUsecase);
  private readonly __useCaseDishs= inject(ListDishesUseCase);
  @Input() menuSelected: number
  public menus: Observable<IMenu[]>;
  public dishes: Observable<IDish[]>;
  public currentDish$: Observable<IDish>;

  ngOnInit(): void {
    this.__useCaseMenus.initSubscriptions();
    this.__useCasecreate.initSubscriptions();
    this.__useCaseUpdate.initSubscriptions();
    this.__useCaseDishs.initSubscriptions();
    this.__useCaseMenus.execute();
    this.__useCaseDishs.execute();
    this.menus = this.__useCaseMenus.menus$();
    this.dishes = this.__useCaseDishs.dishes$();
    this.currentDish$ = this.__useCaseUpdate.currentDish$();
  }  
  ngOnDestroy(): void {
    this.__useCaseMenus.destroySubscriptions();
    this.__useCasecreate.destroySubscriptions();
    this.__useCaseUpdate.destroySubscriptions();
    this.__useCaseDishs.destroySubscriptions();
  }
  handleCreateDish(dish: IDishRequest) {
    this.__useCasecreate.execute(dish);
  }
  handleUpdateDish({ dish, id }: { dish: IDishRequest; id: number }) {
    console.log(dish);
    console.log(id);

    
    this.__useCaseUpdate.execute(dish, id);
  }

  removeDish(id: number) {
    this.__useCaseRemoveDish.execute(id);
  }

  setDish(dish: number) {
    
    this.__useCaseUpdate.selectDish(dish)

    
  }
}
