import { Component, OnDestroy, OnInit } from '@angular/core'
import { GroceriesListActions } from '../../data/actions/groceries-list.actions'
import { GroceriesListAppState, List } from '../../data/store/index'
import { select } from '@angular-redux/store'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {
  @select((s: GroceriesListAppState) => s.lists) listsSubscription;
  groceriesLists: List[]

  constructor(private actions: GroceriesListActions) {
    this.listsSubscription.subscribe((data: List[]) => {
      console.log('new list:', data)
      this.groceriesLists = data
    })
  }

  ngOnDestroy(): void {
    console.log('on destroy')
    this.listsSubscription.unsubscribe()
    console.log(this.listsSubscription)
  }

  ngOnInit() {
    this.actions.requestLists()
  }

}
