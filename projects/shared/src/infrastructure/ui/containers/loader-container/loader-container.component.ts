import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';
import { Subscription } from 'rxjs';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'lib-loader-container',
  imports: [LoaderComponent],
  templateUrl: './loader-container.component.html',
})
export class LoaderContainerComponent implements OnDestroy {

  showLoader: boolean = false;
  private loaderSubscription: Subscription;
  constructor(private loaderService: LoaderService) {
    this.loaderSubscription = this.loaderService.loading$.subscribe(loading => {
      this.showLoader = loading;
    })
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }

}
