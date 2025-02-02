import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMenuContainerComponent } from './get-menu-container.component';

describe('GetMenuContainerComponent', () => {
  let component: GetMenuContainerComponent;
  let fixture: ComponentFixture<GetMenuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMenuContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
