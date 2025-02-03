import { Component, Input, OnInit } from '@angular/core';
import { MenusCardsComponent } from "../menus-cards/menus-cards.component";
import { GraphDishComponent } from '../graph-dish/graph-dish.component';
import { GraphOrderComponent } from '../graph-order/graph-order.component';
import { TableClientComponent } from '../table-client/table-client.component';

@Component({
  selector: 'lib-hero-section',
  imports: [ MenusCardsComponent,GraphDishComponent,GraphOrderComponent,TableClientComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent  implements OnInit {
  @Input() menus: any[] = [];
  @Input() orders: any[] = [];
  @Input() clients: any[] = [];
  ngOnInit(): void {
    console.log(this.menus);
  }
  

}
