# REQUIREMENTS

* the state must be able to be initialized to a default value.
* the state must be able to be updated
* the state must be able to be read 

it would be cool if components could subscribe to them and rerender when the value changes
it would also be cool to be able to update the state without triggering a rerender

a history of all state updates would help with debugging

it would be cool if you could set different levels of persistence
    - read/write to session storage, indexDB, a server, etc.

it would also be cool to have access to everything across libraries
    - so if there is a react app using it and a vue app using it on the same page they could share state
    - or if there where multiple micro apps on the same page that need to share data

# react:

const [ stateValue, updateStateValue ] = useState(initialValue)

* calling updateStateValue both updates stateValue and triggers a rerender

updateStateValue(phateUpdate(key, newValue))

phateUpdate is a passthrough function that returns newValue, but it also updates its entire state tree as well.