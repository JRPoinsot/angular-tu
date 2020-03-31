import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

fdescribe('Test Home Component', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should be created', () => {
  });

  it('should not display card if person is null', () => {
  });

  it('should call fetchRandom when click on autorenew', () => {
  });

  it('should call delete when card triggers a personDelete event', () => {
  });

  it('should call fetch random person on Init (async)', async(() => {
  }));
});
