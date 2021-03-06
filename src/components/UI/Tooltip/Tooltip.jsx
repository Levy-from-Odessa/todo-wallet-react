import React from 'react';

import styles from './Tooltip.module.scss'
const Tooltip = ({children}) => {
    return (
        <div className={styles.Tooltip}>
            {children}
        </div>
    );
}

export default Tooltip;
