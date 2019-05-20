import { Action } from 'redux';
import {
    ActionsService,
    DeletePersonAction, DeletePersonFailureAction,
    FetchAllAction,
    FetchAllFailureAction,
    FetchAllSuccessAction
} from 'app/core/flux/actions.service';
import { IAppState } from 'app/core/flux/state';


export function rootReducer(state: IAppState, a: Action): IAppState {
    let action;
    switch (a.type) {
        case ActionsService.FETCH_ALL:
            action = a as FetchAllAction;
            return {
                ...state,
                error: action.error
            };
        case ActionsService.FETCH_ALL_SUCCESS:
            action = a as FetchAllSuccessAction;
            return {
                ...state,
                error: action.error,
                people: action.payload
            };
        case ActionsService.FETCH_ALL_FAILURE:
            action = a as FetchAllFailureAction;
            return {
                ...state,
                error: action.error
            };
        case ActionsService.DELETE_PERSON:
            action = a as DeletePersonAction;
            return {
                ...state,
                error: action.error
            };
        case ActionsService.DELETE_PERSON_FAILURE:
            action = a as DeletePersonFailureAction;
            return {
                ...state,
                error: action.error
            };
    }

    // We don't care about any other actions right now.
    return state;
}
