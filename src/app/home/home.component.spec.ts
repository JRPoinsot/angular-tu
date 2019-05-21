import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement} from '@angular/core/src/debug/debug_node';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {PeopleService} from '../shared/people.service';
import {of} from 'rxjs';

describe('Test Home Component', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let peopleService: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    peopleService = TestBed.get(PeopleService);
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display card if person is null', () => {
    component.person = null;
    fixture.detectChanges(); // ngOnInit
    expect(debugElement.query(By.css('pwa-card'))).toBeFalsy();
    component.person = {};
    fixture.detectChanges(); // update view
    expect(debugElement.query(By.css('pwa-card'))).toBeTruthy();
  });

  it('should call fetch other person when click on autorenew', () => {
    const fetchRandomSpy = spyOn(peopleService, 'fetchRandom').and.returnValue(of({}));
    fixture.detectChanges(); // ngOnInit
    expect(fetchRandomSpy).toHaveBeenCalled();
    expect(component).toBeTruthy();
    debugElement
        .query(By.css('[data-id=button-1]'))
        .triggerEventHandler('click', {button : 0});
    expect(fetchRandomSpy).toHaveBeenCalledTimes(2);
  });

  it('should call delete when card raise a personDelete event', () => {
    component.person.id = 'fakeId';
    const deleteSpy = spyOn(peopleService, 'delete').and.returnValue(of({}));
    fixture.detectChanges(); // ngOnInit
    debugElement.query(By.css('pwa-card')).triggerEventHandler('personDelete', null);
    expect(deleteSpy).toHaveBeenCalledWith(component.person.id);
  });
});
