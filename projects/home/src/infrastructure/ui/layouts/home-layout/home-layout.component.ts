import { Component } from '@angular/core';
import { MainLayoutComponent } from 'shared';

@Component({
  selector: 'lib-home-layout',
  imports: [MainLayoutComponent],
  template: '<lib-main-layout><lib-main-layout>',
})
export class HomeLayoutComponent {}
