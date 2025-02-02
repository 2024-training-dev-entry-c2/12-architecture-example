import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenusComponent } from './list-menus.component';

describe('ListMenusComponent', () => {
  let component: ListMenusComponent;
  let fixture: ComponentFixture<ListMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
