import React, {memo} from 'react';
import Todo from './Todo';


const TodoList = memo(props => {
    const {todoList, isChechkedAll, checkAllTodos} = props;
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" checked={isChechkedAll}/>
            <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
            <ul className="todo-list">
                {todoList.map((todo, index) => <Todo key={todo.id} {...{todo}} index={index} {...props} />)}
            </ul>
        </section>
    )
})


export default TodoList;