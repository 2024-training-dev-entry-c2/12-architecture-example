import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { LoadingService } from '../../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-loading',
  imports: [LoadingScreenComponent],
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit, OnDestroy {
  private readonly _loadingService = inject(LoadingService);
  private subscription: Subscription | undefined;

  isLoading = false;

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this._loadingService.loading$.subscribe((loading) => {
        this.isLoading = loading;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
