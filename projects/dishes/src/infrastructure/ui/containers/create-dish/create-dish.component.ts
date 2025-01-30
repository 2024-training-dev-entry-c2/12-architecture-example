import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CreateDishUsecase } from '../../../../application/create-dish.usecase';
import { CreateDishFormComponent } from '../../forms/create-dish-form/create-dish-form.component';
import { Observable } from 'rxjs';
import { IDish, IDishRequest } from '../../../../public-api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lib-create-dish',
  imports: [CreateDishFormComponent],
  templateUrl: './create-dish.component.html',
})

export class CreateDishComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  getMenuid: number = 0;
  private readonly __useCase = inject(CreateDishUsecase);
  public dish$: Observable<IDish>;
  ngOnInit(): void {
    this.getMenuid = Number(this.route.snapshot.paramMap.get('menuId')) || 0;
    console.log(this.getMenuid);
    this.__useCase.initSubscriptions();
    this.dish$ = this.__useCase.dish$();
  }
  ngOnDestroy(): void {
    this.__useCase.destroySubscriptions();
  }

  createDish(dish: IDishRequest): void {
    dish.menuId = this.getMenuid;
    this.__useCase.execute(dish);
  }
}
