import { PhateClass } from './states/state.class'

const states = {}
const scopes = {}
const windowScopeKey = '(phate)'

function getPhateInstance(key) {
    // this function assumes that this phate instance has already been initialized at the correct scope.
    let phate
    if (scopes[key] === 'window') {
        phate = window[windowScopeKey][key]
    } else {
        phate = states[key]
    }
    return phate
}

function phateState(key) {
    return getPhateInstance(key).curValue
}
function getPrevPhateState(key) {
    return getPhateInstance(key).prevValue
}
function getInitialPhateState(key) {
    return getPhateInstance(key).initialValue
}
function getPhateHistory(key) {
    // we return a copy so it doesn't get messed up accidentally.
    return [ ...getPhateInstance(key).history]
}
function getPhateUpdateCount(key) {
    return getPhateInstance(key).updateCount
}

function phateInit(key, initialValue, debugMode, settings) {
    // first we check to see if it has been initialized before. if it does, we don't do anything and return right away.
    let phate = undefined
    if (settings.sharedScope === 'window') {
        phate = window?.[windowScopeKey]?.[key]
    } else {
        phate = states[key]
    }
    if (typeof phate === 'undefined') {
        // set up the new phate instance
        phate = new PhateClass(key, initialValue, debugMode, settings)
        if (settings.sharedScope === 'window') {
            scopes[key] = 'window'
            // we need to see if there is already an object on the dom.
            if (window[windowScopeKey]) {
                window[windowScopeKey][key] = phate
            } else {
                const newWindowStates = {}
                newWindowStates[key] = phate
                window[windowScopeKey] = newWindowStates
            }
        } else {
            states[key] = phate
        }
    }
    // make sure to return the value so it can be used with other state management systems
    return phate.initialValue
}

function phateUpdate(key, newValue, updator) {
    // update all the phate stuff to the new value for this key
    let phate = getPhateInstance(key)
    // do the updates 
    phate.updateValue(newValue, updator)
    // and then return the newValue directly so it can integrate with other state management libraries.
    return phate.curValue
}

export { 
    phateInit,
    phateUpdate,
    phateState,
    getPrevPhateState,
    getInitialPhateState,
    getPhateHistory,
    getPhateUpdateCount
}