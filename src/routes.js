import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

import CountriesContainer from './countries/CountriesContainer';
import CountryContainer from './countries/country/CountryContainer';

const routes = (
  <div>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CountriesContainer} />
      <Route path="/country/:id" component={CountryContainer}/>
    </Switch>
  </BrowserRouter>
  </div>
)

export default routes
