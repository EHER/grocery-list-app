import { Injectable } from '@angular/core'
import { NgRedux } from '@angular-redux/store'

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';
import { List } from '../store'
import { FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from './actions'

@Injectable()
export class GroceriesListActions {
  constructor(private ngRedux: NgRedux<List>, private apollo: Apollo) {}

  createNewList(listName: string) {
    const createList = gql`
      mutation createList($listName: String!) {
        createList(listName: $listName){
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
          listName
        }
      }
    `
    this.apollo.query({query: queryList}).subscribe((lists) => {
      console.log(lists)

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
