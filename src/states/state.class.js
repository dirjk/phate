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
            this.history.push(initialValue)
        }
    }
    updateValue(newValue, updator) {
        this.prevValue = this.curValue
        this.curValue = newValue
        this.updateCount = this.updateCount + 1
        if (this.debugMode) {
            this.history.push({
                value: newValue,
                timeStamp: Date.now(),
                updator
            }) 
        }
    }
}