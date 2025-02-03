import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from '../../components/aside/aside.component';

@Component({
  selector: 'lib-main-layout',
  imports: [RouterOutlet, AsideComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
