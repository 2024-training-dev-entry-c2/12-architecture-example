import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUaserAdminComponent } from './dialog-uaser-admin.component';

describe('DialogUaserAdminComponent', () => {
  let component: DialogUaserAdminComponent;
  let fixture: ComponentFixture<DialogUaserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUaserAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUaserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
