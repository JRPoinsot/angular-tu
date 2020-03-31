import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PeopleService} from '../shared/people.service';
import {PeopleComponent} from './people.component';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatDialogModule} from '@angular/material/dialog';

describe('Test People Component', () => {

    let component: PeopleComponent;
    let fixture: ComponentFixture<PeopleComponent>;
    let debugElement: DebugElement;
    let peopleService: PeopleService;

    beforeEach(async(() => {
    // async because of NgReduxTestingModule has asynchronous code
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, NgReduxTestingModule],
      declarations: [PeopleComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then( () => {
        // MockNgRedux connects to all @select decorators
        MockNgRedux.reset();
        // init test variables
        fixture = TestBed.createComponent(PeopleComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        peopleService = TestBed.get(PeopleService);
    });
    }));

    it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    });

    it('should call reduxAction fetchAll onInit then display people', () => {
    });

    it('should call reduxAction delete when card raises personDelete event', () => {
    });

    it('should display addDialog component when clicking add button', () => {
    });

    it('should create person when addDialog is closing with payload', () => {
    });
});
