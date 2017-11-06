const initialState = {
  country: {},
  neighbours: [],
};

// Actions
export const getCountry = (country) => (dispatch) => {
  dispatch({ type: 'COUNTRY_REQUEST' });
  return fetch('https://restcountries.eu/rest/v2/alpha/' + country)
    .then(response => response.json())
    .then(result => dispatch({
      type: 'GET_COUNTRY_REQUEST',
      payload: result,
    }))
}

export const getNeighbours = (neighbours) => (dispatch) => {
  dispatch({ type: 'NEIGHBOUR_REQUEST' });
  let callString = 'https://restcountries.eu/rest/v2/alpha?codes=';
  // eslint-disable-next-line
  neighbours.map( (neighbour) => {
    callString += neighbour;
    callString += ';';
  })
  return fetch(callString)
    .then(response => response.json())
    .then(result => dispatch({
      type: 'GET_NEIGHBOUR_REQUEST',
      payload: result,
    }))
  }

//Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_COUNTRY_REQUEST':
      return {
        ...state,
        country: action.payload,
      }
      case 'GET_NEIGHBOUR_REQUEST':
        return {
          ...state,
          neighbours: action.payload,
        }
    default:
      return state;
  }
}
