import { ActivatedRoute } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { GroceriesListActions } from '../../data/actions/groceries-list.actions'
import { GroceriesListAppState, List } from '../../data/store/index'
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
      this.list = data
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      console.log(subscription)
      subscription.unsubscribe()
    })
  }

  ngOnInit() {
    console.log(this.listId)
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.listId = +params['id']; // (+) converts string 'id' to a number

      console.log('requestList')
      this.actions.requestList(this.listId)
    }));
    console.log(this.listId)
  }
}
