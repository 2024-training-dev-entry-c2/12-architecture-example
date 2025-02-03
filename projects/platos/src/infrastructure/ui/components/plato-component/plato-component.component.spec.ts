import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoComponentComponent } from './plato-component.component';

describe('PlatoComponentComponent', () => {
  let component: PlatoComponentComponent;
  let fixture: ComponentFixture<PlatoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
