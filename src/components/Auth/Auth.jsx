import React, {useState} from 'react';

import {useDispatch} from 'react-redux'

import {fetchPersonalToken} from '../../reducers/bank/bankActions'

import styles from './Auth.module.scss'
const Auth = ({onCloseAuth}) => {
    const dispatch = useDispatch()


    const [token, setToken] = useState('');

    return (
        <>
            <div className={styles.Background} >
            </div>
            <div className={styles.Modal}>
                <h1>please enter yor X-Token</h1>
                <input type="text" onChange={(e) => setToken(e.target.value)}/>
                <button className="Btn" 
                        onClick={() => {dispatch(fetchPersonalToken(token)); onCloseAuth() }}
                        >
                    Enter
                </button>
                <a href="https://api.monobank.ua/">https://api.monobank.ua/</a>
                <small>here you can get your token</small>
            </div>
        </>
    );
}

export default Auth;
