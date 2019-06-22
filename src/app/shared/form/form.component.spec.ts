import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core/src/debug/debug_node';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponent } from 'app/shared/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const fakePerson = {
    id: '5763cd4d9d2a4f259b53c901',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    firstname: 'Leanne',
    lastname: 'Woodard',
    entity: 'BIOSPAN',
    entryDate: '27/10/2015',
    birthDate: '02/01/1974',
    gender: '',
    email: 'Leanne.Woodard@custom.com',
    skills: ['pariatur', 'ipsum', 'laboris', 'nostrud', 'elit'],
    geo: {
        lat: 48.854107964410616,
        lng: 2.2486534555789013
    },
    phone: '0784112248',
    address: {
        street: 'Narrows Avenue',
        postalCode: 70534,
        city: 'Boling'
    },
    links: {
        twitter: 'https://twitter.com/laboris',
        slack: 'https://slack.com/fugiat',
        github: 'https://github.com/velit',
        linkedin: 'https://www.linkedin.com/in/voluptate'
    },
    isManager: false,
    manager: 'Erika',
    managerId: '5763cd4d3b57c672861bfa1f'
};

fdescribe('Test Form Component', () => {

    let fixture: ComponentFixture<FormComponent>;
    let component: FormComponent;
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
    });

    it('form firstname should be valid when valued with +2 characters', () => {
    });

    it('submit button should be enable when form is valid', () => {
    });

    it('should be update mode when model is present', () => {
    });

    it('should trigger cancelEvent when click on cancel', () => {
    });

    it('should trigger submitEvent with new values when click on save', () => {
    });

});
