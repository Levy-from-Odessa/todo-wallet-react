import React, {useState} from 'react';


import HistoryStroke from './HistoryStroke/HistoryStroke';
import HistoryTable from './HistoryTable/HistoryTable'

import styles from './HistoryAccount.module.scss'


const HistoryAccount = ({personalHistoty}) => {
    const [listMode, setListMode] = useState(false);


    return (
        <div className={styles.HistoryAccount}>
            <button className={'Btn'} onClick={() => setListMode(!listMode)}>
                {listMode ? 'list' : 'calendar'} mode
            </button>
            {
                !listMode
                    ? <ul>
                        {
                            personalHistoty
                            && personalHistoty.map(statement => (
                            <HistoryStroke key={statement.id} statement={statement}/>
                            ))
                        }
                        </ul>
                    : <>
                        {
                            personalHistoty
                                && <HistoryTable personalHistoty={personalHistoty}/>
                        }
                    </>
                
            }
            
        </div>
      
    );
}

export default HistoryAccount;
