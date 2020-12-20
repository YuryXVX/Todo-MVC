import { render } from '../utills.js'

const title = (title) => (`<h1>${title}</h1>`)
const todoList = () => (`<ul data-component="todos"></ul>`)
const counter = () => (`<div data-component="counter"></div>`)
const createTodo = () => (`<div data-component='create-todo'></div>`)

const main = (state) => (
    `<main>
        <section>
            <header>
                ${ title(state ? `ALL todos complete` : `APP title`) }
                ${ createTodo() }
            </header>
            <main>
                ${ todoList() }
            </main>
        </section>
        <footer>${ counter() }</footer>
    </main>`
)

const appTemplate = (state) => main(state)

const getTeplate = (state) => {
    let complete

    if(!state.todos.length) {
        complete = false
    } else {
        complete = state.todos.every(({ complete }) => complete)
    }
 
    return render(appTemplate(complete))
}

export default (targetElement, state) => {
    const newApp = targetElement.cloneNode(true)
    newApp.innerHTML = ``

    newApp.append(getTeplate(state))
    
    return newApp
}