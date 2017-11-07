import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Countries.css';

import CountryButton from './CountryButton';
import CountryLinkList from './CountryLinkList';

class App extends Component {

  constructor(){
    super();
     this.sortByName = this.sortByName.bind(this);
     this.sortByPopulation = this.sortByPopulation.bind(this);
     this.sortByArea = this.sortByArea.bind(this);
     this.onlyEnglishSpeaking = this.onlyEnglishSpeaking.bind(this);
  }

  componentWillMount() {
      this.props.getCountries();
      this.props.sortByPopulation();
  }

  sortByName(){ this.props.sortByName(); }
  sortByPopulation(){ this.props.sortByPopulation(); }
  sortByArea(){ this.props.sortByArea(); }
  onlyEnglishSpeaking(){ this.props.onlyEnglishSpeaking(); }

  render() {
  const { countries, countryFilterCondition } = this.props;
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Eu country display App</h1>
          <h2>Filtering with { countryFilterCondition }</h2>
        </header>

        <div className="App-intro">

          <CountryButton name="Sort by name" clickAction={this.sortByName}/>
          <CountryButton name="Sort by population" clickAction={this.sortByPopulation}/>
          <CountryButton name="Soft by area" clickAction={this.sortByArea}/>
          <CountryButton name="Only english speaking countries" clickAction={this.onlyEnglishSpeaking}/>

          <CountryLinkList countries={countries}/>
        </div>
      </div>
    );
  }
}

export default App;

App.PropTypes = {
  countries: PropTypes.array,
  countryFilterCondition: PropTypes.string,
}
