import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaltoFormComponent } from './palto-form.component';

describe('PaltoFormComponent', () => {
  let component: PaltoFormComponent;
  let fixture: ComponentFixture<PaltoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaltoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaltoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
