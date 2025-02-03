import { Component, inject, input } from '@angular/core';
import { LoaderService } from '../../../services/utils/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isVisible: boolean = false;
  loaderService = inject(LoaderService);
  
  constructor() {
    this.loaderService.show$.subscribe(isVisible => this.isVisible = isVisible);
  }

}