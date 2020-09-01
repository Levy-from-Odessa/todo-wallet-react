import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import {fetchStatisticsHistory} from '../../reducers/bank/bankActions'


import mccConvert from 'merchant-category-code'


import Loader from '../../components/UI/Loader/Loader'
import PieChart from '../../components/Charts/PieChart';
import TableChart from '../../components/Charts/TableChart/TableChart';


import styles from './StatisticsPage.module.scss'
const StatisticsPage = () => {
   const dispatch = useDispatch()
   const {personalInfo:{name},statisticsHistory,  loading} = useSelector(state => state.bankReducer)


   const [countOfStatistics, setCountOfStatistics] = useState(1);
   const [disabledSelection, setDisabledSelection] = useState(true);


   const [sortedStatisticsHistory, setSortedStatisticsHistory] = useState([]);
   const [gainSortedHistory, setGainSortedHistory] = useState([]);  
   const [lossSortedHistory, setLossSortedHistory] = useState([]);

   const [totalLoss, setTotalLoss] = useState(null);
   const [totalGain, setTotalGain] = useState(null);

    //* upload all statistics history 
   useEffect(() => {
    console.log(countOfStatistics);
    const setStatisticsHistory = async() => {
        dispatch(fetchStatisticsHistory({ countOfStatistics}))
        
    }
    setStatisticsHistory()
        
        
   }, [dispatch, countOfStatistics]);

   useEffect(() => {
    const copyStatisticsHistory = JSON.parse(JSON.stringify(statisticsHistory));
    copyStatisticsHistory.unshift({})
    const getAmount = Object.values(copyStatisticsHistory.reduce((a,b) => {
        let mcc = mccConvert(b.mcc).irs_description
            if(a[mcc]) {
                
                a[mcc].amount = a[mcc].amount + (b.amount) 
            }
            else {
            
                a[mcc] = {mcc, amount : b.amount } 
            }
            return a;
    
    }));
    getAmount.map((item) => (item.amount = item.amount/100))
    setSortedStatisticsHistory(getAmount)
      
    }, [statisticsHistory]);

    useEffect(() => {
        // TODO 
        const value = Object.assign([], sortedStatisticsHistory) 
        // lost money
        let lossStatistics = value.filter((item) => (item.amount<0 ))
        // gain money
        let gainStatistics = value.filter((item) => (item.amount>0 ))
        
        setLossSortedHistory(lossStatistics)
        setGainSortedHistory(gainStatistics)
        
        setTotalLoss(lossStatistics.reduce((a, b) => (a  + b.amount), 0)) 
        setTotalGain(gainStatistics.reduce((a, b) => (a  + b.amount), 0))
        
        setTimeout(() => {
             setDisabledSelection(false)  
        }, 40000);
       
        
        
    }, [sortedStatisticsHistory]);

    const getCountOfMonths = (e) =>{
        setDisabledSelection(true)
        setCountOfStatistics(e.target.value)
    }

    


  
    return (
        <div>
            {
                loading
                ? <Loader/>
                :
                    <>
                        <h1>{name}</h1>
                        <h3>{totalGain} + {totalLoss} = {Math.floor(totalLoss + totalGain)}</h3>
                        <select disabled={disabledSelection} onChange={(e) =>getCountOfMonths(e)}>
                            <option> for {countOfStatistics} months</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <div className={styles.StatisticsPage} >
                            <div className={styles.Chart} >
                                <h1>Lost</h1>
                                <PieChart  statisticsHistory={lossSortedHistory}/>
                                <TableChart statisticsHistory={lossSortedHistory}/>
                            </div>
                            <div className={styles.Chart}>
                                <h1>Gained</h1>
                                <PieChart  statisticsHistory={gainSortedHistory}/>
                                <TableChart statisticsHistory={gainSortedHistory}/> 
                            </div>

                            
                            
                        </div>

            
                        
                        
                        
                    </>
            }
            
            
        </div>
    );
}

export default StatisticsPage;
