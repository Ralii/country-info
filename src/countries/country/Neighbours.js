import React from 'react';
import { Link } from 'react-router-dom';

export default ({ neighbours }) => (
  <ul style={{'listStyleType': 'none'}}>
  { neighbours.map( ( neighbour, index ) =>
      <li key={index}>
        <Link to={"/country/" +neighbour.alpha2Code}> {neighbour.name}</Link>
      </li>
  )}
  </ul>
)
