import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesLayoutComponent } from './ordenes-layout.component';

describe('OrdenesLayoutComponent', () => {
  let component: OrdenesLayoutComponent;
  let fixture: ComponentFixture<OrdenesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
