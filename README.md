# Phate
A state management library for Javascript

# Basic Use of Phate

First, initialize a phate instance with a unique key and a initialValue using the `phateInit()` function.

Parameters:
* `key` - a unique string that identifies which state you are initializing.
* `initialValue` - the value to initialize this Phate key as.
* `debugMode` - a boolean flag used to turn some features on and off.
* `settings` - an object used to determine behavior of this particular Phate instance.
    * `persistence` - one of: `sessionStorage`, `localStorage`, or `undefined`
    * `sharedScope` - one of: `window`, or `undefined`

Return Value: this function returns `initialValue` unmodified.

After the phate instance has been initialized, it's value can be accessed at any time using the `phateState()` function.

Parameters:
* `key` - a unique string that identifies which state you are accessing.

Return Value: the current value of this state.

At anytime, the value of a particular Phate instance can be updated using the `phateUpdate()` function.

Parameters:
* `key` - the unique string that identifies which state you are updating.
* `newValue` - the value to update this Phate instance to.

Return Value: the updated value of this state.


# Advanced Use: State History

Phate has the option to keep track of the entire history of state updates throughout your app's lifecycle. This is useful to help debug any race conditions that may occur with asynchrounous state updates, or just to see how your state has changed over time.

State Histories are available through the `getPhateHistory()` function. For memory considerations, this is only available when `debugMode` is set to `true` when a phate is initialized.

Parameters:
* `key` - the unique key that identifies which state you would like the history of.

Return Value: an array of objects containing all the updates made to this state since it was initialized.

# Advanced Use: Persistance

Phate has the option to keep the state persistent across visits to your app. Persistance is configurable to use either sessionStorage or localStorage. This is a useful way to prevent unnecessary API or graphQL fetch calls as your users navigate across multiple independent apps on your site.

Parameters:
* set the `persistence` key of the settings object to either `sessionStorage` or `localStorage` when initializing the state using phateInit.

# Advanced Use: Shared Scope

Each Phate Instance is configurable so that you can set what scope it is available on. The default setting is to have it only available to your code that has `import 'phate'` in scope, however it is also possible to set the scope to `window`. This is useful because it allows you to share Phate instances with all of your code on a single page, such as if your page is rendered using a micro-app pattern or if there are multiple types of app on your page, such as both a React app and a Vue app.

Parameters:
* set the `sharedScope` key of the settings object to either `window` or `undefined` when initializing the state using phateInit.

# Advanced Use: Integrating into a React project

Phate is designed to be easily integrated into React functional components to help with debugging. In fact, this is one of the very reasons that Phate was first created!

```javascript
import React, { useState } from 'react'
import reactPhateInit from 'phate/react'
import { getPhateHistory } from 'phate'

const ExampleComponent = () => {
    const [ count, updateCount ] = reactPhateInit(useState, 'count', 0, true)
    const updateOnClick = () => {
        updateCount(count + 1)
    }
    useEffect(() => {
        console.log('count history', getPhateHistory('count'))
    }, [count])
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => updateOnClick()}>Increment Counter</button>
        </div>
    )
}

export default ExampleComponent
```