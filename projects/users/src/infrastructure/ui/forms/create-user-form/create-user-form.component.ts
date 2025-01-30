import { Component, output } from '@angular/core';
import { IUser } from '../../../../domain/model/users.model';

@Component({
  selector: 'lib-create-user-form',
  imports: [],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css'
})
export class CreateUserFormComponent {
  onSubmit = output<IUser>();

  submit(): void {
    this.onSubmit.emit({ id: 1, name: 'Test User' });
  }
}
