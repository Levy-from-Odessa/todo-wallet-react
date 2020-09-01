import React from 'react';

import styles from './TableChart.module.scss'

const TableChart = ({statisticsHistory}) => {
    return (
        <table className={styles.TableChart}>
            <thead>
                <tr>
                   {
                       statisticsHistory.map((item, index ) => <th key={index}>{item.mcc}</th>)
                   }
                </tr>
            </thead>
            <tbody>
                <tr>
                   {
                       statisticsHistory.map((item, index ) => <td key={index}>{item.amount}</td>)
                   }
                </tr>
            </tbody>
            
        </table>
    );
}

export default TableChart;
