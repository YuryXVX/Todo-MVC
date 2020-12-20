const getTemplate = (text, className = `default`) => 
    (`<button class="material-button ${className}">${text}</button>`)

export default (text, className) => getTemplate(text, className)
