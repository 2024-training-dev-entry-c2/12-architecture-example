import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMainComponent } from './sidebar-main.component';

describe('SidebarMainComponent', () => {
  let component: SidebarMainComponent;
  let fixture: ComponentFixture<SidebarMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
