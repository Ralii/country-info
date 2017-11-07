import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Route,
} from 'react-router-dom'

export default class CountryLinkList extends Component {

  render() {
    return (
      <div>
      {this.props.countries.map( (country, index) =>
        <div className="left" key={index}>
          <Link to={"/country/" +country.alpha2Code}> {country.name}</Link>
        </div>
      )}
        <div className="right">
          <Route exact path="/" render={() => (
            <h2>Example Heading</h2>
          )}/>
        </div>
      </div>
    )
  }
}

CountryLinkList.PropTypes = {
  countries: PropTypes.array,
}
