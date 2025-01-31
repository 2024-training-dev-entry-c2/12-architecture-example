import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLayoutComponent } from './sub-layout.component';

describe('SubLayoutComponent', () => {
  let component: SubLayoutComponent;
  let fixture: ComponentFixture<SubLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
