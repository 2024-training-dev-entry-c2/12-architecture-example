import { TestBed } from '@angular/core/testing';
import { OpcionItemComponent } from './opcion-item.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('OpcionItemComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OpcionItemComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { paramMap: of({}) } } 
                }
            ]
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(OpcionItemComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
