import { TestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';
import {HttpClientModule} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('PeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule]}));

  it('should be created', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    expect(service).toBeTruthy();
  });
});
