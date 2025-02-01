import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllClientCompComponent } from './get-all-client-comp.component';

describe('GetAllClientCompComponent', () => {
  let component: GetAllClientCompComponent;
  let fixture: ComponentFixture<GetAllClientCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllClientCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllClientCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
