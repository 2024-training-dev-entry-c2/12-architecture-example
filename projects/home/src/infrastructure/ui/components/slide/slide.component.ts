import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-slide',
  imports: [],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {

  public images = [
    {
      src: 'https://marketplace.canva.com/EAGOADQey2g/1/0/1600w/canva-brown-simple-circle-restaurant-logo-BiB84MUi2zQ.jpg',
      alt: 'Plato Frijoles',
    },
    {
      src: 'https://marketplace.canva.com/EAGOADQey2g/1/0/1600w/canva-brown-simple-circle-restaurant-logo-BiB84MUi2zQ.jpg',
      alt: 'Casuela fija',
    },
    {
      src: 'https://marketplace.canva.com/EAGOADQey2g/1/0/1600w/canva-brown-simple-circle-restaurant-logo-BiB84MUi2zQ.jpg',
      alt: 'Sopa de pollo',
    },
  ];
  public imagesBebidas = [
    {
      src: 'https://marketplace.canva.com/EAGOADQey2g/1/0/1600w/canva-brown-simple-circle-restaurant-logo-BiB84MUi2zQ.jpg',
      alt: 'Agua',
    },
    {
      src: 'https://marketplace.canva.com/EAGOADQey2g/1/0/1600w/canva-brown-simple-circle-restaurant-logo-BiB84MUi2zQ.jpg',
      alt: 'Coca-cola',
    },
    {
      src: 'https://marketplace.canva.com/EAGOADQey2g/1/0/1600w/canva-brown-simple-circle-restaurant-logo-BiB84MUi2zQ.jpg',
      alt: 'Cerveza',
    },
  ];

}
