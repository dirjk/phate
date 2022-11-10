function createHistoryItem(newValue, updator) {
    return {
        value: newValue,
        timeStamp: Date().now(),
        updator: updator
    }
}

export class PhateClass {
    key
    curValue
    prevValue
    initialValue
    history = []
    updateCount
    debugMode = false
    constructor(key, initialValue, debugMode){
        this.key = key
        this.initialValue = initialValue
        this.curValue = initialValue
        this.debugMode = !!debugMode
        this.updateCount = 1
        if (this.debugMode) {
            this.history.push(createHistoryItem(initialValue, 'initialValue'))
        }
    }
    updateValue(newValue, updator) {
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
    }
}