import { ActivatedRoute } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { GroceriesListActions } from '../../actions/groceries-list.actions'
import { GroceriesListAppState, List } from '../../store'
import { select } from '@angular-redux/store'

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.html'
})
export class ListDetailsComponent implements OnDestroy, OnInit {
  @select((s: GroceriesListAppState) => s.listDetails) listDetailsSubscription
  list: List
  listId: number
  subscriptions: Subscription[] = []

  constructor(private actions: GroceriesListActions, private route: ActivatedRoute) {
    this.subscriptions.push(this.listDetailsSubscription.subscribe((data: List) => {
      console.log(data)
      this.list = data
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe()
    })
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.listId = +params['id']; // (+) converts string 'id' to a number

      this.actions.requestList(this.listId)
      // In a real app: dispatch action to load the details here.
    }));
  }

  private requestListDetails() {

  }
}
