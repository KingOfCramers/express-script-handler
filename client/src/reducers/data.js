const DEFAULT_STATE = { raw: [], source: null };

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {      
      case 'SET_DATA':
        return {
          ...state,
          raw: action.data
        }
      case 'REMOVE_DATUM':
        return {
          ...state,
          raw: state.raw.filter(datum => datum._id !== action.id)
        }
      case 'SET_DATA_SOURCE':
        return {
          source: action.source,
          raw: []
        }
      case 'CLEAR_DATA':
      case 'LOGOUT': 
          return DEFAULT_STATE;
      default:
        return state;
    }
  };