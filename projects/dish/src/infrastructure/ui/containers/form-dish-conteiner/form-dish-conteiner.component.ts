import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormDishComponent } from '../../forms/form-dish/form-dish.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IDish } from '../../../../domain/model/dish.model';
import { GetByIdDishUseCase } from '../../../../application/get-by-id-dish.useCase';
import { Observable, of } from "rxjs";
import { AsyncPipe, NgIf } from '@angular/common';
import { UpdateDishUseCase } from '../../../../application/update-dish.useCase';
import { RegisterDishUseCase } from '../../../../application/register-dish.useCase';

@Component({
  selector: 'lib-form-dish-conteiner',
  imports: [FormDishComponent, AsyncPipe, NgIf],
  templateUrl: './form-dish-conteiner.component.html',
  styles: ''
})
export class FormDishConteinerComponent implements OnInit, OnDestroy {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getDishByIdUseCase = inject(GetByIdDishUseCase);
  private updateDishUseCase = inject(UpdateDishUseCase);
  private createDishUseCase = inject(RegisterDishUseCase);

  public idDish?: number;
  public dish: IDish;
  dish$!: Observable<IDish>;

  public title: string;
  public action: string;

  ngOnInit(): void {
    this.updateDishUseCase.initSubscriptions();
    this.getDishByIdUseCase.initSubscriptions();
    this.createDishUseCase.initSubscriptions();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idDish = +idParam;
        this.action = 'update';
        this.title = 'Actualizar Plato';
        this.loadDishData(this.idDish);
      } else {
        this.dish$ = of({} as IDish);
        this.action = 'save';
        this.title = 'Registrar Plato';
      }
    });
  }

  ngOnDestroy(): void {
    this.updateDishUseCase.destroySubscriptions();
    this.getDishByIdUseCase.destroySubscriptions();
    this.createDishUseCase.destroySubscriptions();
  }

  private loadDishData(id: number): void {
    this.getDishByIdUseCase.execute(id);
    this.dish$ = this.getDishByIdUseCase.dish$();
  }

  handleSubmit(dish: IDish) {
    if (this.action === 'update') {
      this.updateDishUseCase.execute(this.idDish, dish).subscribe({
        next: () => this.router.navigate(['platos']),
        error: (err) => console.error('Error al actualizar el plato', err),
      });
    } else {
      this.createDishUseCase.execute(dish).subscribe({
        next: () => this.router.navigate(['platos']),
        error: (err) => console.error('Error al registrar el plato', err),
      });
    }
  }

}
