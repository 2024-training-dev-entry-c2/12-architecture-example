import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true,
})
export class LoaderComponent {
  isVisible = input<boolean>(true);
}
