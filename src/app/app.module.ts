import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'

import { NgRedux, NgReduxModule } from '@angular-redux/store'

import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AppComponent } from './app.component'
import { appRouting } from './app.routing'

import { ListComponent } from './list/list.component'
import { ListCreateComponent } from './list/list-create/list-create.component'
import { ListDetailsComponent } from './list/list-details/list-details.component'

import { GroceriesListAppState, initialState, rootReducer } from './store'
import { GroceriesListActions } from './actions/groceries-list.actions'


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListCreateComponent,
    ListDetailsComponent,
  ],
  imports: [
    ApolloModule, appRouting, BrowserModule, FormsModule, HttpClientModule, HttpLinkModule,
    MatButtonModule, MatFormFieldModule, MatListModule, MatInputModule, NgReduxModule,
    NoopAnimationsModule
  ],
  providers: [ GroceriesListActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink, ngRedux: NgRedux<GroceriesListAppState>) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:9001/graphql' }),
      cache: new InMemoryCache()
    });

    ngRedux.configureStore(rootReducer, initialState)
  }
}
