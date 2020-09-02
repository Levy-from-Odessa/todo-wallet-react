// !STATE
const initialState = {
    personalInfo: {},
    personalHistoty:[],
    loading: true,
    error: '',

    statisticsHistory:[],
    XToken: ''

  }

// !MUTATIONS
const todoReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case 'FETCH_PERSONAL_TOKEN':

        return{
          ...state,
          XToken: payload
        }

      case 'FETCH_PERSONAL_INFO_SUCCESS':

        return{
          ...state,
          personalInfo: payload,
          loading: false
        }
      case 'FETCH_PERSONAL_HISTORY_SUCCESS':

        return{
          ...state,
          personalHistoty: payload,
          loading: false
        }

      case 'FETCH_STATISTICS_HISTORY_SUCCESS':
        return{
          ...state,
          statisticsHistory: [...state.statisticsHistory, ...payload],
          loading: false
        }

      case 'FETCH_DELETE_STATISTICS_HISTORY':
        return{
          ...state,
          statisticsHistory: [],
          loading: true
        }

      case 'LOADING':
        return{
            ...state,
            loading: true
          } 
       
       
      default:
          return state
    }
  };

  export default todoReducer