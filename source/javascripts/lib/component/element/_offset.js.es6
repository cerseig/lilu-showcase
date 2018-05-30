//= require_self
//= require ./offset/_center
//= require ./offset/_application

Component.Element.Offset = class Offset extends Component.Element {
  constructor() {
    super(...arguments)

    this.frozen = false
    this.margin = 0
  }

  get frozen() {
    return this._frozen
  }

  set frozen(v) {
    this._frozen = !!v
  }

  get top() {
    return this.element.offsetTop - this.margin.top
  }

  set top(v) {
    this.element.style.top = v + this.margin.top + 'px'
  }

  get left() {
    return this.element.offsetLeft - this.margin.left
  }

  set left(v) {
    this.element.style.left = v + this.margin.left + 'px'
  }

  get right() {
    return this.left + this.width - this.margin.left
  }

  set right(v) {
    this.left = v - this.width + this.margin.left
  }

  get bottom() {
    return this.top + this.height - this.margin.top
  }

  set bottom(v) {
    this.top = v - this.height + this.margin.top
  }

  get width() {
    return this.element.offsetWidth + this.margin.left + this.margin.right
  }

  set width(v) {
    return this.element.style.width = v - this.margin.left - this.margin.right + 'px'
  }

  get height() {
    return this.element.offsetHeight + this.margin.top + this.margin.bottom
  }

  set height(v) {
    return this.element.style.height = v - this.margin.top - this.margin.bottom + 'px'
  }

  get margins() {
    return this._margins
  }

  set margin(v) {
    var transform = true
    var margin = {};
    var value;

    if(typeof v !== 'object' || v === null) {
      if(typeof v !== 'number' && typeof v !== 'function') v = 0
      margin = {top: v, left: v, right: v, bottom: v}
      if(typeof margin.top === 'number') transform = false
    }
    else margin = v

    if(transform) {
      this.freeze(_ => {
        ['top', 'left', 'right', 'bottom'].forEach(side => {
          value = margin[side]
          if(typeof value === 'function') value = value.call(this, this)
          margin[side] = typeof value !== 'number' || isNaN(value) ? 0 : value
        })
      })
    }

    this._margin = margin
  }

  load() {
    super.load()

    if(this.center) this.center.element = this.element
    else this.center = new this.constructor.Center(this.element)
  }

  update() {
    super.update()

    this.center.update()
  }

  visible(margins) {
    return this.visibleIn(this.constructor.application, margins)
  }

  contained(margins) {
    return this.containedIn(this.constructor.application, margins)
  }

  containedIn(offset, margins) {
    return this.freeze(_ => offset.freeze(_ => this.spread(margins, _ => (
      this.top >= offset.top &&
      this.left >= offset.left &&
      this.right <= offset.right &&
      this.bottom <= offset.bottom
    ))))
  }

  visibleIn(offset, margins) {
    return this.freeze(_ => offset.freeze(_ => this.spread(margins, _ => (
      this.top < offset.bottom &&
      this.left < offset.right &&
      this.right > offset.left &&
      this.bottom > offset.top
    ))))
  }

  freeze(callback, update) {
    var freeze = !this.frozen || update

    if(freeze) this.frozen = true
    var result = callback.call(this, this)
    if(freeze) this.frozen = false

    return result
  }

  spread(margin, callback) {
    if(margin !== undefined) {
      var state = this.margin
      this.margin = margin
    }

    var result = callback.call(this, this)
    if(margin !== undefined) this.margin = state

    return result
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
