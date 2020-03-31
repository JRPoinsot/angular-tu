import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PeopleService} from '../shared/people.service';
import {PeopleComponent} from './people.component';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {By} from '@angular/platform-browser';
import {ActionsService} from '../core/flux/actions.service';
import Spy = jasmine.Spy;
import {Person} from '../model/person.model';
import {Subject} from 'rxjs';
import {CardComponent} from '../shared/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

const fakePeopleList = [
    {
        id: '5763cd4d9d2a4f259b53c901',
        photo: 'https://randomuser.me/portraits/women/59.jpg',
        firstname: 'Leanne',
        lastname: 'Woodard',
        entity: 'BIOSPAN',
        entryDate: '27/10/2015',
        birthDate: '02/01/1974',
        gender: '',
        email: 'Leanne.Woodard@BIOSPAN.com',
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
    },
    {
        id: '5763cd4d51fdb6588742f99e',
        photo: 'https://randomuser.me/portraits/men/65.jpg',
        firstname: 'Castaneda',
        lastname: 'Salinas',
        entity: 'METROZ',
        entryDate: '04/10/2015',
        birthDate: '22/01/1963',
        gender: '',
        email: 'Castaneda.Salinas@METROZ.com',
        skills: ['exercitation', 'consectetur', 'aute', 'ad', 'adipisicing'],
        geo: {
            lat: 48.85988099923647,
            lng: 2.283677529858706
        },
        phone: '0145652522',
        address: {
            street: 'Metrotech Courtr',
            postalCode: 53292,
            city: 'Franklin'
        },
        links: {
            twitter: 'https://twitter.com/velit',
            slack: 'https://slack.com/sunt',
            github: 'https://github.com/sint',
            linkedin: 'https://www.linkedin.com/in/voluptate'
        },
        isManager: false,
        manager: 'Erika',
        managerId: '5763cd4d3b57c672861bfa1f'
    }
];

describe('Test People Component', () => {

    let component: PeopleComponent;
    let fixture: ComponentFixture<PeopleComponent>;
    let debugElement: DebugElement;
    let peopleService: PeopleService;
    let dispatchSpy: Spy;
    let spyOpenDialog: Spy;
    let addDialogMock: any;
    let peopleStub: Subject<Array<Person>>;
    let matDialog: MatDialog;

    const afterCloseSubject = new Subject();

    beforeEach(async(() => {
        // async because of NgReduxTestingModule has asynchronous code
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule, MatCardModule, NgReduxTestingModule],
            declarations: [PeopleComponent, CardComponent],
            providers: [MatDialog],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            // init test variables
            fixture = TestBed.createComponent(PeopleComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
            peopleService = TestBed.inject(PeopleService);

            // MockNgRedux connects to all @select decorators
            MockNgRedux.reset();

            dispatchSpy = spyOn(MockNgRedux.getInstance(), 'dispatch');
            peopleStub = MockNgRedux.getSelectorStub('people');
            peopleStub.next(fakePeopleList);
            peopleStub.complete();

            matDialog = TestBed.get(MatDialog);
            addDialogMock = {
                afterClosed: () => afterCloseSubject.asObservable()
            };
            spyOpenDialog = spyOn(matDialog, 'open').and.returnValue(addDialogMock);
        });
    });

    it('should be created', () => {
        fixture.detectChanges(); // ngOnInit
        expect(component).toBeTruthy();
    });

    it('should call reduxAction fetchAll onInit then display people', () => {
        fixture.detectChanges(); // ngOnInit
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ActionsService.FETCH_ALL, payload: null, error: false, meta: null
        });
        const pwaCardsDe = debugElement.queryAll(By.css('pwa-card'));
        expect(pwaCardsDe.length).toEqual(2);
    });

    it('should call reduxAction delete when card raises personDelete event', () => {
        fixture.detectChanges(); // ngOnInit
        const pwaCardsDe = debugElement.queryAll(By.css('pwa-card'))[0];
        pwaCardsDe.triggerEventHandler('personDelete', fakePeopleList[0]);
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ActionsService.DELETE_PERSON, payload: '5763cd4d9d2a4f259b53c901', error: false, meta: null
        });
    });

    it('should display addDialog component when clicking add button', () => {
        fixture.detectChanges(); // ngOnInit
        expect(component.dialogStatus).toEqual('inactive');
        let button = debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);
        expect(component.dialogStatus).toEqual('active');
        fixture.detectChanges(); // update view
        button = debugElement.query(By.css('button'));
        expect(button).toBeFalsy();
        expect(spyOpenDialog).toHaveBeenCalled();
        afterCloseSubject.next(null); // cancel
        expect(component.dialogStatus).toEqual('inactive');
        fixture.detectChanges();
        button = debugElement.query(By.css('button'));
        expect(button).toBeTruthy();
    });

    it('should create person when addDialog is closing with payload', () => {
    });
});
