import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeModalComponent } from './informative-modal.component';

describe('InformativeModalComponent', () => {
  let component: InformativeModalComponent;
  let fixture: ComponentFixture<InformativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformativeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
