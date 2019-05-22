// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
// MATERIAL DESIGN MODULES
import {
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_ROUTES } from './app.routes';

import { PeopleAppComponent } from './app.component';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { CardComponent } from './shared/card';
import { AddDialogComponent } from './people/add-dialog/add-dialog.component';
import { FormComponent } from './shared/form';
import {UpdateComponent} from './update';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, INITIAL_STATE } from 'app/core/flux/state';
import { rootReducer } from 'app/core/flux/reducer';
import { RootEpicsService } from 'app/core/flux/epic.service';
import { createEpicMiddleware } from 'redux-observable';
import { FluxStandardAction } from 'flux-standard-action';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    APP_ROUTES,
    ReactiveFormsModule,
    NgReduxModule
  ],
  declarations: [PeopleAppComponent, HomeComponent, PeopleComponent, CardComponent, AddDialogComponent, FormComponent, UpdateComponent],
  entryComponents: [AddDialogComponent],
  providers: [HttpClient],
  bootstrap: [PeopleAppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, rootEpicsService: RootEpicsService) {

    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    const epicMiddleware = createEpicMiddleware<
        FluxStandardAction<any, any, any>,
        FluxStandardAction<any, any, any>,
        IAppState
        >();

    ngRedux.configureStore(rootReducer, INITIAL_STATE, [epicMiddleware]);
    epicMiddleware.run(rootEpicsService.createDeletePersonEpicMiddleware());
    epicMiddleware.run(rootEpicsService.createFetchAllEpicMiddleware());

  }
}
