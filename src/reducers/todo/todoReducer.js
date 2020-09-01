// !STATE
const initialState = {
    todos: [],
    loading: true,
    error: '',

    todo:{}
  }

// !MUTATIONS
const todoReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case 'FIND_TODO':
        let copyTodos = [...state.todos]
        const todoItem = copyTodos[payload]
        return{
          ...state,
          todo: {...todoItem},
          loading: false
        }

      case 'ADD_TODO_ITEM':
        return{
          ...state,
          todos: [...state.todos, {title: 'new', items:[]}],
          loading: false
        }

      case 'REMOVE_TODO_ITEM':
        let TodosAfterRemove = [...state.todos]
        TodosAfterRemove.splice(payload, 1)
          return{
            ...state,
            todos: TodosAfterRemove,
            loading: false
          } 

      case 'UPDATE_TODO_ITEM':
        let updatedTodos = [...state.todos]
        updatedTodos.splice(payload.indexOfTodo, 1,  payload.newTodo)

          return{
            ...state,
            todos: updatedTodos,
            loading: false
          } 

      case 'LOADING':
        return{
            ...state,
            loading: true
          } 
       
       
      default:
          return state
    }
  };

  export default todoReducer