//= require_self
//= require ./bounds/_application

Component.Element.Bounds = class Bounds extends Component.Element.Offset {
  set frozen(v) {
    super.frozen = v

    if(this.frozen) this._value = this.value
    else delete this._value
  }

  get top() {
    return this.value.top
  }

  get left() {
    return this.value.left
  }

  get right() {
    return this.value.right
  }

  get bottom() {
    return this.value.bottom
  }

  get width() {
    return this.value.width
  }

  get height() {
    return this.value.height
  }

  get value() {
    return this._value || this.element.getClientBoundingRect()
  }

  static get application() {
    return this.Application.singleton
  }
}
