# Vue-Keybindings

[![NPM version](https://img.shields.io/npm/v/vue-keybindings.svg)](https://www.npmjs.com/package/vue-keybindings)
![VueJS v3 compatible](https://img.shields.io/badge/Vuejs%203-compatible-green.svg)
<a href="https://www.npmjs.com/package/vue-keybindings"><img src="https://img.shields.io/npm/dt/vue-keybindings.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-keybindings"><img src="https://img.shields.io/npm/l/vue-keybindings.svg" alt="License"></a>

Keyboard Shortcuts registration and Keybindings management

## Install

``` bash
npm install vue-keybindings --save
```

or

``` bash
yarn add vue-keybindings
```

## Usage
#### Configuration
``` js
import VueKeybindings from 'vue-keybindings'

Vue.use(VueKeybindings, {
    alias: {
        cancel: ['esc'],
        reload: ['alt', 'f5'],
        delete: 'shift+del'
    }
})
```

#### On Vuejs instance usage
``` js
var vm = new Vue({
  shortcuts: {
    keydown: function (event) {
      console.log('key ', event, 'pressed')
      return false // stop alias calling
    },
    cancel: function () {
      console.log('escape key pressed')
      return false // stop propagation
    },
    customBinding: function (data) {
      console.log('this method was fired by some call to: vm.$shortcut.emit("customBinding", data)')
    }
  },
  methods: {
    clickButton: function (val) {
        this.$shortcut.emit('customBinding', val)
    }
  }
})
```

#### Dynamic shortcut event listeners
Create a new listener
``` js
this.$options.shortcuts.commandName = () => {
    console.log('do some action')
}
```
Remove existing listener
``` js
delete this.$options.shortcuts.commandName;
```

#### Dynamic shortcut registration
Create a new keybinding
``` js
this.$shortcut.add('command-name', 'ctrl+f6')
// or
this.$shortcut.add('commandName', ['ctrl', 'f6'])
```
Remove existing keybinding
``` js
this.$shortcut.remove('command-name', 'ctrl+f6')
// unbind all actions for this shortcut
this.$shortcut.unbind(['ctrl', 'f6'])
// clear all keybindings
this.$shortcut.clear()
```

### Derived from
- Vivify-Ideas/vue-shortcuts
- MetinSeylan/Vue-Socket.io
