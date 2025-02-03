import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuFormComponent } from "../../forms/menu-form/menu-form.component";
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { ICreateMenu } from '../../../../domain/model/create.menu.model';

@Component({
  selector: 'lib-create-menu-form-container',
  imports: [MenuFormComponent],
  templateUrl: './create-menu-form-container.component.html',
})
export class CreateMenuFormContainerComponent implements OnInit, OnDestroy {
  private readonly _createMenuUseCase = inject(CreateMenuUseCase)
  ngOnInit(): void {
    this._createMenuUseCase.initSubscriptions();


  }
  ngOnDestroy(): void {
    this._createMenuUseCase.destroySubscriptions();
  }

  handleSubmit(menu: ICreateMenu): void {
    this._createMenuUseCase.execute(menu);
  }

}
