import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuFormComponent } from './update-menu-form.component';

describe('UpdateMenuFormComponent', () => {
  let component: UpdateMenuFormComponent;
  let fixture: ComponentFixture<UpdateMenuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMenuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
