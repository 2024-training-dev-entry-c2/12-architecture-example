import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { LogoutUseCase } from '../../../../application/admin/logout.usecase';
import { LoginUseCase } from '../../../../application/admin/login.usecase';
import { Observable } from 'rxjs';
import { IAdmin } from '../../../../domain/model/admin.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-header-container',
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './header-container.component.html',
})
export class HeaderContainerComponent {
  private readonly _useCase = inject(LoginUseCase);
  private readonly _logoutUseCase = inject(LogoutUseCase);
  public admin$: Observable<IAdmin>;

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.admin$ = this._useCase.admin$();
  }

  onLogout() {
    this._logoutUseCase.execute();
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }
}
