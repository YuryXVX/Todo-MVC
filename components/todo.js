import { render } from '../utills.js'
import CheckboxUI from '../ui/checkbox.js'
import InputUI from '../ui/input.js'

const updateFormTemplate = (text) => (
    `<div>
        ${InputUI(text, { text: `Update todo`, attr: `aaa`})}
    </div>`)

const todoContent = (text) => (`
    <div style="width: 300px; display: flex; justify-content: space-between; margin-left: auto; margin-right: auto">
        <span>${text}</span>
        <button>UPDATE</button>
        <button class="delete">DELETE</button>
    </div>
`)

const updateForm = ({ complete, text, updateState }) => {
    return updateState ? updateFormTemplate(text) : todoContent(complete, text) 
}

const todoTemplate = (todo) => {
    const { complete } = todo

    return `<li style="display: flex"  ${complete ? 'class="todo__complete"' : 'class="todo"'}>
            ${CheckboxUI(complete, complete)}
            ${updateForm(todo)}
            </li>`
}

const attachEventsToTodoElement = (element, todo, events) => {
    const { 
        updateTextTodo, 
        toggleComplete: toggle, 
        toggleUpdate: updateState, 
        removeTodo: remove 
    } = events

    const toggleComplete = e => toggle(todo)
    const toogleUpdate = e => updateState(todo)
    const deleteTodo = () => remove(todo)


    const checkbox = element.querySelector(`input`)
    const updateInput = element.querySelector('[data-update]')
    const updateButton = element.querySelector(`button`)
    const deteleButton = element.querySelector('.delete')

    checkbox.addEventListener(`change`, toggleComplete)
    
    if(updateInput) updateInput.addEventListener(`blur`, evt => {
        const { value } = evt.target;
        updateTextTodo(todo, value)
        toogleUpdate(todo)
    })

    if(updateButton) updateButton.addEventListener(`click`, toogleUpdate)
    if(deteleButton) deteleButton.addEventListener(`click`, deleteTodo)
}

const getTodoItemComponent = (todo, events) => {
    const element = render(todoTemplate(todo))
    attachEventsToTodoElement(element, todo, events)
    return element
}

export default (targetElement, state, events) => {
    const { todos } = state
    const newTodoList = targetElement.cloneNode(true)
    newTodoList.innerHTML = ``

    todos
        .map(todo => getTodoItemComponent(todo, events))
        .forEach(t => newTodoList.append(t))

    return newTodoList
}