import { Component, inject } from '@angular/core';
import { GetPlatoUseCase } from '../../../../application/get-menu.usecase';
import { CreatePlatoUseCase } from '../../../../application/create-menu.usecase';
import { DeletePlatoUseCase } from '../../../../application/delete-menu.usecase';
import { UpdatePlatoUseCase } from '../../../../application/update-menu.usecase';
import { IPlato } from '../../../../domain/model/platos.model';
import { Observable } from 'rxjs';
import { PlatoComponentComponent } from '../../components/plato-component/plato-component.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-plato-container',
  imports: [PlatoComponentComponent, AsyncPipe],
  templateUrl: './plato-container.component.html',
})
export class PlatoContainerComponent {
  private readonly _getUseCase = inject(GetPlatoUseCase);
  private readonly _postUseCase = inject(CreatePlatoUseCase);
  private readonly _deleteUseCase = inject(DeletePlatoUseCase);
  private readonly _updateUseCase = inject(UpdatePlatoUseCase);
  public plato$: Observable<IPlato[]>;
  public currentPlato$: Observable<IPlato>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._postUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();
    this.plato$ = this._getUseCase.menus$();
    this.currentPlato$ = this._updateUseCase.currentMenu$();
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._postUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }

  handleCreateOrUpdate(plato: IPlato) {
    const usecase = plato.id ? this._updateUseCase : this._postUseCase;
    usecase.execute(plato);
  }

  handleSelect(plato: IPlato) {
    this._updateUseCase.selectMenu(plato.id);
  }

  handleDelete(id: number) {
    this._deleteUseCase.execute(id);
  }
}
