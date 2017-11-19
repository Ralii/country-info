import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import CountryDetails from './CountryDetails'
import { getCountry, getNeighbours, getPathToCountry } from './CountryReducer';

const countriesSelector = (state) => state.countries;

const countriesRouteDataSelector = createSelector(
  [countriesSelector],
  (countries) => {
    return countries.map( (country) => {
      return {
        name: country.name,
        alpha3Code: country.alpha3Code,
        neighbours: country.borders,
       }
    })
  }
)

const mapStateToProps = (state, props) => {
  const { CountryReducer, CountriesReducer } = state;
  return {
    country: CountryReducer.country,
    countriesRouteData: countriesRouteDataSelector(CountriesReducer),
    countries: CountriesReducer.countries,
    neighbours: CountryReducer.neighbours,
    routeToSelectedCountry: CountryReducer.routeToSelectedCountry,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCountry(country) { dispatch(getCountry(country)) },
  getNeighbours(borders) { dispatch(getNeighbours(borders)) },
  getPathToCountry(countriesRouteData, targetCountry, currentCountry) {dispatch(getPathToCountry(countriesRouteData, targetCountry, currentCountry))},
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);
