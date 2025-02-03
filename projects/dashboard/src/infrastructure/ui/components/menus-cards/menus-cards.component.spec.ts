import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusCardsComponent } from './menus-cards.component';
import { By } from '@angular/platform-browser';

describe('MenusCardsComponent', () => {
  let component: MenusCardsComponent;
  let fixture: ComponentFixture<MenusCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenusCardsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('menu$', [
      { name: 'Menu 1', dishfoods: [{ id: 1, orderList: [] }] },
    ]);
    fixture.componentRef.setInput('order$', [
      { localDate: new Date(), dishfoodIds: [1], orderList: [{}, {}] },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call nextSlide and update currentPosition', () => {
    component.cardWidth = 100;
    component.currentPosition = 0;
    component.visibleCards = 3;
    component.cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'];

    component.nextSlide();
    expect(component.currentPosition).toBe(-100);
  });
  it('should call prevSlide and update currentPosition', () => {
    component.cardWidth = 100;
    component.currentPosition = -200;
    component.visibleCards = 3;
    component.cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'];

    component.prevSlide();
    expect(component.currentPosition).toBe(-100);
  });
  it('should update card width on window resize', () => {
    const spy = spyOn(component, 'updateCardWidth');
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });
  it('should update card width on window resize', () => {
    const spy = spyOn(component, 'updateCardWidth');
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });


});
