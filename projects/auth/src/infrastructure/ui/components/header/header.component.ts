import { Component, input, output } from '@angular/core';
import { IAdmin } from '../../../../domain/model/admin.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  admin = input<IAdmin>();
  onLogout = output();

  logout() {
    this.onLogout.emit();
  }
}
