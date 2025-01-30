import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'lib-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() images: { id: number; src: string; alt: string }[] = []; // Recibe las imágenes como input
  currentPosition = 0;
  cardWidth = 300;
  visibleCards = 3;

  ngAfterViewInit() {
    this.updateCardWidth();
  }

  @HostListener('window:resize')
  updateCardWidth() {
    const cardElement = document.querySelector('.card') as HTMLElement;
    if (cardElement) {
      this.cardWidth = cardElement.offsetWidth +16; // Ancho de la tarjeta + margen
      this.correctPosition();
    }
  }

  correctPosition() {
    const maxPosition = -(this.images.length - this.visibleCards) * this.cardWidth;
    if (this.currentPosition < maxPosition) {
      this.currentPosition = maxPosition;
    } else if (this.currentPosition > 0) {
      this.currentPosition = 0;
    }
  }

  nextSlide() {
    const maxPosition = -(this.images.length - this.visibleCards) * this.cardWidth;
    if (this.currentPosition > maxPosition) {
      this.currentPosition -= this.cardWidth;
    }
  }

  prevSlide() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.cardWidth;
    }
  }

}
