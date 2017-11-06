import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Neighbours from './Neighbours';

export default class CountryDetails extends Component {

  componentWillMount(){
    this.props.getCountry(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.country !== nextProps.country) {
      this.props.getNeighbours(this.props.country.borders);
    }
  }

  render(){
    const { country } = this.props;
    return(
      <div>
      <h1>Name: {country.name}</h1>
      <img src={country.flag} alt="country"/>
      <h2>Neighbours</h2>
      <Neighbours neighbours={this.props.neighbours} />
      </div>
    )
  }
}

CountryDetails.PropTypes = {
  country: PropTypes.object,
  neighbours: PropTypes.array,
}
