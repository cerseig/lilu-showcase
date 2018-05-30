Component.Element.Offset.Center = class Center extends Component.Element.Offset {
  constructor() {
    super(...arguments)
    if(!this.rect) this.rect = null
  }

  get rect() {
    return this._rect
  }

  set rect(v) {
    if(!(v instanceof Component.Element.Offset)) v = new Component.Element.Offset()
    this._rect = v

    this.load()
    this.update()
  }

  get top() {
    return this.rect.freeze(rect => rect.top + rect.height/2)
  }

  set top(v) {
    this.rect.top = v - this.rect.height/2
  }

  get left() {
    return this.rect.freeze(rect => rect.left + rect.width/2)
  }

  set left(v) {
    this.rect.left = v - this.rect.width/2
  }

  get right() {
    return this.left
  }

  set right(v) {
    this.left = v
  }

  get bottom() {
    return this.top
  }

  set bottom(v) {
    this.top = v
  }

  get width() {
    return this.rect.width
  }

  set width(v) {
    this.rect.left = this.rect.freeze(rect => rect.left + (v - rect.width)/2)
    this.rect.width = v
  }

  get height() {
    return this.rect.height
  }

  set height(v) {
    this.rect.top = this.rect.freeze(rect => rect.top + (v - rect.height)/2)
    this.rect.height = v
  }

  get center() {
    return this
  }

  set(rect) {
    return rect instanceof Component.Element.Offset ? super.set({rect}) : super.set(...arguments)
  }
}
