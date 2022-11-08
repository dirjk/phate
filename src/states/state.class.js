class PhateClass {
    key
    curValue
    prevValue
    initialValue
    history = []
    debugMode = false
    constructor(key, initialValue, debugMode){
        this.key = key
        this.initialValue = initialValue
        this.curValue = initialValue
        this.debugMode = !!debugMode
        if (this.debugMode) {
            this.history.push(initialValue)
        }
    }
    updateValue(newValue) {
        this.prevValue = this.curValue
        this.curValue = newValue
        if (this.debugMode) {
            this.history.push(newValue) 
        }
    }
}