import {PureComponent} from 'react';
import './App.css';
import './css/Todo.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';



// const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)
const filterByStatus = (todos = [], status = '', id = '') => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default:
      return todos
  }
}

class App extends PureComponent {
  state = {
    todoList: [
      // {
      //   id: 1,
      //   text: 'todo 1',
      //   isCompleted: true
      // },
      // {
      //   id: 2,
      //   text: 'todo 2',
      //   isCompleted: true
      // },
    ],
    todoEditingId: '',
    isChechkedAll: false,
    status: 'ALL',
  }

  isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)


  componentWillMount () {
    this.setState({
      isChechkedAll: !this.isNotCheckedAll(this.state.todoList)
    })
  }

  componentDidUpdate () {
    this.setState({
      isChechkedAll: !this.isNotCheckedAll(this.state.todoList)
    })
  }

  addTodo = (todo) => {
    this.setState({
      todoList: [...this.state.todoList, todo]
    })
  }

  getTodoEditingId = (id) => {
    this.setState({todoEditingId: id})
  }

  onEditTodo = (todo, index) => {
    const {todoList : newTodoList} = this.state;
    newTodoList.splice(index, 1, todo);
    this.setState({
      todoList: newTodoList,
      todoEditingId: ''
    })
  }

  markCompleted = (id) => {
    const {todoList} = this.state;
    const updatedTodoList = todoList.map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    this.setState((preState) => ({
      todoList: updatedTodoList,
      isChechkedAll: !this.isNotCheckedAll(updatedTodoList)
    }))
  }

  checkAllTodos = () => {
    const {todoList, isChechkedAll} = this.state
    this.setState(preState => ({
      todoList: todoList.map(todo => ({...todo, isCompleted: !isChechkedAll})),
      isChechkedAll: !preState.isChechkedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  clearCompleted = () => {
    const {todoList} = this.state
    this.setState({
      todoList: filterByStatus(todoList, 'ACTIVE')
    })
  }

  removeTodo = (id = '') => {
    const {todoList} = this.state
    this.setState({
      todoList: filterByStatus(todoList, 'REMOVE', id)
    })
  }

  render() {
    const {todoList, todoEditingId, isChechkedAll, status} = this.state;
    return (
      <div className="todoapp">
        <Header 
          addTodo={this.addTodo}
          isChechkedAll={isChechkedAll}
        />
        <TodoList
          todoList={filterByStatus(todoList, status)}
          todoEditingId={todoEditingId}
          getTodoEditingId={this.getTodoEditingId}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isChechkedAll={isChechkedAll}
          checkAllTodos={this.checkAllTodos}
          removeTodo = {this.removeTodo}
        />
        <Footer
          setStatusFilter={this.setStatusFilter}
          status={status}
          clearCompleted={this.clearCompleted}
          numOfTodos = {todoList.length}
          numOfTodosLeft = {filterByStatus(todoList, 'ACTIVE').length}
        />
      </div>
    )
  }
}

export default App;