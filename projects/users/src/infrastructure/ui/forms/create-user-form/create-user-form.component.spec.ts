import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserFormComponent } from './create-user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('CreateUserFormComponent', () => {
    let component: CreateUserFormComponent;
    let fixture: ComponentFixture<CreateUserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateUserFormComponent, ReactiveFormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateUserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
        expect(component.createUserForm.value).toEqual({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'ADMIN'
        });
    });


    it('should set error message when form is invalid on submit', () => {
        component.submit();
        expect(component.error).toBe('The form is invalid, please check the fields');
    });

    it('should reset form when resetForm is called', () => {
        component.createUserForm.setValue({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
            role: 'USER'
        });

        component.resetForm();

        expect(component.createUserForm.value).toEqual({
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            role: null
        });
    });
});
