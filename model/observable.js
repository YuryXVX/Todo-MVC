import { clone, freeze } from '../utills.js'

export default (state, stateGetter) => {
    let listeners = []

    const addChangeListener = callback => {
        listeners.push(callback)
        callback(freeze(clone(stateGetter())))
        
        return (callback) => {
            listeners = listeners.filter(c => c !== callback)
        }
    }

    const invokeListeners = () => {
        const data = freeze(stateGetter(state))
        listeners.forEach(l => l(data))
    }

    const wrapAction = originalAction => {
        return (...args) => {
          const value = originalAction(...args)
          invokeListeners()
          return value
        }
    }

    const baseProxy = { addChangeListener }
    
    return Object.keys(state)
        .filter(key => typeof state[key] === `function`)
        .reduce((proxy, key) => {
            const action = state[key]
    
            return {
                ...proxy,
                [key]: wrapAction(action)
            }
            
        }, baseProxy)
}
