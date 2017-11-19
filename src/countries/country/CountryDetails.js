import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Neighbours from './Neighbours';
import LstyleSelect from './LstyleSelect';
import RouteDisplay from './RouteDisplay';

export default class CountryDetails extends Component {

  constructor(){
    super();
    this.getPathToCountry = this.getPathToCountry.bind(this);
  }

  componentWillMount(){
    this.props.getCountry(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id) {
      this.props.getCountry(nextProps.match.params.id);
    }
    if(this.props.country.name !== nextProps.country.name) {
      this.props.getNeighbours(nextProps.country.borders);
    }
  }

  getPathToCountry(el) {
    this.props.getPathToCountry(this.props.countriesRouteData, el.target.value, this.props.country);
  }

  render(){
    const { country, neighbours, countriesRouteData, routeToSelectedCountry } = this.props;
    return(
      <div>
      <h1>Name: {country.name}</h1>
      <img src={country.flag} alt="country"/>
      <h2>Neighbours</h2>
      { typeof(neighbours) !== 'undefined'
        ? <Neighbours neighbours={neighbours} />
        : (null)
      }
      <LstyleSelect
      data={countriesRouteData}
      itemOnClick={this.getPathToCountry}/>
      <RouteDisplay
      routeData={routeToSelectedCountry}/>
      </div>

    )
  }
}

CountryDetails.PropTypes = {
  country: PropTypes.object,
  neighbours: PropTypes.array,
}
