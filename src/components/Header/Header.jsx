import React from 'react';
import {useHistory, useLocation} from 'react-router-dom'

import styles from './Header.module.scss'
const Header = () => {
    const history = useHistory()
    const location = useLocation()
    console.log(location);
    return (
        <div className={styles.Header}>
            <h1>SAVAS App</h1>
            <div style={{display: 'flex'}}>
                 {
                    location.pathname === '/bank' || location.pathname === '/statistics'
                        ?   <button onClick={() => location.pathname === '/bank' ?  history.push(`/statistics`) : history.push(`/bank`)}>
                                {location.pathname === '/bank' ? 'Statistics' : 'Bank'}
                            </button>
                        :   null
                }  
                <button onClick={() => location.pathname === '/' ?  history.push(`/bank`) : history.push(`/`)}>
                    {location.pathname === '/' ? 'Bank' : 'Home'}
                </button>
                
            </div>
            
        </div>
    );
}

export default Header;
