import React, {useState, useEffect} from 'react';
import TodoItem from '../../components/todoComponents/TodoItem/TodoItem';

import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router'

import {fetchFindTodo, fetchRemoveTodoItem} from '../../reducers/todo/todoActions'



import Modal from '../../components/UI/Modal/Modal'


const EditTodoItem = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const {todo} = useSelector(state => state.todoReducer)

    const [modal, setModal] = useState(false);


    useEffect(() => {
        // find one todo
        dispatch(fetchFindTodo(params.todoId))
    }, [params ,dispatch ]);



    const deleteTodoItem = () => {
        // delete one todo
        dispatch(fetchRemoveTodoItem(params.todoId))
        history.push('/')
        setModal(false)
    }


    return (
        <>
            {/* modal window */}
            {
                modal && 
                    <Modal onCloseModal={() => setModal(false)}
                        onAgree={() => deleteTodoItem()}  
                    />
            }

            {/* card-todo data */}
            <div style={{ textAlign: '-moz-center' , height:'100vh'}}>
                <TodoItem todo={todo} 
                          index={params.todoId}
                          reviewMode={{readOnly:false, countOfPoints:4}}
                          onOpenModal={() => setModal(true)}
                />
            </div>
        </>
    );
}

export default EditTodoItem;
