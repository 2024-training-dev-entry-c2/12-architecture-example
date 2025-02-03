import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyButtonSharedComponent } from './modify-button-shared.component';
import { By } from '@angular/platform-browser';

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

  it('should call buttonIsClicked on click', () => {
    spyOn(component, 'buttonIsClicked');

    const buttonElement = fixture.debugElement.query(By.css('.plusButton'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.buttonIsClicked).toHaveBeenCalled();
  });

  it('should have the correct SVG path', () => {
    const svgElement: HTMLElement = fixture.debugElement.query(By.css('svg.plusIcon')).nativeElement;
    const path = svgElement.querySelector('path');
    expect(path?.getAttribute('d')).toBe('M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z');
  });


});
