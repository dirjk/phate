const states = {}


function getState(key) {
    return states[key].curValue
}
function getPrevState(key) {
    return states[key].prevValue
}
function getPastState(key, index) {
    return states[key].history[index]
}
function getHistory(key) {
    return states[key].history
}

function phateUpdate(key, newValue) {
    // update all the phate stuff to the new value for this key

    // and then return the newValue directly so it can integrate with other state management libraries.
    return newValue
}