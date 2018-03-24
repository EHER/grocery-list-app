import { Component, Input } from '@angular/core'
import { List, ListItem } from '../../../data/store'
import { Action, TOGGLE_LIST_ITEM } from '../../../data/actions/actions'
import { NgRedux } from '@angular-redux/store'
import { GroceriesListActions } from '../../../data/actions/groceries-list.actions'

@Component({
  selector: 'app-list-details-items-item',
  templateUrl: './list-details-items-item.component.html',
  styleUrls: ['./list-details-items-item.component.css']
})
export class ListDetailsItemsItemComponent {
  @Input() item: ListItem

  constructor(private actions: GroceriesListActions, private ngRedux: NgRedux<any>) { }


  toggleItemChecked(item: ListItem): void {
    this.actions.toggleListItem(item.id, !item.checked).subscribe((item: any) => {
      this.ngRedux.dispatch({
        type: TOGGLE_LIST_ITEM,
        payload: item.data
      })
    })
  }
}
