import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSelectorComponent } from './menu-selector.component';

describe('MenuSelectorComponent', () => {
  let component: MenuSelectorComponent;
  let fixture: ComponentFixture<MenuSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
