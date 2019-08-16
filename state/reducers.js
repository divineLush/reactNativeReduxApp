import { combineReducers } from 'redux';

import { GET_LISTINGS, SET_LISTINGS } from './actions';

let listingsState = {
    loading: true,
    listings: []
}

const listingsReducer = (state = listingsState, action) => {
    switch (action.type) {
        case GET_LISTINGS:
            return {...state, listings: action.payload, loading: false};
        case SET_LISTINGS:
            return { listings: action.payload.listings }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    listingsReducer
})
  
export default rootReducer;
