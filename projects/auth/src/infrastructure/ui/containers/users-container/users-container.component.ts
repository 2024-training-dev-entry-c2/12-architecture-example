import { Component, inject } from '@angular/core';
import { UsersComponent } from '../../components/users/users.component';
import { GetUseCase } from '../../../../application/admin/get.usecase';
import { IUser } from '../../../../domain/model/user.model';

@Component({
  selector: 'lib-users-container',
  imports: [UsersComponent],
  templateUrl: './users-container.component.html',
})
export class UsersContainerComponent {
  private readonly _useCase = inject(GetUseCase);
  admins: IUser[] = [];

  ngOnInit(): void {
    this._useCase.initSubscription();
    this.getAdmins();

    this._useCase.admins$().subscribe({
      next: (response) => (this.admins = response),
    });
  }
  ngOnDestroy(): void {
    this._useCase.destroySubscription();
  }

  getAdmins(): void {
    this._useCase.execute();
  }
}
