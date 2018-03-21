import { Injectable } from '@angular/core'
import { NgRedux } from '@angular-redux/store'

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';
import { List } from '../store/index'
import { FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from './actions'

@Injectable()
export class GroceriesListActions {
  constructor(private ngRedux: NgRedux<List>, private apollo: Apollo) {}

  addItemToList(listId: number, name: string) {
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

  createNewList(name: string) {
    const createList = gql`
      mutation createList($name: String!) {
        createList(name: $name) {
          name
        }
      }
    `

    console.log(name)

    return this.apollo.mutate({
      mutation: createList,
      variables: {
        name: name
      }
    })
  }

  requestList(id): void {
    console.log('request list:' + id)
    const queryList = gql`
      query groceriesList {
        groceriesList(id: ${id}) {
          id,
          name,
          items {
            id,
            name
          }
        }
      }
    `
    this.apollo.query({ query: queryList }).subscribe((list) => {
      console.log('list', list)
      this.ngRedux.dispatch({
        type: FETCH_LIST_SUCCESS,
        payload: list.data
      })
    })
  }

  requestLists(): void {
    const queryLists = gql`
      query groceriesLists {
        groceriesLists {
          id,
          name
       }
      }
    `
    this.apollo.query({query: queryLists}).subscribe((lists) => {
      this.ngRedux.dispatch({
        type: FETCH_LISTS_SUCCESS,
        payload: lists.data
      })
    })
  }
}
