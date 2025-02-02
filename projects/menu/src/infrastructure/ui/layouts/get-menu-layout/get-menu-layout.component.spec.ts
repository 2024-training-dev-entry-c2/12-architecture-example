import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMenuLayoutComponent } from './get-menu-layout.component';

describe('GetMenuLayoutComponent', () => {
  let component: GetMenuLayoutComponent;
  let fixture: ComponentFixture<GetMenuLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMenuLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMenuLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
