import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveModalComponent } from './remove-modal.component';

describe('RemoveModalComponent', () => {
  let component: RemoveModalComponent;
  let fixture: ComponentFixture<RemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
