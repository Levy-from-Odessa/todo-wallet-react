import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch} from 'react-redux'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus} from '@fortawesome/free-solid-svg-icons'

import {fetchUpdateTodoItem} from '../../../reducers/todo/todoActions'

import TodoPoint from '../TodoPoint/TodoPoint';

import styles from './TodoItem.module.scss'

const TodoItem = ({todo, index, reviewMode, onOpenModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {items} = todo

    const {readOnly, countOfPoints} = reviewMode 

    const [updatedTodo, setupdatedTodo] = useState([{title:'', items:[]}]);

    const [editModeTitle, setEditModeTitle] = useState(false);
    

    // get and cut todo from store 
    useEffect(() => {
        if(items === undefined){
            setupdatedTodo({...todo, items: []})
         }
        //  if need only 3 points to show 
         else if(items.length > 3 && countOfPoints === 3 && countOfPoints){
            const copyItems = [...items]
            setupdatedTodo({...todo, items: [...copyItems.splice(0,countOfPoints)]})
         } 
         else{
             setupdatedTodo({...todo})
         }
    }, [countOfPoints, items, todo]);
    
    // set unchacked/chacked for point
    const changeChecked = (index) => {
        const newUpdatedTodo = {...updatedTodo}

        newUpdatedTodo.items.map(el => updatedTodo.items.indexOf(el) === index
            ? el.done = !el.done
            : el
            )

        setupdatedTodo({...newUpdatedTodo})
    }

    // set new text for point
    const changeText = (item, value) => {
        const newUpdatedTodo = {...updatedTodo}
        newUpdatedTodo.items.map(
            el => updatedTodo.items.indexOf(el) === updatedTodo.items.indexOf(item)
                        ? el.text = value
                        : el
                        )
    
        setupdatedTodo({...newUpdatedTodo})
            
    }

    // create new empty point
    const addEmptyPoint = () => {
        const newEmptyPoint = {text:'new', done:false}
        if(updatedTodo.items){
                setupdatedTodo({
                ...updatedTodo,
                items:[...updatedTodo.items,newEmptyPoint]
            })
        }else{
            setupdatedTodo({...updatedTodo, items: newEmptyPoint})
        }
        
    }

    // delete point
    const deletePoint = (index) => {
        const copyItems = [...updatedTodo.items]
        copyItems.splice(index, 1)
        setupdatedTodo({...updatedTodo, items: copyItems})
    }
    
    // save todo in store 
    const saveTodo = (index) =>{
        dispatch(fetchUpdateTodoItem(index, updatedTodo))
        history.push(`/`)
    }

    
    const TodoItemStyle = [styles.TodoItem]
    if(!readOnly){
        TodoItemStyle.push(styles.TodoItem_edit)
    }

    return (

        
        <div className={TodoItemStyle.join(' ')}>
            
            <div className={styles.header}>
                <h1>
                    TODO
                {
                    !editModeTitle || readOnly
                        // FOR READ ONLY MODE TITLE
                        ?
                            <p onDoubleClick={() => setEditModeTitle(true)}>
                                    {updatedTodo.title}
                            </p> 
                        // FOR EDIT TITLE MODE
                        :
                            <div>
                                <input type="text" value={updatedTodo.title} 
                                onChange={(e) => setupdatedTodo({...updatedTodo, title: e.target.value})}
                                onMouseOut={() => setEditModeTitle(!editModeTitle)}       
                                
                                /> 
                            </div>
                             
                }
                </h1>
               
                {/* open modal form -> del card-todo */}
                <FontAwesomeIcon className={styles.header_cross} 
                                 icon={faTimes} 
                                 onClick={onOpenModal}
                />

            </div>
            <ul>
                {/* point of todo */}

                {
                     updatedTodo.items !== undefined 
                        &&  updatedTodo.items.map( (item, index) => (
                    
                                <TodoPoint key={index} item={item} readOnly={readOnly} 
                                           onChangeChecked={() => changeChecked(index)}
                                           onChangeText={(value) => changeText(item, value)}
                                           onDeletePoint={() => deletePoint(item)}
                                />
                                        
                ))}
                
            </ul>
            
            {
                !readOnly 
                //FOR EDIT MODE
                ?   
                    <div className={styles.edit_style}>
                        {/* btn save todo */}
                        <button className={["Btn",styles.save].join(' ')}
                                onClick={() => saveTodo(index) }
                        >
                            Save
                        </button>
                        {/* btn add point */}
                        <FontAwesomeIcon icon={faPlus} 
                                         className={styles.plus_point} 
                                         onClick={() => addEmptyPoint()}
                        />

                        {/* btn back home */}
                        <button className={["Btn",styles.cancel].join(' ')}
                                onClick={() => history.push(`/`)}
                        >
                            Cancel
                        </button>
                    </div>

                // FOR READ ONLY MODE
                :
                    // btn open edit page
                    <button className={["Btn",styles.edit].join(' ')} 
                            onClick={() => history.push(`/editTodo/${index}`)}>
                        EDIT
                    </button>
            }
        </div>
    );
}

export default TodoItem;
