import React, {useState} from 'react';
import styles from './TodoPoint.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'


const TodoPoint = ({item, readOnly, onChangeText, onChangeChecked, onDeletePoint}) => {

    const {text, done} = item

    const [editMode, setEditMode] = useState(false);


    

    return (
        <>
            <li className={styles.TodoPoint}>
                
                    {
                        editMode
                        ?   
                            <input type="text" value={text} 
                                   onChange={(e) => onChangeText(e.target.value)}
                                   onMouseOut={() => setEditMode(!editMode)}       
                                   
                            />
                        :   
                            <label className={styles.container}>
                                    {text}
                                    <input type="checkbox" disabled={readOnly} 
                                                        checked={done} 
                                                        onChange={() => onChangeChecked()}
                                                        />
                                    <span className={styles.checkmark}></span>
                            </label>
                    }
                    
                    
                
                
               {
                  readOnly
                    ?  null
                    :   <>
                            <span className=""> 
                                <FontAwesomeIcon icon={faPencilAlt}
                                                 onClick={() => setEditMode(!editMode)} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faTimes}
                                                 onClick={() => onDeletePoint()}
                                    />
                            </span>
                        </>

               }
               
                
              
            </li>
        </>
    );
}

export default TodoPoint;
