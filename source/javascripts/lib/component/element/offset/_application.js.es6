Component.Element.Offset.Application = class Offset extends Component.Element.Offset {
  get top() {
    return 0
  }

  set top(v) {

  }

  get left() {
    return 0
  }

  set left(v) {

  }

  get right() {
    return this.width
  }

  set right(v) {

  }

  get bottom() {
    return this.height
  }

  set bottom(v) {

  }

  get width() {
    return this.element.innerWidth
  }

  set width(v) {

  }

  get height() {
    return this.element.innerHeight
  }

  set height(v) {

  }

  static init() {
    super.init()
    this.singleton()
  }
}
