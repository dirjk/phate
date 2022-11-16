import {
    getPhateInstance,
    corePhateInit
} from './shared.js'

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

function phateInit(key, initialValue, settings) {
    // first we check to see if it has been initialized before. if it does, we don't do anything and return right away.
    let phate = corePhateInit(key, initialValue, settings)
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