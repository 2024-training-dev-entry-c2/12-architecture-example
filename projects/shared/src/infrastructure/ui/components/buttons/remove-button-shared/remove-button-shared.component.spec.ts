import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveButtonSharedComponent } from './remove-button-shared.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RemoveButtonSharedComponent', () => {
  let component: RemoveButtonSharedComponent;
  let fixture: ComponentFixture<RemoveButtonSharedComponent>;
  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveButtonSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveButtonSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buttonIsClicked when clicked', () => {
    spyOn(component, 'buttonIsClicked');

    const buttonElement = fixture.debugElement.query(By.css('.plusButton'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.buttonIsClicked).toHaveBeenCalled();
  });

  it('should have a plusIcon SVG', () => {
    const svgElement = fixture.debugElement.query(By.css('svg.plusIcon'));
    expect(svgElement).toBeTruthy();
  });
});
