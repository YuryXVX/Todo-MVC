const getTemplate = (state, props) => {
    console.log(props)
    return (`
        <div class="material-textfield">
        <input placeholder=" "  value="${state}" type="text" data-${props.attr}>
        <label>${props.text}</label>
        </div>
    `)
}

export default (state, props) => getTemplate(state, props)