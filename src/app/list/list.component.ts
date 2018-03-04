import { Component, OnDestroy, OnInit } from '@angular/core'
import { GroceriesListActions } from '../actions/groceries-list.actions'
import { GroceriesListAppState, List } from '../store'
import { select } from '@angular-redux/store'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  @select((s: GroceriesListAppState) => s.lists) listsSubscription;
  groceriesLists: List[]

  constructor(private actions: GroceriesListActions) {
    this.listsSubscription.subscribe((data: List[]) => {
      this.groceriesLists = data
    })
  }

  ngOnDestroy(): void {
    this.listsSubscription.unsubscribe()
  }

  ngOnInit() {
    this.actions.requestLists()
  }

}
