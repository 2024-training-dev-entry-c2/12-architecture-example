import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusCardsComponent } from './menus-cards.component';

describe('MenusCardsComponent', () => {
  let component: MenusCardsComponent;
  let fixture: ComponentFixture<MenusCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
