import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getCountries, sortByName, sortByPopulation, sortByArea, onlyEnglishSpeaking } from './CountriesReducer';
import Countries from './Countries';

const countriesSelector = (state) => state.countries;
const countryFilterSelector = (state) => state.countryFilterCondition;

const sortCountries = createSelector(
  [countriesSelector, countryFilterSelector],
  (countries, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'SORT_BY_NAME':
        return countries.sort( (a, b) => {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      case 'SORT_BY_AREA':
        return countries.sort( (a, b) => {
        const textA = a.region.toUpperCase();
        const textB = b.region.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      case 'SORT_BY_POPULATION':
        return countries.sort( (a, b) => {
        const numberA = a.population;
        const numberB = b.population;
        return (numberA < numberB) ? -1 : (numberA > numberB) ? 1 : 0;
        });
      case 'ONLY_ENGLISH_SPEAKING':
        return countries.filter( (country) => {
          let x = false;
          // eslint-disable-next-line
            country.languages.map( (language) => {
              if(language.name === 'English') {
                x =  true;
              }
            })
            return x;
        })
      default: return countries;
    }
  }
)

const mapStateToProps = (state, props) => {
  const countriesReducer = state.CountriesReducer;
  return {
    countries:sortCountries(countriesReducer),
    countryFilterCondition: countriesReducer.countryFilterCondition,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCountries(countries) { dispatch(getCountries(countries) )},
  sortByName(){ dispatch(sortByName() )},
  sortByPopulation(){ dispatch(sortByPopulation() )},
  sortByArea(){ dispatch(sortByArea() )},
  onlyEnglishSpeaking(){ dispatch(onlyEnglishSpeaking() )},
});

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
