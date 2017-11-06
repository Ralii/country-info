const initialState = {
  countriesRequest: false,
  countries: [],
  countryFilterCondition: '',
};

// Actions
export const getCountries = (countries) => (dispatch) => {
  dispatch({ type: 'COUNTRIES_REQUEST' });
  return fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(result => dispatch({
      type: 'GET_COUNTRIES_REQUEST',
      payload: result,
    }))
}

export const sortByName = () => (dispatch) => { dispatch({ type: 'SORT_BY_NAME' }); }
export const sortByPopulation = () => (dispatch) => { dispatch({ type: 'SORT_BY_POPULATION' }) }
export const sortByArea = () => (dispatch) => { dispatch({ type: 'SORT_BY_AREA' }) }
export const onlyEnglishSpeaking = () => (dispatch) => { dispatch({ type: 'ONLY_ENGLISH_SPEAKING' }) }

//Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case 'COUNTRIES_REQUEST':
      return {
        ...state,
        countriesRequest: true,
      }
    case 'GET_COUNTRIES_REQUEST':
      return {
        ...state,
        countries: action.payload,
      }
    case 'SORT_BY_NAME':
    case 'SORT_BY_POPULATION':
    case 'SORT_BY_AREA':
    case 'ONLY_ENGLISH_SPEAKING':
        return {
            ...state,
            countryFilterCondition: action.type,
          }
    default:
      return state;
  }
}
