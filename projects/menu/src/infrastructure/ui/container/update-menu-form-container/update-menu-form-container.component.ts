import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UpdateMenuFormComponent } from "../../forms/update-menu-form/update-menu-form.component";
import { ICreateMenu } from '../../../../domain/model/create.menu.model';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-update-menu-form-container',
  imports: [UpdateMenuFormComponent],
  templateUrl: './update-menu-form-container.component.html'
})
export class UpdateMenuFormContainerComponent implements OnInit, OnDestroy {
  private readonly _updateMenuUseCase = inject(UpdateMenuUseCase);

  menuId : number = 0;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.menuId = params['id']);
    this._updateMenuUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._updateMenuUseCase.destroySubscriptions();
  }
  handleOnSubmit(body: ICreateMenu): void {
    this._updateMenuUseCase.execute(this.menuId,body);
    this.router.navigate(['/dashboard/menu/view']);
  }

}
