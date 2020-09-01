import React, { useEffect , useState} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import {fetchPersonalInfo, fetchPersonalHistory} from '../../reducers/bank/bankActions'

import HeaderAccont from '../../components/bankComponents/HeaderAcoount/HeaderAccont'
import HistoryAccount from '../../components/bankComponents/HistoryAccount/HistoryAccount';
import Loader from '../../components/UI/Loader/Loader'
import Auth from '../../components/Auth/Auth'



const BankPage = () => {
   const dispatch = useDispatch()
   const {personalInfo, personalHistoty, loading} = useSelector(state => state.bankReducer)
   

   const [authModal, setAuthModal] = useState(false);
   
   useEffect(() => {
       if(authModal){
        const setPersonalInfo = async() => {
            dispatch(fetchPersonalInfo()) 
        }
        setPersonalInfo() 
       }
       
   }, [dispatch, authModal]);

  

   useEffect(() => {
       if(authModal){
            let today = (new Date())
            let from = today.setMonth(today.getMonth(), 0)
            const setPersonalHistory = async() => {
                dispatch(fetchPersonalHistory({ from})) 
            }
            setPersonalHistory()  
       }
        
   }, [dispatch, authModal]);
    
    return (
        <div>
            {
                loading 
                ? <Loader/>
                :
                    <>
                        <h1>{personalInfo.name}</h1>
                        {
                            personalInfo.accounts && 
                                personalInfo.accounts.map((acc => (
                                    <HeaderAccont key={acc.id} account={acc}/>
                                )))
                        }
                        {
                            personalHistoty
                            && <HistoryAccount personalHistoty={personalHistoty}/>
                        }
                        
                    </>
            }
            {
               !authModal && <Auth onCloseAuth={() => setAuthModal(true)}/> 
            } 
            
            
        </div>
    );
}

export default BankPage;
