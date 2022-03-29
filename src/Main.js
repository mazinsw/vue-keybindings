import Observer from './Observer'
import Emitter from './Emitter'

export default {
  install (app, options) {
    if (!options) {
      options = {}
    }
    const observer = new Observer(options)
    app.config.globalProperties.$shortcut = observer

    app.mixin({
      created () {
        // save current methods
        let shortcuts = this.$options['shortcuts']

        this.$options.shortcuts = new Proxy(
          {},
          {
            set: (target, key, value) => {
              Emitter.addListener(key, value, this)
              target[key] = value
              return true
            },
            deleteProperty: (target, key) => {
              Emitter.removeListener(key, this.$options.shortcuts[key], this)
              delete target.key
              return true
            }
          }
        )

        if (shortcuts) {
          // restore current methods
          Object.keys(shortcuts).forEach(key => {
            this.$options.shortcuts[key] = shortcuts[key]
          })
        }
      },
      beforeDestroy () {
        let shortcuts = this.$options['shortcuts']

        if (shortcuts) {
          Object.keys(shortcuts).forEach(key => {
            delete this.$options.shortcuts[key]
          })
        }
      }
    })
  }
}
