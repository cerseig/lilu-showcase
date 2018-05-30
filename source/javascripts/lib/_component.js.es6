//= require_self
//= require ./component/_element

class Component {
  constructor() {
    this.set(...arguments)
  }

  set(attributes) {
    if(typeof attributes === 'object' && attributes !== null) {
      var keys = Object.keys(this)

      for(var key in keys) {
        if(attributes.hasOwnProperty(key)) this[key] = attributes[key]
      }
    }

    return this
  }

  load() {

  }

  update() {

  }

  static alias(alias, property) {
    if(typeof alias === 'object' && alias !== null) {
      var properties = alias
      for(var alias in properties) this.alias(alias, properties[alias])
    }
    else {
      Object.defineProperty(this.prototype, alias, {
        get() { return this[property] },
        set(v) { this[property] = v }
      })
    }
  }

  static get components() {
    var components = []

    for(var component in this) {
      if(this.hasOwnProperty(component) && this.hasComponent(component)) components.push(this[component])
    }

    return components
  }

  static hasComponent(component) {
    return (component + '').match(/^[A-Z]/) !== null
  }

  static singleton(...args) {
    this.singleton = new this(...args)

    var properties = Object.keys(Object.getOwnPropertyDescriptors(this.singleton))
    var prototype = this.prototype

    while(prototype) {
      properties = properties.concat(Object.keys(Object.getOwnPropertyDescriptors(prototype)))
      prototype = Object.getPrototypeOf(prototype)
    }

    properties.forEach(property => {
      if(property === 'constructor' || Object.getOwnPropertyDescriptor(this, property) !== undefined) return
      Object.defineProperty(this, property, {
        get: () => this.singleton[property],
        set: v => { this.singleton[property] = v }
      })
    })
  }

  static init() {
    this.components.forEach(component => {
      if(typeof component.init === 'function') component.init()
    })
  }
}
