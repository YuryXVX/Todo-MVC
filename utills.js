export const render = (component) => {
    let template

    if(typeof component === 'string') {
        const wrap = document.createElement(`div`)
        wrap.innerHTML = component
        template = wrap.firstElementChild
    }

    return template
}


export const freeze = (target) => Object.freeze(target)
export const clone = (target) => JSON.parse(JSON.stringify(target))