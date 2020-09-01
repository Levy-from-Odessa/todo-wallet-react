import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import {fetchAddTodoItem, fetchRemoveTodoItem} from '../../reducers/todo/todoActions'


import Modal from '../../components/UI/Modal/Modal'
import TodoItem from '../../components/todoComponents/TodoItem/TodoItem'
import styles from './Home.module.scss'


const Home = () => {
    const dispatch = useDispatch()
    const {todos} = useSelector(state => state.todoReducer)
    

    const [modal, setModal] = useState(false);
    const [indexOfTodo, setIndexOfTodo] = useState(null);


    const deleteTodoItem = () => {
        dispatch(fetchRemoveTodoItem(indexOfTodo))
        setModal(false)
    }

    return (
            <div className={styles.Home}>
                {/* modal window */}
                {modal && 
                    <Modal  onCloseModal={() => setModal(false)}
                            onAgree={() => deleteTodoItem()}  
                />}

                {/* all cards of todos */}
                {todos.map( (todo, index) => (
                    <TodoItem className={styles.TodoItem} key={index} 
                              index={index}
                              todo={todo} 
                              reviewMode={{readOnly:true, countOfPoints:3}}
                              onOpenModal={() => {setModal(true); setIndexOfTodo(index)}}
                            />
                ))} 

                {/*card of add todo  */}
                <div className={styles.TodoItem}>
                    <FontAwesomeIcon className={["Btn", styles.addBtn].join(' ')}
                                     onClick={()=> dispatch(fetchAddTodoItem())}
                                     icon={faPlusSquare} />
                </div>     
                
            </div>
        
    );
}

export default Home;
