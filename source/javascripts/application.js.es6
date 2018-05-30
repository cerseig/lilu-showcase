//= require lib/_component
//= require lib/_animation
//= require_self
//= require_tree ./application

class Application extends Component.Element {
  get scroll() {
    return Component.Element.Scroll.application
  }

  get offset() {
    return Component.Element.Offset.application
  }

  get bounds() {
    return Component.Element.Bounds.application
  }

  static init() {
    this.singleton(window)
    super.init()
  }
}
