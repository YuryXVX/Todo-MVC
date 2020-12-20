import { render } from '../utills.js'

const completeAllButton = (state) => {
    const { allComplete, todos } = state

    let checked
    let indeterminate = todos.some(({ complete }) => !complete)

    if(todos.some(({ complete }) => !complete)) {
        checked = false
    } else {
        checked = allComplete
    }
    
    return (`<label class="pure-material-checkbox ">
                <input type="checkbox" 
                    data-toggle="all"
                    indeterminate="${!indeterminate}"
                    ${ checked ? 'checked' : '' } 
                />
                <span>Toggle all</span>
            </label>`)
}

const getTodoTemplate = (state) => {
    return `
            <div style="display: flex; justify-content: space-between;">
                <form>
                    <label>
                        <input type="text" />
                    </label>
                    <div>
                        <button>CREATE</button>
                    </div>
                    </form>
                ${ completeAllButton(state) }
            </div>
            `
}

const attachedEventsToCreateTodoForm = (element, state, events) => {
    const { addTodo, completeAll, incompleteAll } = events

    const submitButton = element.querySelector(`button`)
    const complateButton = element.querySelector(`[data-toggle]`)
    const input = element.querySelector(`input`)

    const createTodo = addTodo
    const completeAllClickHandler = e => completeAll()
    const incompleteAllClickHandler = e => incompleteAll()

    
    submitButton.addEventListener(`click`, evt => {
        evt.preventDefault()

        if(!input.value) return

        createTodo(input.value)

        input.value = ``
    })

    complateButton.addEventListener(`change`, state.allComplete ? incompleteAllClickHandler : completeAllClickHandler)
}

const createTodoComponent = (state, events) => {
    const element = render(getTodoTemplate(state))
    attachedEventsToCreateTodoForm(element, state, events)
    return element
}

export default (targetElement, state, events) => {
    const newTarget = targetElement.cloneNode(true)
    newTarget.innerHTML = ``
    newTarget.append(createTodoComponent(state, events))
    return newTarget
}