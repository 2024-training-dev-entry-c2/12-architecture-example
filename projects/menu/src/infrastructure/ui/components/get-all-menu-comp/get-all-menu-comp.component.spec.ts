import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMenuCompComponent } from './get-all-menu-comp.component';

describe('GetAllMenuCompComponent', () => {
  let component: GetAllMenuCompComponent;
  let fixture: ComponentFixture<GetAllMenuCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllMenuCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllMenuCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
