import React, {Component}from 'react';
import './App.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: [

      ]
    }
  }
  render(){
    let todos = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item, index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item}
            onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)}
          />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>我的代办</h1>
        <div className="inputWrapper">
          <TodoInput
            content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}
          />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    );
  }

  addTodo(event){
    console.log('我得添加一个 todo 了')
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }
  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }
  delete(e, todo){
    todo.deleted = true
    this.setState(this.state)
  }
  
}

let id = 0
function idMaker(){
  id += 1
  return id
}

