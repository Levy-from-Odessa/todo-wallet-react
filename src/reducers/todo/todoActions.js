
// !ACTIONS


// send get req to get all res from db and set it in store
export const fetchFindTodo = (todoId) => {
    return{
        type: 'FIND_TODO',
        payload: todoId
    }
}

export const fetchAddTodoItem= () => {
    return{
        type: 'ADD_TODO_ITEM'
    }
}

export const fetchRemoveTodoItem= (indexOfTodo) => {
    return{
        type: 'REMOVE_TODO_ITEM',
        payload: indexOfTodo
    }
}

export const fetchUpdateTodoItem= (indexOfTodo, newTodo) => {
    return{
        type: 'UPDATE_TODO_ITEM',
        payload: {indexOfTodo, newTodo}
    }
}

export const fetchLoading = () => {
    return{
        type: 'LOADING'
    }
}
