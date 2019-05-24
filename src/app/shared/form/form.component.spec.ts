import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core/src/debug/debug_node';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { FormComponent } from 'app/shared/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('Test Form Component', () => {

    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ BrowserAnimationsModule,
                ReactiveFormsModule,
                MatCardModule,
                MatButtonModule,
                MatInputModule,
                MatCheckboxModule],
            declarations: [FormComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        });

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should be created with no model', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.form.valid).toBeFalsy();
        const submitButtonDe = debugElement.query(By.css('button[type=submit]'));
        expect(submitButtonDe.nativeElement.disabled).toBeTruthy();
    });

    it('form firstname should be valid when valued with +2 characters', () => {
        fixture.detectChanges();
        expect(component.form.controls.firstname.valid).toBeFalsy();
        component.form.controls.firstname.setValue('t');
        expect(component.form.controls.firstname.valid).toBeFalsy();
        console.error(component.form.controls.firstname.errors);
        // expect(component.form.controls.firstname.errors).toEqual()
        component.form.controls.firstname.setValue('toto');
        expect(component.form.controls.firstname.valid).toBeTruthy( 'le prenom doit etre valide avec la valeur toto');
    });

    it('submit button should be enable when form is valid', () => {
    });

});
