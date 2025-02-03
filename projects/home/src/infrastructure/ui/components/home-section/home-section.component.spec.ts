import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionComponent } from './home-section.component';
import { By } from '@angular/platform-browser';
import { SpinnerComponent } from 'shared';

describe('HomeSectionComponent', () => {
  let component: HomeSectionComponent;
  let fixture: ComponentFixture<HomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have images defined', () => {
    expect(component.images).toBeDefined();
    expect(component.images.length).toBeGreaterThan(0);
  });
  it('should render the hero section', () => {
    const heroElement = fixture.debugElement.query(By.css('lib-hero-section'));
    expect(heroElement).toBeTruthy();
  });

  it('should render the menu section', () => {
    const menuElement = fixture.debugElement.query(By.css('.options'));
    expect(menuElement).toBeTruthy();
    expect(menuElement.nativeElement.querySelector('h2').textContent).toContain('Our Menu');
  });

  it('should render the gallery section with SpinnerComponent', () => {
    const galleryElement = fixture.debugElement.query(By.css('.gallery'));
    expect(galleryElement).toBeTruthy();
    const spinnerElement = fixture.debugElement.query(By.directive(SpinnerComponent));
    expect(spinnerElement).toBeTruthy();
  });

});
