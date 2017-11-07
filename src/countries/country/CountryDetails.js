import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Neighbours from './Neighbours';

export default class CountryDetails extends Component {

  componentWillMount(){
    this.props.getCountry(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.country !== nextProps.country ) {
      this.props.getCountry(this.props.match.params.id);
      this.props.getNeighbours(nextProps.country.borders);
    }
  }

  render(){
    const { country, neighbours } = this.props;
    return(
      <div>
      <h1>Name: {country.name}</h1>
      <img src={country.flag} alt="country"/>
      <h2>Neighbours</h2>
      { typeof(neighbours) !== 'undefined'
        ? <Neighbours neighbours={neighbours} />
        : (null)
      }
      </div>
    )
  }
}
CountryDetails.PropTypes = {
  country: PropTypes.object,
  neighbours: PropTypes.array,
}
