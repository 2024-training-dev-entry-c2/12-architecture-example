import { Component } from '@angular/core';
import { delay, of, tap } from 'rxjs';
import { LoaderComponent } from 'shared';

@Component({
  selector: 'lib-dashboard',
  imports: [LoaderComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  loader: boolean = false;
  constructor() {
    of(1)
      .pipe(
        tap(() => (this.loader = true)),
        delay(1500),
        tap(() => {
          this.loader = false;
        })
      )
      .subscribe();
  }
}
