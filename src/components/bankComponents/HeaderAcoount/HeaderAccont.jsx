import React from 'react';

import styles from './Header.module.scss'
const HeaderAccont = ({account}) => {
    
    
    return (
        <div className={styles.HeaderAccont}>
            <img src="https://mobank.com.ua/wp-content/uploads/2018/03/5a5dcb9ba8daa-1.png" alt=""/>
            <span>{account.maskedPan}</span>
            <h2>{account.balance/100} {account.cashbackType}</h2>
            <div className={styles.footer}>
                <h3>{account.creditLimit} <small>- credit limit</small> </h3>
                <small>{account.type} </small>
            </div>
            
        </div>
    );
}

export default HeaderAccont;
