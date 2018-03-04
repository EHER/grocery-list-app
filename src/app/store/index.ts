import { CREATE_LIST, FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from '../actions/actions'

export interface GroceriesListAppState {
  listDetails: List
  lists: List[]
}

export class List {
  id: number
  listName: string
}

export const initialState: GroceriesListAppState = {
  listDetails: null,
  lists: []
}

export function rootReducer(state, action): GroceriesListAppState {
  switch (action.type) {
    case CREATE_LIST : return createListReducer(state, action)
    case FETCH_LIST_SUCCESS : return listRetrievedReducer(state, action)
    case FETCH_LISTS_SUCCESS : return listsRetrievedReducer(state, action)
  }
  return state
}

function createListReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)

  if (action.list.data.createList.listName) {
    newState.lists.push(action.list.data.createList)
  }

  return newState
}

function listRetrievedReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)

  if (action.payload && action.payload.groceriesList) {
    newState.listDetails = action.payload.groceriesList
  }
  //
  //
  // console.log(newState)
  return newState
}

function listsRetrievedReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)

  if (action.lists.data.groceriesLists) {
    newState.lists = newState.lists.concat(action.lists.data.groceriesLists)
  }

  return newState
}
