import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMenusContainerComponent } from './get-all-menus-container.component';

describe('GetAllMenusContainerComponent', () => {
  let component: GetAllMenusContainerComponent;
  let fixture: ComponentFixture<GetAllMenusContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllMenusContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllMenusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
