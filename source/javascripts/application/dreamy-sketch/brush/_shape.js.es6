Application.DreamySketch.Brush.Shape = class Shape extends Component {
  constructor() {
    super();

    this.color = new Application.DreamySketch.Color();
    this.filled = true;
    this.stroked = false;
    this.width = 1;
  }

  draw(context) {
    context.beginPath();
    this.path(context);
    context.closePath();

    if(this.stroked) this.stroke(context);
    if(this.filled) this.fill(context);
  }

  path(context) {

  }

  fill(context) {
    context.fillStyle = this.color.string;
    context.fill();
  }

  stroke(context) {
    context.strokeStyle = this.color.string;
    context.stroke();
  }
}
