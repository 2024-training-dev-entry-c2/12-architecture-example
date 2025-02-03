import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMainLayoutComponent } from './menu-main-layout.component';

describe('MenuMainLayoutComponent', () => {
  let component: MenuMainLayoutComponent;
  let fixture: ComponentFixture<MenuMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
