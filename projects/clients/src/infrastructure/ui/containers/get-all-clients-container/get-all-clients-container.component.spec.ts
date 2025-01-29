import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllClientsContainerComponent } from './get-all-clients-container.component';

describe('GetAllClientsContainerComponent', () => {
  let component: GetAllClientsContainerComponent;
  let fixture: ComponentFixture<GetAllClientsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllClientsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllClientsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
