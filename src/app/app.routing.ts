import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ListsComponent } from './modules/list/list.component';
import { ListCreateComponent } from './modules/list/list-create/list-create.component';
import { ListDetailsComponent } from './modules/list-details/list-details.component'


const appRoutes: Routes = [{
  children: [{
    component: ListCreateComponent,
    path: 'create'
  }],
  component: ListsComponent,
  path: 'list',
}, {
  component: ListDetailsComponent,
  path: 'list-details/:id'
}]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: false })
