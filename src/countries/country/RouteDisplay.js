import React from 'react';

export default ({ routeData }) => (
  <div>
  <h2>Path to country:</h2>
    { routeData.map( ( row, index ) =>
      <p>{row} -></p>
    )}
  </div>
)
