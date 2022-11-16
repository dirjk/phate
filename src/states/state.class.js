function createHistoryItem(newValue, updator) {
    return {
        value: newValue,
        timeStamp: Date().now(),
        updator: updator
    }
}
function getStorageKey(key) {
    return `phate_${key}`
}

export class PhateClass {
    key
    curValue
    prevValue
    initialValue
    history = []
    updateCount
    settings = {}
    debugMode = false
    constructor(key, initialValue, debugMode, settings){
        this.key = key
        const storageKey = getStorageKey(key)
        let tempValue = null
        if (settings.persistence === 'sessionStorage') {
            tempValue = JSON.parse(sessionStorage.getItem(storageKey))
        } else if (settings.persistence === 'localStorage') {
            tempValue = JSON.parse(localStorage.getItem(storageKey))
        }
        if ( tempValue === null && settings.persistence === 'sessionStorage') {
            // this particular key doesn't exist in storage, so we set it.
            sessionStorage.setItem(storageKey, JSON.stringify(initialValue))
        } else if (tempValue === null && settings.persistence === 'localSotrage') {
            // this particular key doesn't exist in storage, so we set it.
            localStorage.setItem(storageKey, JSON.stringify(initialValue))
        } else {
            // it already exists in storage, so we use the stored value instead of the one passed in.
            initialValue = JSON.parse(tempValue)
        }
        this.initialValue = initialValue
        this.curValue = initialValue
        this.debugMode = !!debugMode
        this.settings = {}
        this.updateCount = 1
        if (this.debugMode) {
            this.history.push(createHistoryItem(initialValue, settings.persistence || 'initialValue'))
        }
    }
    updateValue(newValue, updator) {
        // we do the same checks as react does so we only update when necessary:
        if(!Object.is(newValue, this.curValue)) {
            this.prevValue = this.curValue
            this.curValue = newValue
            this.updateCount = this.updateCount + 1
            if (this.debugMode) {
                if (typeof updator === 'undefined') {
                    try {
                        updator = (new Error()).stack.split('\n')[3].trim()
                    } catch {}
                }
                this.history.push(createHistoryItem(newValue, updator))
            }
            if (this.settings.persistence === 'localStorage') {
                localStorage.setItem(getStorageKey(this.key), JSON.stringify(newValue))
            } else if (this.settings.persistence === 'sessionStorage') {
                sessionStorage.setItem(getStorageKey(this.key), JSON.stringify(newValue))
            }
        }
    }
}