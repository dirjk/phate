export const states = {}
export const scopes = {}
export const windowScopeKey = '(phate)'

export function getPhateInstance(key) {
    // this function assumes that this phate instance has already been initialized at the correct scope.
    let phate
    if (scopes[key] === 'window') {
        phate = window[windowScopeKey][key]
    } else {
        phate = states[key]
    }
    return phate
}

export function corePhateInit(key, initialValue, settings) {
    let phate = undefined
    if (settings?.sharedScope === 'window') {
        phate = window?.[windowScopeKey]?.[key]
    } else {
        phate = states[key]
    }
    if (typeof phate === 'undefined') {
        // set up the new phate instance
        phate = new PhateClass(key, initialValue, settings)
        if (settings?.sharedScope === 'window') {
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
    return phate

}