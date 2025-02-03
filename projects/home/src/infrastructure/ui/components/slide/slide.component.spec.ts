import { TestBed } from '@angular/core/testing';
import { SlideComponent } from './slide.component';

describe('SlideComponent', () => {
  it('images', () => {
    const fixture = TestBed.createComponent(SlideComponent);
    const app = fixture.componentInstance;

    expect(app.images).toEqual([
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
    ]);
  });

  it('imagesBebidas', () => {
    const fixture = TestBed.createComponent(SlideComponent);
    const app = fixture.componentInstance;

    expect(app.imagesBebidas).toEqual([
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
    ]);
  });
});
