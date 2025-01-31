import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UpdateDishUsecase } from '../../../../application/update-dish.usecase';
import { GetDishUsecase } from '../../../../application/get-client.usecase';

import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UpdateDishFormComponent } from "../../forms/update-dish-form/update-dish-form.component";
import { IDish, IDishRequest } from '../../../../public-api';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-update-dish',
  imports: [UpdateDishFormComponent, AsyncPipe],
  templateUrl: './update-dish.component.html',
})
export class UpdateDishComponent implements OnInit, OnDestroy {
  private readonly __useCaseUpdate = inject(UpdateDishUsecase);
  private readonly __useCaseGet = inject(GetDishUsecase);
  public currentDish: Observable<IDish>;
  dish: IDish | null = null;
  dishId: number = 0;
  menuId: number = 0;
  constructor(private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    
    this.menuId = Number(this.route.snapshot.paramMap.get('menuId')) || 0;
    this.dishId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.__useCaseUpdate.initSubscriptions();
    this.__useCaseGet.initSubscriptions();
    this.__useCaseUpdate.selectDish(1);
    this.currentDish = this.__useCaseUpdate.currentDish$();
    console.log(this.currentDish);

  }

  UpdateDish(dish: IDishRequest) {
      dish.menuId= this.menuId;
    this.__useCaseUpdate.execute(dish, this.dishId);
   
  }
  ngOnDestroy(): void {
    this.__useCaseUpdate.destroySubscriptions();
    this.__useCaseGet.destroySubscriptions();
  }
}
