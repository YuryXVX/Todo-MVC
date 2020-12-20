const getTemplate = (state, labelText = ``) => {
    return (`<label class="pure-material-checkbox ">
               <input type="checkbox" 
                    data-toggle="all"
                    ${ state ? 'checked' : '' } 
                />
                <span>${labelText}</span>
            </label>`)
}

export default (state, labelText) => getTemplate(state, labelText)