import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-header-shared',
  imports: [RouterLink],
  templateUrl: './header-shared.component.html',
  styleUrl: './header-shared.component.scss',
})
export class HeaderSharedComponent {}
