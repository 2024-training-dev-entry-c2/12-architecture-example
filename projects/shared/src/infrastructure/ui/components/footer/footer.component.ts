import { Component } from '@angular/core';

@Component({
  selector: 'lib-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {


  currentYear: number = new Date().getFullYear();

}
