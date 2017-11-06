import { connect } from 'react-redux';

import CountryDetails from './CountryDetails'
import { getCountry, getNeighbours } from './CountryReducer';

const mapStateToProps = (state, props) => {
  const { CountryReducer } = state;
  return {
    country: CountryReducer.country,
    neighbours: CountryReducer.neighbours,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCountry(country) { dispatch(getCountry(country)) },
  getNeighbours(neighbours) { dispatch(getNeighbours(neighbours)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);
