import { Injectable } from '@angular/core'
import { NgRedux } from '@angular-redux/store'

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';
import { List } from '../store/index'
import { FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from './actions'

@Injectable()
export class GroceriesListActions {
  constructor(private ngRedux: NgRedux<List>, private apollo: Apollo) {}

  addItemToList(listId: number, itemName: string) {
    const addItem  = gql`
      mutation addItemToList($listId: ID!, $itemName: String!) {
        addItemToList(listId: $listId, itemName: $itemName) {
          id,
          itemName,
          listId
        }
      }
    `

    return this.apollo.mutate({
      mutation: addItem,
      variables: {
        itemName: itemName,
        listId: listId
      }
    })
  }

  createNewList(listName: string) {
    const createList = gql`
      mutation createList($listName: String!) {
        createList(listName: $listName) {
          listName
        }
      }
    `

    return this.apollo.mutate({
      mutation: createList,
      variables: {
        listName: listName
      }
    })
  }

  requestList(id): void {
    const queryList = gql`
      query groceriesList {
        groceriesList(id: ${id}) {
          id,
          listName,
          items {
            id,
            itemName
          }
        }
      }
    `
    this.apollo.query({query: queryList}).subscribe((lists) => {
      this.ngRedux.dispatch({
        type: FETCH_LIST_SUCCESS,
        payload: lists.data
      })
    })
  }

  requestLists(): void {
    const queryLists = gql`
      query groceriesLists {
        groceriesLists {
          id,
          listName
       }
      }
    `
    this.apollo.query({query: queryLists}).subscribe((data) => {
      this.ngRedux.dispatch({
        type: FETCH_LISTS_SUCCESS,
        lists: data
      })
    })
  }
}
