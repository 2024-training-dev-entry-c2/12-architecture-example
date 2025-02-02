import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveButtonSharedComponent } from './remove-button-shared.component';

describe('RemoveButtonSharedComponent', () => {
  let component: RemoveButtonSharedComponent;
  let fixture: ComponentFixture<RemoveButtonSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveButtonSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveButtonSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
