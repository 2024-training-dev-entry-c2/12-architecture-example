import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuFormComponent } from './create-menu-form.component';

describe('CreateMenuFormComponent', () => {
  let component: CreateMenuFormComponent;
  let fixture: ComponentFixture<CreateMenuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMenuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
