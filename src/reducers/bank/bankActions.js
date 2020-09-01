
import Services from '../../Services/Api'


// get data from store to action
import store from '../../store/store'
// store.getState().Reducer.date
// !ACTIONS

export const fetchPersonalToken = Token => {
  return {
    type: 'FETCH_PERSONAL_TOKEN',
    payload: Token
  }
}




// const XToken = 'uc__xL08Oo1Oe591O1FfsGn1-Hgi2jCAAFU9E4hI8Grg'

// send get req to get all res from db and set it in store
// with that was set in store
export const fetchPersonalInfo = () => {
    return async(dispatch)=> {
        try {
            dispatch(loading())
            const {XToken} = store.getState().bankReducer
            console.log(XToken);
            const response = (await Services.getPersonalInfo({XToken})).data
            
            dispatch(fetchPersonalInfoSuccess(response))
        } catch (error) {
            dispatch(fetchFailure(error))
        }
    }
}

// if a get(get all) req was succeed it would set a res data in store 
export const fetchPersonalInfoSuccess = personalInfo => {
    return {
      type: 'FETCH_PERSONAL_INFO_SUCCESS',
      payload: personalInfo
    }
  }

export const fetchPersonalHistory = ({from}) => {
  return async(dispatch)=> {
      try {
          dispatch(loading)
          const {XToken} = store.getState().bankReducer
          const response = (await Services.getPersonalHistory({from, XToken})).data
        
          dispatch(fetchPersonalHistorySuccess(response))
      } catch (error) {
          dispatch(fetchFailure(error))
      }
  }
}

export const fetchPersonalHistorySuccess = personalHistoty => {
  return {
    type: 'FETCH_PERSONAL_HISTORY_SUCCESS',
    payload: personalHistoty
  }
}

const sleep = m => new Promise(r => setTimeout(r, m))
let today = (new Date())

export const fetchStatisticsHistory = ({countOfStatistics}) => {
  return async(dispatch)=> {
    try {
      dispatch(loading)
      let statisticsHistory = []
      let to = 0
      const {XToken} = store.getState().bankReducer
      for(let i = 0; i< countOfStatistics; i++){
        //intersting thing setMonth = that prev Month 
        // and if month<0 = 11  
        let from = today.setMonth((today.getMonth()), 0)
        console.log((today.getMonth()));
        const response = (await Services.getPersonalHistory({from,to,XToken})).data
        // currect month - day
        to = from - 86400 

        statisticsHistory.push(...response)
        await sleep(5000)  //min time each req 40s        
      } 
        console.log(statisticsHistory);
      
        dispatch(fetchStatisticsHistorySuccess(statisticsHistory))
    } catch (error) { 
        dispatch(fetchFailure(error))
    }
  }
}


export const fetchStatisticsHistorySuccess = itemStatisticsHistoty => {
  return {
    type: 'FETCH_STATISTICS_HISTORY_SUCCESS',
    payload: itemStatisticsHistoty
  }
}

export const fetchDeleteStatisticsHistory = () => {
  return {
    type: 'FETCH_DELETE_STATISTICS_HISTORY'
  }
}









  
// if a ANY of req wasnt succed it would recive a res error and sent in a store
export const fetchFailure = error => {
    return {
      type: 'FETCH_FAILURE',
      payload: error
    }
  }
// call action to set loading 
export const loading = () => {
  return {
    type: 'LOADING'
  }
}