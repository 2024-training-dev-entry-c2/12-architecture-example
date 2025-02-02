import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdMenuCompComponent } from './get-by-id-menu-comp.component';

describe('GetByIdMenuCompComponent', () => {
  let component: GetByIdMenuCompComponent;
  let fixture: ComponentFixture<GetByIdMenuCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdMenuCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByIdMenuCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
