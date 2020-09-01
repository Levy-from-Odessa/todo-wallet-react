import React, {useEffect, useState} from 'react';


import styles from './HistoryTable.module.scss'
import HistoryTableCell from './HistoryTableCell/HistoryTableCell';
const HistoryTable = ({personalHistoty}) => {

    const [firstDay, setFirstDay] = useState(0);
    const [reverseHistory, setReverseHistory] = useState(null);
    
    
    
    const [month, setMonth] = useState([]);
    const [monthMarked, setMonthMarked] = useState([]);


    const convertToDate = (time) => {
        return new Date(time*1000).getDate()
    }


    const daysInMonth = (month) => {
        const todayYear = ((new Date()).getFullYear()) 
        return new Date(todayYear,month, 0).getDate();

    }
    



    useEffect(() => {
        const copyPersonalHistoty = JSON.parse(JSON.stringify(personalHistoty));
        copyPersonalHistoty.unshift({})
        const sortedPersonalHistory = Object.values(copyPersonalHistoty.reduce((a,b) => {
            let time = convertToDate(b.time) 
            if(a[time]) {
                a[time].amount.push(b.amount) 
                a[time].description.push(b.description) 
            }
            else {
               
                a[time] = {time, amount : [b.amount],description: [b.description] } 
            }
            return a;
            
          }));
          
        sortedPersonalHistory.map(item => {
            if(item.amount){
              item.amount = item.amount.reduce((a, b) => ( a + b))  
            }
        })
        
        setReverseHistory([...sortedPersonalHistory.reverse()])
        console.log([...sortedPersonalHistory]);

    
    }, [ personalHistoty]);

   

    useEffect(() => {
        const lowestDate = personalHistoty.reduce((a, b) => (
            a.time < b.time
                ? a
                : b   
            
        ))
        const convertedLowestDate = new Date(lowestDate.time*1000)

        setFirstDay(convertedLowestDate.getDay());
        
    }, [personalHistoty]);

    useEffect(() => {
        const todayMonth = ((new Date()).getMonth()) + 1 
        const countTodayMonth = daysInMonth(todayMonth) + 1
        let days =[]
        const delay = firstDay
        for (let i = 1; i <=countTodayMonth+delay; i++) {
            if(i<=delay){
                days.push({time: 0})
            }else{
              days.push({time: i-delay})  
            }
            
        }
        
        setMonth([...days])
        setMonthMarked([...days])
    }, [firstDay]);


    useEffect(() => {
        
        if(reverseHistory){
            month.forEach((day, index) => {
                const newDay = reverseHistory.find(statement => { 
                    return( statement.time === day.time)
                })
                
                if(newDay){
                    
                    setMonthMarked( m => [...monthMarked, ...monthMarked.splice(index, 1, newDay)])
                }else{
                    setMonthMarked( m => [...monthMarked, ...monthMarked.splice(index, 1,  day)])
                }
            })
        }

        
    }, [ reverseHistory, month]);
   

   

    return (
        <table className={styles.HistoryTable}>
            <thead>
                <tr>
                     <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    monthMarked             
                        && monthMarked.map((statement, index) => (
                            (index%7 === 0 )
                                ?<>
                                    <tr key={index+30}></tr> 
                                    <HistoryTableCell statement={statement} key={index}/>
                                </>
                                        
                                : <HistoryTableCell statement={statement} key={index}/>
                                
                                
                            )
                        )
                            
               
                }
            </tbody>
           
        </table>
        
    );
}

export default HistoryTable;
