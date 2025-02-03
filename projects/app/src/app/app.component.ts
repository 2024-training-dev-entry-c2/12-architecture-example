import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers:[{provide: LOCALE_ID, useValue: 'es'}],
  template: '<router-outlet/>'
})
export class AppComponent {
}
import { Component, input, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet /> <p>{{title()}}</p> <button (click)="handleClick()">Click me</button>',
})
export class AppComponent {
  title = input<string>();
  onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
