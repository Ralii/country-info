import React from 'react';

export default ({ data, itemOnClick }) => (
  <div>
  <h2>Show path to country: </h2>
  <select onChange={itemOnClick}>
    { data.map( ( row, index ) =>
      <option key={index} value={row.alpha3Code}>{row.name}</option>
    )}
  </select>
  </div>
)
