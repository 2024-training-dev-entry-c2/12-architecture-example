import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdClientCompComponent } from './get-by-id-client-comp.component';

describe('GetByIdClientCompComponent', () => {
  let component: GetByIdClientCompComponent;
  let fixture: ComponentFixture<GetByIdClientCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdClientCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByIdClientCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
