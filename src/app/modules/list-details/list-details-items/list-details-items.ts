import { Component, Input } from '@angular/core'
import { ListItem } from '../../../data/store'

@Component({
  selector: 'app-list-details-items',
  templateUrl: 'list-details-items.html'
})
export class ListDetailsItemsComponent {
  @Input() listItems: ListItem[]
}
