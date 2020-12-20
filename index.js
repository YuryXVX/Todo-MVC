import App from './components/app.js'
import Todo from './components/todo.js'
import CreateTodoForm from './components/createTodoForm.js'
import Counter from './components/counter.js'

import todoModel from './model/modelTodos.js'

import registry from './registry.js'
import applyDiff from './applyDiff.js'

registry.add(`app`, App)
registry.add(`todos`, Todo)
registry.add(`create-todo`, CreateTodoForm)
registry.add(`counter`, Counter)

const model = new todoModel()
const { addChangeListener, ...events } = model.events

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(`#root`)

    const newMain = registry.renderRoot(
      main,
      state,
      events
    )
  
    applyDiff(document.body, main, newMain)
  })
}

addChangeListener(render)