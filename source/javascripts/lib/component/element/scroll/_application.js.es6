Component.Element.Scroll.Application = class Scroll extends Component.Element.Scroll {
  constructor() {
    super(...arguments)
    this.fallback = new Component.Element.Scroll(document.documentElement)
  }

  get element() {
    return document.body
  }

  set element(v) {

  }

  get top() {
    return super.top || this.fallback.top
  }

  set top(v) {
    super.top = this.fallback.top = v
  }

  get left() {
    return super.left || this.fallback.left
  }

  set left(v) {
    super.left = this.fallback.left = v
  }

  to() {
    this.fallback.to(...arguments)
    return super.to(...arguments)
  }

  by() {
    this.fallback.by(...arguments)
    return super.by(...arguments)
  }

  into() {
    this.fallback.into(...arguments)
    return super.into(...arguments)
  }

  static init() {
    super.init()
    this.singleton()
  }
}
