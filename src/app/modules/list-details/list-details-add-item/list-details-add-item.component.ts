// Angular imports
import { Component, Input } from '@angular/core'

// 3rd party imports
import { NgRedux } from '@angular-redux/store'

// Models
import { ADD_LIST_ITEM } from '../../../data/actions/actions'
import { GroceriesListActions } from '../../../data/actions/groceries-list.actions'
import { List } from '../../../data/store'

@Component({
  selector: 'app-list-details-add-item',
  templateUrl: 'list-details-add-item.html'
})
export class ListDetailsAddItemComponent {
  @Input() list: List
  newItemName: string

  constructor(private actions: GroceriesListActions, private ngRedux: NgRedux<any>) {}

  submit(listId): void {
    this.actions.addItemToList(listId, this.newItemName).subscribe((data) => {
      this.ngRedux.dispatch({
        type: ADD_LIST_ITEM,
        list: data
      })
    })
  }
}
