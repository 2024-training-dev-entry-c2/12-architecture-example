import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrdenesComponent } from './get-ordenes.component';

describe('GetOrdenesComponent', () => {
  let component: GetOrdenesComponent;
  let fixture: ComponentFixture<GetOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetOrdenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
