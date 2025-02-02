import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSharedComponent } from './footer-shared.component';

describe('FooterSharedComponent', () => {
  let component: FooterSharedComponent;
  let fixture: ComponentFixture<FooterSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
