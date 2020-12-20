const registry = {}

const add = (name, component) => {
    registry[name] = renderWrapper(component)
}

const renderWrapper = (component) => {
    return (targetElement, state, events) => {
        const element = component(targetElement, state, events)
        const childElement = [ ...element.querySelectorAll(`[data-component]`) ]

        childElement
            .forEach(target => {
                const name = target.dataset.component
                const child = registry[name]
                      
                if(!child) return
                target.replaceWith(child(target, state, events))
            })

        return element
    }
}

const renderRoot = (root, state, events) => {
    const cloneComponent = (root) => root.cloneNode(true)
    return renderWrapper(cloneComponent)(root, state, events)
}

export default { add, renderRoot }