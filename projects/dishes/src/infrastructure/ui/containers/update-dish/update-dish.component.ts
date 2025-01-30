import { Component, inject, OnInit } from '@angular/core';
import { UpdateDishUsecase } from '../../../../application/update-dish.usecase';
import { GetDishUsecase } from '../../../../application/get-client.usecase';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { UpdateDishFormComponent } from "../../forms/update-dish-form/update-dish-form.component";
import { IDish, IDishRequest } from '../../../../public-api';

@Component({
  selector: 'lib-update-dish',
  imports: [UpdateDishFormComponent],
  templateUrl: './update-dish.component.html',
})
export class UpdateDishComponent implements OnInit {
  private readonly __useCaseUpdate = inject(UpdateDishUsecase);
  private readonly __useCaseGet = inject(GetDishUsecase);
  dish: IDish | null = null;
  dishId: number = 0;
  menuId: number = 0;
  constructor(private route: ActivatedRoute) {}
  private readonly destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.menuId = Number(this.route.snapshot.paramMap.get('menuId')) || 0;
    this.dishId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.getDish(this.dishId);
  }

  getDish(id: number) {
    this.__useCaseGet.execute(id).subscribe({
      next: (dish: any) => {
        this.dish = dish;
        console.log(this.dish);
        
      },
      error: (err) => {
        console.error('Error al obtener dish:', err);
      },
    });
  }
  UpdateDish(dish: IDishRequest) {
      dish.menuId= this.menuId;
    this.__useCaseUpdate.execute(dish, this.dishId);
   
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
