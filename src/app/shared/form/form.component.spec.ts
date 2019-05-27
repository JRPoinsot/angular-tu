import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core/src/debug/debug_node';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
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
import { Person } from 'app/model/person.model';

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

@Component({
    selector: `host-component`,
    template: `<pwa-form [model]="person"></pwa-form>`
})
class TestHostComponent {

    @ViewChild(FormComponent)
    public formComponent: FormComponent;
    private person: Person;

    setPerson(newInput: Person) {
        this.person = newInput;
    }
}

fdescribe('Test Form Component', () => {

    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
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
            declarations: [TestHostComponent, FormComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        });

        hostFixture = TestBed.createComponent(TestHostComponent);
        hostComponent = hostFixture.componentInstance;
        component = hostFixture.componentInstance.formComponent;
        debugElement = hostFixture.debugElement;
    });

    it('should be created with no model', () => {
        hostFixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.form.valid).toBeFalsy();
        const submitButtonDe = debugElement.query(By.css('button[type=submit]'));
        expect(submitButtonDe.nativeElement.disabled).toBeTruthy();
    });

    it('form firstname should be valid when valued with +2 characters', () => {
        hostFixture.detectChanges();
        expect(component.form.controls.firstname.valid).toBeFalsy();
        component.form.controls.firstname.setValue('t');
        expect(component.form.controls.firstname.valid).toBeFalsy();
        console.error(component.form.controls.firstname.errors);
        console.error(component.form.valid);
        expect(component.form.controls.firstname.errors['minlength']).toBeTruthy();
        component.form.controls.firstname.setValue('toto');
        expect(component.form.controls.firstname.valid).toBeTruthy( 'le prenom doit etre valide avec la valeur toto');
    });

    it('submit button should be enable when form is valid', () => {
        hostFixture.detectChanges();
        component.form.controls.firstname.setValue('toto');
        component.form.controls.lastname.setValue('Titi');
        component.form.controls.email.setValue('titi.toto@custom.com');
        component.form.controls.phone.setValue('0633242589');
        expect(component.form.valid).toBeTruthy('Le formulaire doit être valide !');
        hostFixture.detectChanges(); // update view
        const submitButtonDe = debugElement.query(By.css('button[type=submit]'));
        expect(submitButtonDe.nativeElement.disabled).toBeFalsy();
    });

    it('mode update when model is present', () => {
        hostComponent.setPerson(fakePerson);
        hostFixture.detectChanges(); // ngOnInit
        expect(component.form.valid).toBeTruthy('Le formulaire doit être valide !');
        expect(debugElement.query(By.css('mat-card-title')).nativeElement.textContent).toEqual('Update Leanne Woodard');
    });

});
