import { freeze, clone } from '../utills.js'
import observable from '../model/observable.js'

const INITIAL_STATE = {
    todos: [],
    allComplete: false,
}

const todoModel = (text) => ({ complete: false, text, updateState: false })
  
export default class ModelTodo {
    constructor(state = INITIAL_STATE) {
        this._state = freeze(state)
    }

    get todoState () {
        return clone(freeze(this._state))
    }

    _addTodo = (text) => {
      this._state.todos.push(todoModel(text))
    }
  
    _toggleUpdate = (todo) => {
      let current = this._state.todos.find(({ text }) => text === todo.text)
      current.updateState = !current.updateState
    }
  
    _updateTextTodo = (todo, text) => {
      let t = this._state.todos.find((t) => t === todo)
      t.text = text
    }
  
    _toggleComplete = (todo) => {
      const findTodo = this._state.todos.find((t) => t === todo)
      findTodo.complete = !findTodo.complete
    }

    _toggle = () => {
      const state = clone(freeze(this._state))
      state.allComplete = !state.allComplete

      this._state = freeze({ ...state })
    }
  
    _completeAll = () => {
      this._state.todos.forEach(t => t.complete = true)
      this._toggle()
    } 
  
    _removeTodo = (todo) => {
      const inx = this._state.todos.findIndex(t => t === todo)
      this._state.todos.splice(inx, 1)
    }

    _incompleteAll = () => {
      this._state.todos.forEach(t => t.complete = false)
      this._toggle()
    }

    get events () {
      const events = {
        addTodo: this._addTodo,
        incompleteAll: this._incompleteAll,
        removeTodo: this._removeTodo,
        completeAll: this._completeAll,
        toggleComplete: this._toggleComplete,
        updateTextTodo: this._updateTextTodo,
        toggleUpdate: this._toggleUpdate,
      }

      return observable(events, () => this._state)
    }
}