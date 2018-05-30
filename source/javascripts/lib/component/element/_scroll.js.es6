//= require smoothscroll-polyfill/dist/smoothscroll
//= require_self
//= require ./scroll/_application

Component.Element.Scroll = class Scroll extends Component.Element {
  get top() {
    return this.element.scrollTop
  }

  set top(v) {
    this.element.scrollTop = v
  }

  get left() {
    return this.element.scrollLeft
  }

  set left(v) {
    this.element.scrollLeft = v
  }

  to() {
    this.element.scrollTo(...this.constructor.parameters(...arguments))
    return this
  }

  by() {
    this.element.scrollBy(...this.constructor.parameters(...arguments))
    return this
  }

  into() {
    this.element.scrollIntoView(...this.constructor.parameters(...arguments))
    return this
  }

  static parameters(parameters) {
    if(typeof parameters === 'object' && parameters !== null) {
      if(!parameters.behavior) parameters.behavior = 'smooth'
      return [parameters]
    }
    else return arguments
  }

  static get application() {
    return this.Application.singleton
  }

  static init() {
    super.init()

    this.alias({
      left: 'y',
      top: 'x'
    })
  }
}
