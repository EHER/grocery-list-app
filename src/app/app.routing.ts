import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ListComponent } from './list/list.component';
import { ListCreateComponent } from './list/list-create/list-create.component';
import { ListDetailsComponent } from './list/list-details/list-details.component'


const appRoutes: Routes = [{
  children: [{
    component: ListCreateComponent,
    path: 'create'
  },{
    component: ListDetailsComponent,
    path: ':id/details'
  }],
  component: ListComponent,
  path: 'list'
}]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: true })
