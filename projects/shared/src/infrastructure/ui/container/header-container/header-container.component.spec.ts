import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContainerComponent } from './header-container.component';

describe('HeaderContainerComponent', () => {
  let component: HeaderContainerComponent;
  let fixture: ComponentFixture<HeaderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
