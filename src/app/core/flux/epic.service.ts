import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import { AbstractAction, ActionsService, DeletePersonAction, FetchAllAction } from 'app/core/flux/actions.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAppState } from 'app/core/flux/state';
import { PeopleService } from 'app/shared/people.service';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RootEpicsService {

    constructor(private actionsService: ActionsService, private peopleHttpService: PeopleService) {
    }

    public createDeletePersonEpicMiddleware(): Epic<DeletePersonAction, AbstractAction, IAppState> {
        return (action$, store$) =>
            action$.ofType(ActionsService.DELETE_PERSON).pipe(
                switchMap((action: DeletePersonAction) =>
                    this.peopleHttpService.delete(action.payload).pipe(
                        map((response) => this.actionsService.fetchAllSuccess(response)),
                        catchError(() => of(this.actionsService.deletePersonFailure()))
                    )
                )
            );
    }

    public createFetchAllEpicMiddleware(): Epic<FetchAllAction, AbstractAction, IAppState> {
        return (action$, store$) =>
            action$.ofType(ActionsService.FETCH_ALL).pipe(
                switchMap((action: FetchAllAction) =>
                    this.peopleHttpService.fetch().pipe(
                        map((response) => this.actionsService.fetchAllSuccess(response)),
                        catchError(() => of(this.actionsService.fetchAllFailure()))
                    )
                )
            );
    }


}
