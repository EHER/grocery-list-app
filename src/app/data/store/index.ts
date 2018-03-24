import { Action, ADD_LIST_ITEM, CREATE_LIST, FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from '../actions/actions'

export interface GroceriesListAppState {
  listDetails: List
  lists: List[]
}

export class List {
  id: number
  items: ListItem[]
  name: string
}

export class ListItem {
  checked: boolean
  id: number
  name: string
}

export const initialState: GroceriesListAppState = {
  listDetails: {
    id: null,
    items: [],
    name: null
  },
  lists: []
}

export function rootReducer(state, action: Action): GroceriesListAppState {
  switch (action.type) {
    case ADD_LIST_ITEM : return addListItemReducer(state, action)
    case CREATE_LIST : return createListReducer(state, action)
    case FETCH_LIST_SUCCESS : return listRetrievedReducer(state, action)
    case FETCH_LISTS_SUCCESS : return listsRetrievedReducer(state, action)
  }
  return state
}

function addListItemReducer(state: GroceriesListAppState, action: Action): GroceriesListAppState {
  if (!action.payload || !action.payload.addItemToList) { return state }

  return Object.assign({}, state, {
    listDetails:  Object.assign({}, state.listDetails, {
      items: state.listDetails.items.concat(action.payload.addItemToList)
    })
  })
}

function createListReducer(state: GroceriesListAppState, action: Action): GroceriesListAppState {
  if (!action.payload || !action.payload.createList) { return state }

  return Object.assign({}, state, {
    lists: state.lists.concat(action.payload.createList)
  })
}

function listRetrievedReducer(state: GroceriesListAppState, action: Action): GroceriesListAppState {
  console.log(action, 'action')
  console.log(action.payload, 'action.payload')
  if (!action.payload || !action.payload.groceriesList) { return state }

  return Object.assign({}, state, {
    listDetails: action.payload.groceriesList
  })
}

function listsRetrievedReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  if (!action.payload || !action.payload.groceriesLists) { return state }

  return Object.assign({}, state, {
    lists: action.payload.groceriesLists
  })
}
