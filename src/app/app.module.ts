// Modules
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './modules/base/material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// 3rd party imports
import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { NgRedux, NgReduxModule } from '@angular-redux/store'

// Domain
import { AppComponent } from './app.component'
import { appRouting } from './app.routing'

import { ListsComponent } from './modules/list/list.component'
import { ListCreateComponent } from './modules/list/list-create/list-create.component'
import { ListDetailsAddItemComponent } from './modules/list-details/list-details-add-item/list-details-add-item.component'
import { ListDetailsComponent } from './modules/list-details/list-details.component'
import { ListDetailsItemsComponent } from './modules/list-details/list-details-items/list-details-items'

import { GroceriesListAppState, initialState, rootReducer } from './data/store'
import { GroceriesListActions } from './data/actions/groceries-list.actions';
import { ListDetailsItemsItemComponent } from './modules/list-details/list-details-items-item/list-details-items-item.component'


@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListCreateComponent,
    ListDetailsAddItemComponent,
    ListDetailsComponent,
    ListDetailsItemsComponent,
    ListDetailsItemsItemComponent
  ],
  imports: [
    ApolloModule, appRouting, BrowserModule, FormsModule, HttpClientModule, HttpLinkModule, MaterialModule,
    NgReduxModule, NoopAnimationsModule
  ],
  providers: [ GroceriesListActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink, ngRedux: NgRedux<GroceriesListAppState>) {
    // Connect to GraphQL server
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:9001/graphql' }),
      cache: new InMemoryCache()
    });

    // Configure redux
    ngRedux.configureStore(rootReducer, initialState)
  }
}
