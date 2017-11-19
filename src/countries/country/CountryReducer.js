const initialState = {
  country: {},
  neighbours: [],
  routeToSelectedCountry: [{name:'moi'}],
  hei: 'moi',
};

// Actions
export const getCountry = (country) => (dispatch) => {
  dispatch({ type: 'COUNTRY_REQUEST' });
  return fetch('https://restcountries.eu/rest/v2/alpha/' + country)
    .then(response => response.json())
    .then(result => dispatch({
      type: 'GET_COUNTRY_REQUEST',
      payload: result,
    }))
}

export const getNeighbours = (neighbours) => (dispatch) => {
  dispatch({ type: 'NEIGHBOUR_REQUEST' });
  let callString = 'https://restcountries.eu/rest/v2/alpha?codes=';
  if(neighbours.length > 0 ) {
      // eslint-disable-next-line
      neighbours.map( (neighbour) => {
      callString += neighbour;
      callString += ';';
    })
    return fetch(callString)
      .then(response => response.json())
      .then(result => dispatch({
        type: 'GET_NEIGHBOUR_REQUEST',
        payload: result,
      }))
  } else {
    return dispatch({
      type: 'GET_NEIGHBOUR_REQUEST_NO_NEIGHBOURS',
    })
  }
}

export const getPathToCountry = (countriesRouteData,targetCountry,currentCountry) => (dispatch) => {
  dispatch({type: 'GET_PATH_TO_COUNTRY'});
  console.log(currentCountry);

const neighboursAsObjects = (node, countriesRouteData) => {
  return node.neighbours.map( (neighbour) => {
    return countriesRouteData.filter( (country) => {
      return country.alpha3Code === neighbour;
    })
  })
}
  let routeOptions = [];

  const breathFirstSearch = (endpoint, searchList, path ) => {
      // eka pois listalta koska se on seuraava katsottava
      let currentNode = searchList.shift();
      currentNode = currentNode[0];

      if(currentNode.alpha3Code === endpoint) {
        routeOptions.push({path: path});
        return path;
       }
      path.push(currentNode);

      const neighbours = neighboursAsObjects(currentNode, countriesRouteData);

      neighbours.forEach( (neighbour) => {
        const paths = path.filter( (pathCountry) => {
          return pathCountry.alpha3Code === neighbour[0].alpha3Code;
        })
        const pathList = searchList.filter( (listCountry) => {
          return listCountry[0].alpha3Code === neighbour[0].alpha3Code;
        })
        if(paths.length === 0 && pathList.length === 0 ) {
           let tempList = searchList;
           tempList.push([neighbour[0]])

           const cloneTemp = JSON.parse(JSON.stringify(tempList));
           const clone = JSON.parse(JSON.stringify(path))
           breathFirstSearch(endpoint, cloneTemp, clone);
         };
      })
      };

  const transformCurrentCountry = [{
    name: currentCountry.name,
    alpha3Code: currentCountry.alpha3Code,
    neighbours: currentCountry.borders,
  }]

  const haku = breathFirstSearch(targetCountry,[transformCurrentCountry],[]);
  routeOptions.sort( (a,b) => {
    console.log(a.path);
    console.log(b.path);
    return a.path.length - b.path.length;
  })
  console.log(routeOptions);

  dispatch({
    type: 'ROUTE_TO_SELECTED_COUNTRY',
    payload: routeOptions[0],
  })
}


//Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_COUNTRY_REQUEST':
      return {
        ...state,
        country: action.payload,
      }
      case 'GET_NEIGHBOUR_REQUEST':
        return {
          ...state,
          neighbours: action.payload,
        }
      case 'ROUTE_TO_SELECTED_COUNTRY':
        return {
          ...state,
          routeToSelectedCountry: action.payload,
        }
    default:
      return state;
  }
}
