import { ADD_LIST_ITEM, CREATE_LIST, FETCH_LIST_SUCCESS, FETCH_LISTS_SUCCESS } from '../actions/actions'

export interface GroceriesListAppState {
  listDetails: List
  lists: List[]
}

export class List {
  id: number
  items: ListItem[]
  listName: string
}

export class ListItem {
  id: number
  itemName: string
}

export const initialState: GroceriesListAppState = {
  listDetails: {
    id: null,
    items: [],
    listName: null
  },
  lists: []
}

export function rootReducer(state, action): GroceriesListAppState {
  console.log(state.listDetails)
  switch (action.type) {
    case ADD_LIST_ITEM : return addListItemReducer(state, action)
    case CREATE_LIST : return createListReducer(state, action)
    case FETCH_LIST_SUCCESS : return listRetrievedReducer(state, action)
    case FETCH_LISTS_SUCCESS : return listsRetrievedReducer(state, action)
  }
  return state
}

function addListItemReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)
  const item = action.list.data.addItemToList

  console.log(state.listDetails)
  console.log(newState.listDetails)

  if (item && (newState.listDetails.id === item.listId)) {
    // newState.listDetails.items.push({
    //   id: item.id,
    //   itemName: item.itemName
    // })
  }

  console.log(newState)

  return newState
}

function createListReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)
  const createdList = action.list.data.createList

  if (createdList) {
    newState.lists.push(createdList)
  }

  return newState
}

function listRetrievedReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)
  const list = action.payload.groceriesList
  console.log(list)
  if (list) {
    newState.listDetails = list
  }

  return newState
}

function listsRetrievedReducer(state: GroceriesListAppState, action): GroceriesListAppState {
  const newState = Object.assign({}, state)
  const lists = action.lists.data.groceriesLists

  if (lists) {
    newState.lists = lists
  }

  return newState
}
