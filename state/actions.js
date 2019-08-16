export const GET_LISTINGS = 'GET_LISTINGS'
export const SET_LISTINGS = 'SET_LISTINGS'

export const listings = []

export function getListings() {
    return (dispatch) => {
      setTimeout(() => {
        const payload  = listings
        dispatch({type: GET_LISTINGS, payload})
      }, 2000);
    }
}

export function setListings(listings) {
    return {
        type: SET_LISTINGS,
        payload: { listings }
    }
}