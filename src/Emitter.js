export default new class {
  constructor () {
    this.listeners = new Map()
  }

  addListener (label, callback, vm) {
    if (typeof callback === 'function') {
      this.listeners.has(label) || this.listeners.set(label, [])
      this.listeners.get(label).unshift({ callback: callback, vm: vm })

      return true
    }

    return false
  }

  removeListener (label, callback, vm) {
    let listeners = this.listeners.get(label),
      index

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return typeof listener.callback === 'function' &&
          listener.callback === callback &&
          listener.vm === vm
          ? (i = index)
          : i
      }, -1)

      if (index > -1) {
        listeners.splice(index, 1)
        this.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }

  kebabToCamel (string) {
    return string.replace(/-([a-z])/g, g => g[1].toUpperCase())
  }

  emit (label, ...args) {
    let listeners = this.listeners.get(this.kebabToCamel(label))

    if (listeners && listeners.length) {
      for (let index = 0; index < listeners.length; index++) {
        const listener = listeners[index]
        if (listener.callback.call(listener.vm, ...args) === false) {
          return false
        }
      }
    }
  }
}()
