import React, {useState} from 'react';

import styles from './HistoryTableCell.module.scss'
import Tooltip from '../../../../UI/Tooltip/Tooltip';
const HistoryTableCell = ({statement}) => {


    const [tooltip, setTooltip] = useState(false);

    const convertToDate = (time) => {
        return new Date(time*1000).getDate()
    }
    return (
        <td className={styles.HistoryTableCell} 
            onMouseOver={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
        >
            <small>
                {statement.time>100 
                    ? convertToDate(statement.time) 
                    : statement.time  } 
            </small>
            
            {statement.amount ? statement.amount/100 : null}
            {
                tooltip && statement.description
                    && <Tooltip>
                            {statement.description.map(item => 
                                <p>{item}</p>
                                )}
                        </Tooltip>
            }
           
        </td>
    );
}

export default HistoryTableCell;
