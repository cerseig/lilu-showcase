Application.DreamySketch.Brush.Shape.List = class List extends Component.List {
  draw(context) {
    this.each(shape => shape.draw(context))
  }
}
