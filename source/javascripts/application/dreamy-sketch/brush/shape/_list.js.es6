Application.DreamySketch.Brush.Shape.List = class List extends Component.List {
  draw(canvas) {
    if(this.any) {
      this.each(shape => shape.draw(canvas.context))
      canvas.blank = false
    }
  }
}
