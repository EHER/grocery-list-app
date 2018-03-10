import { Component } from '@angular/core'

import { CREATE_LIST } from '../../../data/actions/actions'
import { GroceriesListActions } from '../../../data/actions/groceries-list.actions'

import { NgRedux } from '@angular-redux/store'

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.html'
})
export class ListCreateComponent {
  listName: string

  constructor(
    private actions: GroceriesListActions,
    private ngRedux: NgRedux<any>
  ) {}

  submit(): void {
    this.actions.createNewList(this.listName).subscribe((data) => {
      this.ngRedux.dispatch({
        type: CREATE_LIST,
        list: data
      })
    })
  }
}
