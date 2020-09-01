import React from 'react';

import mccConvert from 'merchant-category-code'

import styles from './HistoryStroke.module.scss'
const HistoryStroke = ({statement:{mcc, amount, cashbackAmount, description, time}}) => {
    const convertedDate = new Date(time* 1000)
    return (
        <li className={styles.HistoryStroke}>
            <div className={[styles.description, styles.item].join(' ')}>
                <small>{mccConvert(mcc).irs_description}</small>
                <span>{description}</span>
            </div>
            <span className={styles.item}>
                {amount/100}
            </span>
            <span className={styles.item}>
                {cashbackAmount/100} 
                <small> cash back</small> 
            </span>
            <small className={styles.time}>
                {convertedDate.getDate()}.{ convertedDate.getMonth() }
            </small>
        </li>
    );
}

export default HistoryStroke;
