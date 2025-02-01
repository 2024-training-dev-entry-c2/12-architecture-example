import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesContainerComponent } from './ordenes-container.component';

describe('OrdenesContainerComponent', () => {
  let component: OrdenesContainerComponent;
  let fixture: ComponentFixture<OrdenesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
