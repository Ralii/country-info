import React from 'react';

export default ({ routeData }) => (
  <div>
  <h2>Path to country:</h2>
    { routeData.path.map( ( row, index ) =>
      <p>{row.name} </p>
    )}
  </div>
)
