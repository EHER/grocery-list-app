import { Injectable } from '@angular/core'
import { NgRedux } from '@angular-redux/store'

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';
import { List } from '../store/index'
import { FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from './actions'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class GroceriesListActions {
  constructor(private ngRedux: NgRedux<List>, private apollo: Apollo) {}

  addItemToList(listId: number, name: string): Observable<any> {
    const addItem  = gql`
      mutation addItemToList($listId: ID!, $name: String!) {
        addItemToList(listId: $listId, name: $name) {
          id,
          name,
          listId
        }
      }
    `

    return this.apollo.mutate({
      mutation: addItem,
      variables: {
        listId: listId,
        name: name
      }
    })
  }

  createNewList(name: string): Observable<any> {
    const createList = gql`
      mutation createList($name: String!) {
        createList(name: $name) {
          name
        }
      }
    `

    return this.apollo.mutate({
      mutation: createList,
      variables: {
        name: name
      }
    })
  }

  requestList(id): Subscription {
    const queryList = gql`
      query groceriesList {
        groceriesList(id: ${id}) {
          id,
          name,
          items {
            checked,
            id,
            name
          }
        }
      }
    `
    return this.apollo.query({ query: queryList }).subscribe((list) => {
      this.ngRedux.dispatch({
        type: FETCH_LIST_SUCCESS,
        payload: list.data
      })
    })
  }

  requestLists(): Subscription {
    const queryLists = gql`
      query groceriesLists {
        groceriesLists {
          id,
          name
       }
      }
    `
    return this.apollo.query({query: queryLists}).subscribe((lists) => {
      this.ngRedux.dispatch({
        type: FETCH_LISTS_SUCCESS,
        payload: lists.data
      })
    })
  }

  toggleListItem(id: number, checked: boolean): Observable<any> {
    const toggleItem  = gql`
      mutation toggleListItem($id: ID!, $checked: Boolean!) {
        toggleListItem(id: $id, checked: $checked) {
          id,
          checked
        }
      }
    `
    return this.apollo.mutate({
      mutation: toggleItem,
      variables: {
        id: id,
        checked: checked
      }
    })
  }
}
