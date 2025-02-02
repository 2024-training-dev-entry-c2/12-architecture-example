import { Component, input } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { IUser } from '../../../../domain/model/user.model';

@Component({
  selector: 'lib-users',
  imports: [UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users = input<IUser[]>();
}
