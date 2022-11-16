import {
    getPhateInstance,
    corePhateInit
} from '../shared.js'

function reactPhateInit(useState, key, initialValue, debugMode, settings) {
    // first we do the phate stuff
    let phate = corePhateInit(key, initialValue, debugMode, settings)
    // and we do get the react stuff here
    const [ x, updateX ] = useState(phate.initialValue)
    // next we subscribe the react update function to everthing for this key
    // TODO: subscribe updateX
    // then we create a wrapper around the returned value with the correct key and everything
    const phateUpdateX = (newX, updator) => {
        let phate = getPhateInstance(key)
        // we need to check if newX is a function because React has different behavior if it is.
        let newNewX = newX
        if (typeof newX === 'function') {
            newNewX = newX(phate.prevValue)
        }
        phate.updateValue(newNewX, updator)
        updateX(newNewX)
    }
    // here we return stuff so the consumer can pretend it is the same as react.
    return [ x, phateUpdateX ]
}

export default reactPhateInit