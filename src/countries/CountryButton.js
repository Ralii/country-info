import React from 'react';
import './CountryButton.css';

export default ({ name, clickAction }) => (
  <button onClick={ clickAction } className="CountryButton">{name}</button>
)
