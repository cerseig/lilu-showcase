Application.DreamySketch.Brush = class Brush extends Component {
  constructor() {
    super();

    this.density = 1;
    this.time = 0;
  }

  compute(touches, offset) {

  }

  shapes(touches) {
    this.time = Date.now();
    var shapes = new Application.DreamySketch.Brush.Shape.List();
    for(var i = 0; i < this.density; i++) shapes.concat(this.compute(touches, i))

    return shapes;
  }
}
