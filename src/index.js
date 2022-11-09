import { PhateClass } from './states/state.class'

const states = {}

function phateState(key) {
    return states[key].curValue
}
function getPrevPhateState(key) {
    return states[key].prevValue
}
function getInitialPhateState(key) {
    return states[key].initialValue
}
function getPhateHistory(key) {
    // we return a copy so it doesn't get messed up accidentally.
    return [ ...states[key].history]
}
function getPhateUpdateCount(key) {
    return states[key].updateCount
}

function phateInit(key, initialValue, debugMode) {
    // first we check to see if it has been initialized before. if it does, we don't do anything and return right away.
    let phate = states[key]
    if (typeof phate === 'undefined') {
        // set up the new phate instance
        let phate = new PhateClass(key, initialValue, debugMode)
        states[key] = phate
    }
    // make sure to return the value so it can be used with other state management systems
    return initialValue
}

function phateUpdate(key, newValue) {
    // update all the phate stuff to the new value for this key
    let phate = states[key]
    // do the updates 
    phate.updateValue(newValue)
    // and then return the newValue directly so it can integrate with other state management libraries.
    return newValue
}

module.exports = { 
    phateInit,
    phateUpdate,
    phateState,
    getPrevPhateState,
    getInitialPhateState,
    getPhateHistory,
    getPhateUpdateCount
}