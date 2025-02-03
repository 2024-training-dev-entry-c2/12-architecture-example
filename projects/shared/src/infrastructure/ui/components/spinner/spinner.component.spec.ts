import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    component.images = [
      { id: 1, src: 'https://picsum.photos/300/300', alt: 'Imagen 1' },
      { id: 2, src: 'https://picsum.photos/300/300', alt: 'Imagen 2' },
      { id: 3, src: 'https://picsum.photos/300/300', alt: 'Imagen 3' },
      { id: 4, src: 'https://picsum.photos/300/300', alt: 'Imagen 4' },
      { id: 5, src: 'https://picsum.photos/300/300', alt: 'Imagen 5' },
      { id: 6, src: 'https://picsum.photos/300/300', alt: 'Imagen 6' },
      { id: 7, src: 'https://picsum.photos/300/300', alt: 'Imagen 7' },
      { id: 8, src: 'https://picsum.photos/300/300', alt: 'Imagen 8' },
      { id: 9, src: 'https://picsum.photos/300/300', alt: 'Imagen 9' },
      { id: 10, src: 'https://picsum.photos/300/300', alt: 'Imagen 10' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner component', () => {
    const spinnerElement = fixture.debugElement.query(
      By.css('.slider__container')
    );
    expect(spinnerElement).toBeTruthy();
  });
  it('should initialize images input correctly', () => {
    expect(component.images.length).toBe(10);
    expect(component.images[0].src).toBe('https://picsum.photos/300/300');
  });

  it('should move to next slide correctly', () => {
    component.currentPosition = 0;
    component.nextSlide();
    expect(component.currentPosition).toBe(-component.cardWidth);
  });

  it('should not move previous if at the first slide', () => {
    component.currentPosition = 0;
    component.prevSlide();
    expect(component.currentPosition).toBe(0);
  });

  it('should render the correct number of images', () => {
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('.card-image'));
    expect(images.length).toBe(10);
  });
  
  it('should call nextSlide on right button click', () => {
    spyOn(component, 'nextSlide');
    const button = fixture.debugElement.query(By.css('.slider-btn.right'));
    button.triggerEventHandler('click', null);
    expect(component.nextSlide).toHaveBeenCalled();
  });
});
