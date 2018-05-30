Animation.Easing = class Easing {
  static get default() {
    return 'inOutQuad'
  }

  static linear(p) {
    return p
  }

  static inQuad(p) {
    return p*p
  }

  static outQuad(p) {
    return p*(2 - p)
  }

  static inOutQuad(p) {
    return p < 0.5 ? 2*p*p : -1 + (4 - 2*p)*p
  }

  static inCubic(p) {
    return p*p*p
  }

  static outCubic(p) {
    return (--p)*p*p+1
  }

  static inOutCubic(p) {
    return p < 0.5 ? 4*p*p*p : (p - 1)*(2*p - 2)*(2*p - 2) + 1
  }

  static inQuart(p) {
    return p*p*p*p
  }

  static outQuart(p) {
    return 1 - (--p)*p*p*p
  }

  static inOutQuart(p) {
    return p < 0.5 ? 8*p*p*p*p : 1 - 8*(--p)*p*p*p
  }

  static inQuint(p) {
    return p*p*p*p*p
  }

  static outQuint(p) {
    return 1 + (--p)*p*p*p*p
  }

  static inOutQuint(p) {
    return p < 0.5 ? 16*p*p*p*p*p : 1 + 16*(--p)*p*p*p*p
  }

  static method(name) {
    return typeof this[name] === 'function' && name !== 'method' ? name : this.default
  }
}
