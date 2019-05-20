import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { Person } from 'app/model/person.model';

// help: export type [ActionName] = FluxStandardAction<[TYPE] type, [PAYLOAD] type, [META] type>;
export type AbstractAction = FluxStandardAction<string, any, any>;
export type FetchAllAction = FluxStandardAction<string, null, null>;
export type FetchAllSuccessAction = FluxStandardAction<string, Array<Person>, null>;
export type FetchAllFailureAction = FluxStandardAction<string, null, null>;
export type DeletePersonAction = FluxStandardAction<string, string, null>;
export type DeletePersonFailureAction = FluxStandardAction<string, null, null>;

@Injectable({
    providedIn: 'root'
})
export class ActionsService {
    static readonly FETCH_ALL = 'FETCH_ALL';
    static readonly FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';
    static readonly FETCH_ALL_FAILURE = 'FETCH_ALL_FAILURE';
    static readonly DELETE_PERSON = 'DELETE_PERSON';
    static readonly DELETE_PERSON_FAILURE = 'DELETE_PERSON_FAILURE';

    @dispatch()
    fetchAll(): FetchAllAction {
        return { type: ActionsService.FETCH_ALL, payload: null, error: false, meta: null };
    }

    fetchAllSuccess(people: Array<Person>): FetchAllSuccessAction {
        return { type: ActionsService.FETCH_ALL_SUCCESS, payload: people, error: false, meta: null };
    }

    fetchAllFailure(): FetchAllFailureAction {
        return { type: ActionsService.FETCH_ALL_FAILURE, payload: null, error: true, meta: null };
    }

    @dispatch()
    deletePerson(personId: string): DeletePersonAction {
        return { type: ActionsService.DELETE_PERSON, payload: personId, error: false, meta: null };
    }

    deletePersonFailure(): DeletePersonFailureAction {
        return { type: ActionsService.DELETE_PERSON_FAILURE, payload: null, error: true, meta: null };
    }
}
