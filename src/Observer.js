import Emitter from './Emitter'

export default class {
  constructor (options) {
    this.keydownEventListener = null
    this.shortcuts = new Map()
    const alias = options.alias || {}
    Object.keys(alias).forEach(label => {
      this.add(label, options.alias[label])
    })
    this.onEvent()
  }

  emit (...args) {
    return Emitter.emit.apply(Emitter, args)
  }

  add (label, shortcut) {
    const key = this.buildKey(shortcut)
    this.shortcuts.has(key) || this.shortcuts.set(key, [])
    const labels = this.shortcuts.get(key)
    const camelLabel = Emitter.kebabToCamel(label)
    const index = labels.indexOf(camelLabel)
    if (index === -1) {
      labels.push(camelLabel)
    }
  }

  remove (label, shortcut) {
    const key = this.buildKey(shortcut)
    const labels = this.shortcuts.get(key) || []
    const camelLabel = Emitter.kebabToCamel(label)
    const index = labels.indexOf(camelLabel)
    if (index > -1) {
      labels.splice(index, 1)
      if (labels.length === 0) {
        this.shortcuts.delete(key)
      }
    }
  }

  unbind (shortcut) {
    const key = this.buildKey(shortcut)
    return this.shortcuts.delete(key)
  }

  clear () {
    this.shortcuts.clear()
  }

  onEvent () {
    this.keydownEventListener = event => {
      if (Emitter.emit('keydown', event) !== false) {
        this.onKeydown(event)
      }
    }
    document.addEventListener('keydown', this.keydownEventListener)
  }

  onKeydown (event) {
    const key = this.buildShortcut(event)
    const labels = this.shortcuts.get(key) || []
    for (let index = 0; index < labels.length; index++) {
      const label = labels[index]
      if (Emitter.emit(label, event) === false) {
        break
      }
    }
  }

  buildKey (shortcut) {
    return (typeof shortcut === 'string' ? shortcut.split('+') : shortcut).join('')
  }

  buildShortcut (event) {
    let k = ''
    if (event.key === 'Shift' || event.shiftKey) {
      k += 'shift'
    }
    if (event.key === 'Control' || event.ctrlKey) {
      k += 'ctrl'
    }
    if (event.key === 'Meta' || event.metaKey) {
      k += 'meta'
    }
    if (event.key === 'Alt' || event.altKey) {
      k += 'alt'
    }
    if (event.key === 'ArrowUp') {
      k += 'arrowup'
    }
    if (event.key === 'ArrowLeft') {
      k += 'arrowleft'
    }
    if (event.key === 'ArrowRight') {
      k += 'arrowright'
    }
    if (event.key === 'ArrowDown') {
      k += 'arrowdown'
    }
    if (event.key === 'AltGraph') {
      k += 'altgraph'
    }
    if (event.key === 'Escape') {
      k += 'esc'
    }
    if (event.key === 'Enter') {
      k += 'enter'
    }
    if (event.key === 'Tab') {
      k += 'tab'
    }
    if (event.key === ' ') {
      k += 'space'
    }
    if (event.key === 'PageUp') {
      k += 'pageup'
    }
    if (event.key === 'PageDown') {
      k += 'pagedown'
    }
    if (event.key === 'Home') {
      k += 'home'
    }
    if (event.key === 'End') {
      k += 'end'
    }
    if (
      (event.key && event.key !== ' ' && event.key.length === 1) ||
      /F\d{1,2}/g.test(event.key)
    ) { k += event.key.toLowerCase() }
    return k
  }
}
