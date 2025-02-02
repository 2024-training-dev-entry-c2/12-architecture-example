import { ComponentFixture, TestBed } from '@angular/core/testing';
import { input } from '@angular/core';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the loader when isVisible is true', () => {
        fixture.componentRef.setInput('isVisible', true);
        fixture.detectChanges();
        const loaderElement = fixture.nativeElement.querySelector('.fullscreen-loader');
        expect(loaderElement).toBeTruthy();
    });

    it('should hide the loader when isVisible is false', () => {
        fixture.componentRef.setInput('isVisible', false);
        fixture.detectChanges();
        const loaderElement = fixture.nativeElement.querySelector('.fullscreen-loader');
        expect(loaderElement).toBeFalsy();
    });

    it('should contain the loader elements', () => {
        fixture.componentRef.setInput('isVisible', true);
        fixture.detectChanges();
        const loader = fixture.nativeElement.querySelector('.loader');
        const spans = fixture.nativeElement.querySelectorAll('.loader span');
        expect(loader).toBeTruthy();
        expect(spans.length).toBe(3);
    });
});