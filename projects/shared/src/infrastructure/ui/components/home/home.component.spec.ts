import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main element with the correct class', () => {
    const mainElement = fixture.nativeElement.querySelector('main');
    expect(mainElement).toBeTruthy();
    expect(mainElement.classList).toContain('homepage');
  });

  it('should render two background circles', () => {
    const circles = fixture.nativeElement.querySelectorAll('.homepage__background-circle');
    expect(circles.length).toBe(2);
    expect(circles[0].classList).toContain('homepage__background-circle--left');
    expect(circles[1].classList).toContain('homepage__background-circle--right');
  });

  it('should render four images with correct classes and alt texts', () => {
    const images = fixture.nativeElement.querySelectorAll('.homepage__image');
    expect(images.length).toBe(4);

    const expectedClasses = [
      'homepage__image--top-left',
      'homepage__image--top-right',
      'homepage__image--bottom-left',
      'homepage__image--bottom-right'
    ];

    const expectedAltTexts = [
      'Imagen 1',
      'Imagen 2',
      'Imagen 3',
      'Imagen 4'
    ];

    images.forEach((img, index) => {
      expect(img.classList).toContain(expectedClasses[index]);
      expect(img.getAttribute('alt')).toBe(expectedAltTexts[index]);
    });
  });

  it('should render two rows of images', () => {
    const rows = fixture.nativeElement.querySelectorAll('.homepage__row');
    expect(rows.length).toBe(2);
    expect(rows[1].classList).toContain('homepage__row--bottom');
  });
});