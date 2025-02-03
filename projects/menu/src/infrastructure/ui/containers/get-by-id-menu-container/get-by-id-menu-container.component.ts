import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormByIdMenuComponent } from '../../forms/form-by-id-menu/form-by-id-menu.component';
import { IMenu } from '../../../../domain/model/menu.model';
import { GetByIdMenuUseCase } from '../../../../application/get-by-id-menu.useCase';
import { Observable, Subscription } from "rxjs";
import { GetByIdMenuCompComponent } from '../../components/get-by-id-menu-comp/get-by-id-menu-comp.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-get-by-id-menu-container',
  imports: [FormByIdMenuComponent, GetByIdMenuCompComponent, AsyncPipe],
  templateUrl: './get-by-id-menu-container.component.html',
  styles: ''
})
export class GetByIdMenuContainerComponent implements OnInit, OnDestroy {
  private getByIdUseCase = inject(GetByIdMenuUseCase);
  public menu: IMenu;
  menu$!: Observable<IMenu>;
  private subscription: Subscription;

  ngOnInit(): void {
    this.getByIdUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.getByIdUseCase.destroySubscriptions();
    this.subscription?.unsubscribe();
  }

  handleGetId(id: number) {
    this.getByIdUseCase.execute(id);
    this.menu$ = this.getByIdUseCase.menu$();

    this.subscription = this.menu$.subscribe(menu => {
      this.menu = menu;
    });
  }
}
