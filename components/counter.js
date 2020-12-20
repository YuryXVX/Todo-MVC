import { render } from '../utills.js'

const getCounterTemplate = (count) => (`<span>${count} todos </span>`)
const createCounterComponent = (state) => render(getCounterTemplate(state))

export default (tagetElement, state) => {
    const { todos } = state

    const newTarget = tagetElement.cloneNode(true)
    newTarget.innerHTML = ``
    newTarget.append(createCounterComponent(todos.length))

    return newTarget
}
