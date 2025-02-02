import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyButtonSharedComponent } from './modify-button-shared.component';

describe('ModifyButtonSharedComponent', () => {
  let component: ModifyButtonSharedComponent;
  let fixture: ComponentFixture<ModifyButtonSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyButtonSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyButtonSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
