import { Component, inject } from '@angular/core';
import { GetAllMenusUseCase } from '../../../../application/get-all-menus.usecase';
import { ModalUseCase } from '../../../../application/modal.usecase';
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuFormComponent } from "../../forms/menu-form/menu-form.component";
import { AnimationWrapperComponent, ModalComponent, TableComponent } from 'shared';

@Component({
  selector: 'lib-menu',
  imports: [AnimationWrapperComponent, TableComponent, AsyncPipe, ReactiveFormsModule, CommonModule, ModalComponent, MenuFormComponent],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  private readonly _useCaseGet = inject(GetAllMenusUseCase);
  private readonly _useCaseModal = inject(ModalUseCase);
  private readonly _useCaseCreate = inject(CreateMenuUseCase);
  private readonly _useCaseUpdate = inject(UpdateMenuUseCase);
  private readonly _useCaseDelete = inject(DeleteMenuUseCase);

  public menus$: Observable<IMenu[]>
  public isModalOpen$: Observable<boolean>;
  public selectedMenu$: Observable<IMenu>;
  public message$: Observable<string>;

    ngOnInit(): void {
      this._useCaseCreate.initSubscriptions();
      this._useCaseUpdate.initSubscriptions();
      this._useCaseGet.initSubscriptions();
      this._useCaseDelete.initSubscriptions();
      this._useCaseModal.initSubscriptions();
      this._useCaseGet.execute();
      this.menus$ = this._useCaseGet.menu$();
      this.selectedMenu$ = this._useCaseUpdate.currentMenu$();
      this.isModalOpen$ = this._useCaseModal.openModal$();
      this.message$ = this._useCaseCreate.message$();
    }
  
    ngOnDestroy(): void {
      this._useCaseCreate.destroySubscriptions();
      this._useCaseUpdate.destroySubscriptions
      this._useCaseGet.destroySubscriptions();
      this._useCaseModal.destroySubscriptions();
      this._useCaseDelete.destroySubscriptions();
    }
  
    public columns = [
      { field: 'name', header: 'Nombre del Menú' },
      { field: 'description', header: 'Descripción' },

    ]
  
    openModal(event: boolean) {
      this._useCaseModal.execute(event);
    }
  
    public submit(menu: IMenu) {
      console.log(menu);
      const usecase = menu.id ? this._useCaseUpdate : this._useCaseCreate;
      usecase.execute(menu);
    }
  
    public updateMenuById(menuId: number): void {
      this._useCaseUpdate.selectMenu(menuId);
    }
  
    public deleteMenuById(menuId: number): void {
      this._useCaseDelete.execute(menuId);
    }
}
