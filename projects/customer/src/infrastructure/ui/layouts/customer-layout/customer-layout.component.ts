import { Component } from '@angular/core';
import { MainLayoutComponent } from 'shared';

@Component({
  selector: 'lib-customer-layout',
  imports: [MainLayoutComponent],
  template: '<lib-main-layout><lib-main-layout>',
})
export class CustomerLayoutComponent {}
