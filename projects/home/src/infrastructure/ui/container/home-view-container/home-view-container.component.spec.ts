import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewContainerComponent } from './home-view-container.component';

describe('HomeViewContainerComponent', () => {
  let component: HomeViewContainerComponent;
  let fixture: ComponentFixture<HomeViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeViewContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
