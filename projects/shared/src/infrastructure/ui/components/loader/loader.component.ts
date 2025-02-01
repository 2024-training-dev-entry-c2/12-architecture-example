import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent{

  showLoader = input<boolean>(false);

}
